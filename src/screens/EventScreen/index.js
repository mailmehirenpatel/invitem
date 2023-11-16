// 3rd party imports
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';

// Local imports
import RBSheet from 'react-native-raw-bottom-sheet';
import {Icons, Images} from '../../assets';
import {
  CustomButton,
  CustomNavbar,
  CustomTextInput,
  FastImageView,
  SearchTextInput,
} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {loaderRef} from '../../components/Loader';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {getImageByEventId} from '../../store/actions/ChatAction';
import {
  deleteEvent,
  getEventCategoryData,
  getEventData,
  getEventObjectData,
  getLocationData,
  requestJoinEventCode,
} from '../../store/actions/EventAction';
import {getEventInfoChirps} from '../../store/actions/InfoChirpsAction';
import {getUserProfileData} from '../../store/actions/profileActions';
import {onIsFirstTime} from '../../store/slice/AuthSlice';
import {onMute} from '../../store/slice/eventSlice';
import Colors from '../../theme/Colors';
import {actionsList} from '../../utils';
import styles from './styles';

const EventScreen = ({navigation}) => {
  // Global Event screen Field References
  const BottomSheetRef = useRef();
  const EventBottomSheefRef = useRef();
  const [refreshing, setRefreshing] = useState(false); // Pull to refresh.
  const [searchText, setSearchText] = useState('');
  const [listEvents, setEventList] = useState();
  const {eventData} = useSelector(state => state.event); // Get Event data through useSelector
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);

  // Get Profile image.
  const {profileData} = useSelector(state => state.profile);
  const {userMpin, isFirstTime} = useSelector(state => state.auth);
  // For Join Event code
  const [invitationCode, setInvitationCode] = useState('');

  useEffect(() => {
    setEventList(eventData);
  }, [eventData]);

  // Api call for get event, location, event category and user profile data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchText('');
      loaderRef.current.hide();
      dispatch(
        getEventData(isSuccess => {
          if (isSuccess) {
            loaderRef.current.hide();
            Promise.all([
              dispatch(getLocationData()),
              dispatch(getEventCategoryData()),
              dispatch(getUserProfileData()),
            ]).then(() => {
              loaderRef.current.hide();
              isFirstTime &&
                userMpin == null &&
                Alert.alert(Strings.GenerateMpin, Strings.generateMpinRequest, [
                  {
                    text: 'Skip',
                    onPress: () => {
                      dispatch(onIsFirstTime(false));
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Continue',
                    onPress: () => {
                      dispatch(onIsFirstTime(false));
                      navigation.navigate(NavigationRoutes.ConfirmPin);
                    },
                  },
                ]);
            });
          }
        }),
      );
    });
    return unsubscribe;
  }, [dispatch, eventData, isFirstTime, navigation, userMpin]);

  // Pull to Refresh functionality
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([dispatch(getEventData())]).then(() => {
      setRefreshing(false);
    });
  }, [dispatch]);

  // Navigate To Other Screen
  const onFABPress = useCallback(
    name => {
      name === 'add' ? onEventOpen() : '';
      name === 'join' ? onOpen() : '';
      name === 'Upcoming Events'
        ? navigation.navigate(NavigationRoutes.EventCalendar)
        : '';
    },
    [navigation, onEventOpen, onOpen],
  );
  const onProfileAction = useCallback(() => {
    navigation.navigate(NavigationRoutes.Profile);
  }, [navigation]);

  // Event Press Functionality and Pass EventDetail Item Value Through Navigation Params
  const onEventPress = useCallback(
    item => () => {
      loaderRef.current.show();
      dispatch(onMute(item.isMute));
      // dispatch(onEventObjectData({result: [{}]}));
      dispatch(
        getEventObjectData(item.id, issuccess => {
          if (issuccess) {
            dispatch(
              getImageByEventId(item.id, issuccess2 => {
                if (issuccess2) {
                  dispatch(
                    getEventInfoChirps(item.id, isSuccess3 => {
                      if (isSuccess3) {
                        loaderRef.current.hide();
                        navigation.navigate(NavigationRoutes.EventDetail);
                      }
                    }),
                  );
                }
              }),
            );
          }
        }),
      );
    },
    [dispatch, navigation],
  );

  const onOpen = useCallback(() => {
    setInvitationCode('');
    BottomSheetRef.current.open();
  }, []); // Open BottomSheet
  const onClose = useCallback(() => {
    BottomSheetRef.current.close();
  }, []); // Close BottomSheet

  const onEventOpen = useCallback(() => {
    EventBottomSheefRef.current.open();
  }, []); // Open BottomSheet
  const onEventClose = useCallback(() => {
    EventBottomSheefRef.current.close();
  }, []); // Close BottomSheet

  // Search Events List
  const onSearch = useCallback(
    value => {
      setSearchText(value);
      if (value?.length && listEvents?.length > 0) {
        const filterEvents = listEvents?.filter(e =>
          e.eventName.toLowerCase().includes(value.toLowerCase()),
        );
        setEventList(filterEvents);
      } else if (value !== listEvents.eventName) {
        ToastError(Strings.NoDataAvailable);
      } else {
        setEventList(eventData);
      }
    },
    [eventData, listEvents],
  );
  // Join event api call
  const onJoinEvent = useCallback(() => {
    try {
      if (invitationCode.length === 0) {
        ToastError(Strings.EmptyInvitationCode);
      } else if (invitationCode.length === 5) {
        ToastError(Strings.InvitationCodeValidation);
      } else {
        dispatch(
          requestJoinEventCode(
            {invitationCode: invitationCode},
            (isSuccess, message) => {
              if (isSuccess) {
                setInvitationCode('');
                dispatch(getEventData());
                onClose();
                ToastSuccess(message);
              } else {
                ToastError(message);
              }
            },
          ),
        );
      }
    } catch (err) {
      console.log('join-event-err ==> ', err);
    }
  }, [dispatch, invitationCode, onClose]);

  const onTaskManagerPress = useCallback(
    item => () => {
      navigation.navigate(NavigationRoutes.AddEvent, {eventType: item});
      onEventClose();
    },
    [navigation, onEventClose],
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.Events}
        profileIcon={
          profileData?.profileUrl
            ? profileData?.profileUrl
            : Images.profileImage
        }
        onProfileAction={onProfileAction}
        titleHeadingStyle={styles.eventTitleStyle}
      />
      <View style={styles.contentContainer}>
        <SearchTextInput
          iconStyle={styles.searchIcon}
          containerStyle={styles.searchContainerStyle}
          textInputStyle={styles.textInput}
          placeholder={Strings.SearchEvent}
          placeholderTextColor={Colors.Gray}
          value={searchText}
          onChangeText={onSearch}
        />

        {listEvents?.length > 0 ? (
          <FlatGrid
            extraData={listEvents}
            style={styles.gridContainer}
            showsVerticalScrollIndicator={false}
            maxItemsPerRow={3}
            itemDimension={100}
            data={listEvents ? listEvents : []}
            keyExtractor={item => item?.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index}
                  style={styles.listDetailView}
                  onPress={onEventPress(item)}>
                  <FastImageView
                    defaultSource={Images.EventImagePlaceholder}
                    uri={
                      item.image
                        ? `${ApiConstants.ImageBaseUrl}/${item.image}`
                        : ''
                    }
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventText} numberOfLines={1}>
                    {item.eventName}
                  </Text>
                </Pressable>
              );
            }}
          />
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsTxt}>
              {Strings.SoQuietHereRightNow}
            </Text>
            <Text numberOfLines={2} style={styles.noEvents}>
              {Strings.noEvents}
            </Text>
          </View>
        )}
        <RBSheet ref={BottomSheetRef} closeOnDragDown={true} closeOnPressMask>
          <SafeAreaView>
            <Pressable style={styles.JoinEventContainer} onPress={onClose}>
              <Text style={styles.headingStyle}>{Strings.EnterEventCode}</Text>
              <CustomTextInput
                placeholder={Strings.EnterEventCode}
                value={invitationCode}
                onChangeText={inviteCode => setInvitationCode(inviteCode)}
                maxLength={6}
                autoCapitalize={'words'}
              />
              <CustomButton
                title={Strings.JoinEvent}
                onPress={onJoinEvent}
                btnStyle={styles.JoinEventBtn}
              />
            </Pressable>
          </SafeAreaView>
        </RBSheet>

        {/* when tap on create event */}
        <RBSheet
          ref={EventBottomSheefRef}
          closeOnDragDown={true}
          closeOnPressMask
          height={670}>
          <SafeAreaView>
            <View style={styles.EventOptionContainer} onPress={onEventClose}>
              <View>
                <View style={styles.mainEventOptionContainer}>
                  <Text style={styles.eventOptionHeadingStyle}>
                    {Strings.ChooseYourFunction}
                  </Text>
                </View>
                <Pressable
                  style={styles.taskManagerContainer}
                  onPress={onTaskManagerPress('team')}>
                  <Text style={styles.taskManagerTextStyle}>
                    {Strings.TeamManager}
                  </Text>
                  <Text style={styles.subTextStyle}>
                    {Strings.TeamManagerDesc}
                  </Text>
                  <View>
                    <Text style={styles.taskManagerTextStyle}>
                      {Strings.Select}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.taskManagerContainer}
                  onPress={onTaskManagerPress('single')}>
                  <Text style={styles.taskManagerTextStyle}>
                    {Strings.SingleEvent}
                  </Text>
                  <Text style={styles.subTextStyle}>
                    {Strings.SingleEventDesc}
                  </Text>
                  <View>
                    <Text style={styles.taskManagerTextStyle}>
                      {Strings.Select}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </RBSheet>

        <FloatingAction actions={actionsList} onPressItem={onFABPress} />
      </View>

      <GoogleAdsComponent />
    </View>
  );
};
export default EventScreen;
