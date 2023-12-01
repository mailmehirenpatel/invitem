// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Share,
  Text,
  View,
  Alert,
} from 'react-native';

// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons, Images} from '../../assets';
import {
  CustomButton,
  CustomNavbar,
  CustomProfileImage,
  CustomSwitch,
  FastImageView,
} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {guestEventProfileNotifications} from '../../constants/mockdata';
import {deleteEvent, putMuteChat} from '../../store/actions/EventAction';
import {onMute} from '../../store/slice/eventSlice';
import styles from './styles';
import NavigationRoutes from '../../constants/NavigationRoutes';

const GuestEventProfile = ({navigation}) => {
  const {eventObjectData, isMute} = useSelector(state => state.event);
  const [selectedItems, setSelectedItems] = useState(false);
  const {userId} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  // Render FlatList GuestList Notification Item
  useEffect(() => {
    isMute && setSelectedItems(isMute);
  }, [isMute]);

  const handleSwitchChange = useCallback(() => {
    setSelectedItems(!selectedItems);
    const data = {
      userId: '',
      eventId: eventObjectData?.id,
      isMute: !selectedItems,
    };
    dispatch(
      putMuteChat(data, (isSuccess, message) => {
        isSuccess && ToastSuccess(message);
        dispatch(onMute(!selectedItems));
        //isSuccess && dispatch(getEventObjectData(eventObjectData?.id));
      }),
    );
  }, [dispatch, eventObjectData?.id, selectedItems]);

  const HandleDeleteEvent = useCallback(() => {
    //console.log('delete event....');
    Alert.alert(
      Strings.DeleteEventConfirmation1,
      Strings.DeleteEventConfirmation2,
      [
        {
          text: Strings.No,
          onPress: () => console.log('No Pressed'),
          style: Strings.cancel,
        },
        {
          text: Strings.Yes,
          onPress: () => {
            dispatch(
              deleteEvent(eventObjectData?.id, (isSuccess, message) => {
                if (isSuccess) {
                  ToastSuccess(message);
                  navigation.navigate(NavigationRoutes.EventScreen);
                } else {
                  ToastError(message);
                }
              }),
            );
          },
        },
      ],
      {cancelable: false},
    );
  }, [dispatch, eventObjectData?.id, eventObjectData?.name, navigation]);

  const RenderGuestListNotification = useCallback(
    ({item, index}) => {
      // mute chat functionality

      return (
        <View style={styles.guestEventProfileNotificationContainer} key={index}>
          <View style={styles.guestEventProfileNotificationView}>
            <View
              style={[
                styles.guestEventProfileNotification,
                {
                  backgroundColor: item.color,
                },
              ]}>
              <Image
                source={item.image}
                style={styles.guestEventProfileImage}
              />
            </View>
            <Text style={styles.guestEventProfileText}>{item.name}</Text>
          </View>
          <CustomSwitch
            onValueChange={handleSwitchChange}
            isEnabled={selectedItems}
          />
        </View>
      );
    },
    [handleSwitchChange, selectedItems],
  );

  // Render FlatList Participant Data
  const RenderParticipantData = useCallback(({item, index}) => {
    return (
      <View
        key={index}
        style={styles.guestEventProfileParticipateMainContainer}>
        <View style={styles.guestEventProfileParticipateContainer}>
          <View style={styles.guestEventProfileContainer}>
            <View style={styles.guestProfileLeftContainer}>
              <CustomProfileImage
                image={item?.participantImage}
                imageStyle={styles.guestEventProfileParticipateImage}
              />
              <Text style={styles.guestEventProfileParticipateName}>
                {item.participantName}
              </Text>
            </View>
            {item.isAdmin && (
              <View style={styles.guestTextContainer}>
                <Text style={styles.guestText}>{Strings.Admin}</Text>
              </View>
            )}
            {item.isGuest && (
              <View style={styles.guestTextContainer}>
                <Text style={styles.guestText}>{Strings.Guest}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }, []);

  // FlatList Render Item
  const RenderItem = useCallback(
    item => RenderParticipantData(item),
    [RenderParticipantData],
  );

  // FlatList Render Header Data
  const RenderHeaderData = useCallback(() => {
    return (
      <View style={styles.headerListComponent}>
        <Text style={styles.participantTextStyle}>
          {eventObjectData?.eventParticipants?.length} Users
        </Text>
        {/* search icon */}
        {/* <Image source={Icons.searchIcon} style={styles.searchIconStyle} /> */}
      </View>
    );
  }, [eventObjectData?.eventParticipants?.length]);

  return (
    <View style={styles.guestProfileListMainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        rightIcon={[Icons.shareIcn]}
        onRightAction={() => {
          Share.share({
            message: `Join Event with this event code: ${eventObjectData?.eventCode}`,
          });
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <View style={styles.guestProfileListTopContainer}>
          <FastImageView
            uri={
              eventObjectData?.image
                ? `${ApiConstants.ImageBaseUrl}/${eventObjectData?.image}`
                : ''
            }
            style={styles.eventProfileLogo}
            defaultSource={Images.EventImagePlaceholder}
          />
          {/* <Image source={mockImages.Hockey} style={styles.eventProfileLogo} /> */}
          <Text style={styles.mainHeading}>{eventObjectData?.eventName}</Text>
          {userId === eventObjectData?.userId && (
            <CustomButton
              title={Strings.DeleteEvent}
              onPress={HandleDeleteEvent}
              btnStyle={styles.btnDeleteEvent}
            />
          )}
        </View>

        <View style={styles.guestEventProfileNotificationsContainer}>
          <View style={styles.scrollViewNotificationStyle}>
            <FlatList
              scrollEnabled={false}
              data={guestEventProfileNotifications}
              renderItem={RenderGuestListNotification}
              keyExtractor={item => item?.id?.toString()}
            />
          </View>
        </View>

        <View style={styles.participantMainContainer}>
          <FlatList
            data={eventObjectData?.eventParticipants}
            scrollEnabled={false}
            renderItem={RenderItem}
            keyExtractor={item => item?.id?.toString()}
            ListHeaderComponent={RenderHeaderData}
          />
        </View>
      </ScrollView>
      <GoogleAdsComponent />
    </View>
  );
};

export default GuestEventProfile;
