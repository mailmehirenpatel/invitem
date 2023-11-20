import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Image, Pressable, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  deleteEventSchedule,
  getEventObjectData,
  getEventScheduleList,
} from '../../store/actions/EventAction';
import Colors from '../../theme/Colors';
import styles from './styles';
import moment from 'moment';
import AppConstants from '../../constants/AppConstants';

const EventScheduleList = ({route, navigation}) => {
  const {eventObjectData} = useSelector(state => state.event);
  const {locationData} = useSelector(state => state.event); // location data through redux useSelector
  const {userId} = useSelector(state => state.auth);
  const [selected, setSelected] = useState(new Date());
  const today = new Date();
  const dispatch = useDispatch();
  const SelectedLocation = useCallback(
    id => {
      return locationData.find(
        location => location.id === id, // Select Location Location id through navigation params
      );
    },
    [locationData],
  );
  // get event schedule list
  useEffect(() => {
    dispatch(getEventScheduleList(eventObjectData.id));
    return () => {
      dispatch(getEventObjectData(eventObjectData.id));
    };
  }, [dispatch, eventObjectData.id]);
  // on handle day press
  const handleDayPress = day => {
    console.log('Selected day', day);
    setSelected(day.dateString);
    // Use the Alert component to display a popup with the selected day
    Alert.alert('Do you want to create schedule?', day.dateString, [
      {text: 'No', onPress: () => console.log('OK Pressed')},
      {
        text: 'Yes',
        onPress: () =>
          navigation.navigate(NavigationRoutes.AddEventSchedule, {
            selected_date: day.dateString,
          }),
      },
    ]);
  };
  const {eventScheduleList} = useSelector(state => state.event);

  const RenderGuestList = useCallback(
    ({item, index}) => {
      return (
        <View style={styles.guestListContainer} key={index}>
          <View style={styles.subGuestListContainer}>
            <Text>
              {Strings.EventDate}: {new Date(item?.eventDate).toDateString()}
            </Text>
            <Text>
              {Strings.EventStartTime} : {item.startTime}
            </Text>
            <Text>
              {Strings.endTime} : {item.endTime}
            </Text>
            {/* {console.log(SelectedLocation(item?.locationId))} */}
            <Text>
              {Strings.Location} :{' '}
              {SelectedLocation(item?.locationId)?.locationName}
            </Text>
          </View>
          {userId === eventObjectData?.userId && (
            <Pressable
              style={styles.editIconContainer}
              onPress={() =>
                navigation.navigate(NavigationRoutes.UpdateEventScheduleList, {
                  eventScheduleList: item,
                  isEditEvent: true,
                })
              }>
              <Image source={Icons.editIcon} style={styles.editIconStyle} />
            </Pressable>
          )}
          {userId === eventObjectData?.userId && (
            <Pressable
              onPress={() => {
                Alert.alert(
                  Strings.DeleteScheduleConfirmation,
                  '',
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
                          deleteEventSchedule(
                            item?.id,
                            (isSuccess, message) => {
                              if (isSuccess) {
                                ToastSuccess(message);
                                dispatch(
                                  getEventScheduleList(eventObjectData.id),
                                );
                              } else {
                                ToastError(message);
                              }
                            },
                          ),
                        );
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Image source={Icons.deleteIcon} style={styles.deleteIconStyle} />
            </Pressable>
          )}
        </View>
      );
    },
    [
      SelectedLocation,
      dispatch,
      eventObjectData.id,
      eventObjectData?.userId,
      navigation,
      userId,
    ],
  );

  return (
    <View style={styles.guestListMainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.MultiEvent}
        rightText={userId === eventObjectData?.userId && Strings.Add}
        onRightAction={() =>
          navigation.navigate(NavigationRoutes.AddEventSchedule)
        }
      />
      <Calendar
        minDate={moment().format(AppConstants.DateFormats.DayDateMonthYear)}
        style={styles.calendarStyle}
        date={selected}
        initialDate={selected.toString()}
        onDayPress={userId === eventObjectData?.userId && handleDayPress}
        theme={{
          calendarBackground: Colors.White,
          textSectionTitleColor: Colors.Black,
          textSectionTitleDisabledColor: Colors.BorderColor,
          dayTextColor: Colors.Black,
          textDayFontFamily: fonts.type.RobotoSerifRegular,
          textDayFontSize: fonts.size.s12,
          textDayFontWeight: '700',
          todayBackgroundColor:
            today !== selected ? `${Colors.BorderColor}80` : Colors.Transparent,
          todayTextColor: today !== selected ? Colors.DarkGreen : Colors.White,
          selectedDayTextColor: selected !== '' ? Colors.White : Colors.Black,
          agendaDayTextColor: Colors.Green,
          monthTextColor: Colors.DarkGreen,
          indicatorColor: Colors.Red,
          selectedDayBackgroundColor:
            selected === '' ? Colors.White : Colors.logoBackgroundColor,
          arrowColor: Colors.DarkGreen,
          textDisabledColor: `${Colors.Black}40`,
          textMonthFontFamily: fonts.type.RobotoSerifRegular,
          textMonthFontSize: fonts.size.s12,
          textMonthFontWeight: '700',
          stylesheet: {
            calendar: {
              header: {
                week: {
                  marginTop: verticalScale(30),
                  marginHorizontal: scale(12),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              },
            },
          },
        }}
        markedDates={{
          [selected]: {selected: true, marked: false}, // You can customize marked dates as per your requirement
        }}
      />
      <View style={styles.guestListContentContainer}>
        <View style={styles.guestListMainView}>
          {eventScheduleList?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={eventScheduleList}
              renderItem={RenderGuestList}
              keyExtractor={item => item.id?.toString()}
              scrollEnabled={true}
            />
          ) : (
            <View style={styles.emptyDataView}>
              <Text style={styles.emptyDataText}>
                {Strings.NoMultiEventFound}
              </Text>
            </View>
          )}
        </View>
      </View>
      <GoogleAdsComponent />
    </View>
  );
};
export default EventScheduleList;
