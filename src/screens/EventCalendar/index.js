// 3rd Party Imports
import React, {useCallback, useEffect} from 'react';
import {FlatList, Pressable, ScrollView, Text, View} from 'react-native';

// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CircleFilledIcon, CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {loaderRef} from '../../components/Loader';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {getImageByEventId} from '../../store/actions/ChatAction';
import {
  getEventObjectData,
  getUpComingEvents,
} from '../../store/actions/EventAction';
import {getEventInfoChirps} from '../../store/actions/InfoChirpsAction';
import {onMute} from '../../store/slice/eventSlice';
import styles from './styles';

const UpcomingEvents = ({navigation}) => {
  // For future use
  // const [selected, setSelected] = useState(new Date());
  // const today = new Date();
  const dispatch = useDispatch();
  // Get upcoming events
  useEffect(() => {
    dispatch(getUpComingEvents());
  }, [dispatch]);
  const {upcomingEventData} = useSelector(state => state.event);

  // on event press functionality
  const onEventPress = useCallback(
    item => () => {
      loaderRef.current.show();
      dispatch(onMute(item.isMute));
      // dispatch(onEventObjectData({result: [{}]}));
      dispatch(
        getEventObjectData(item.eventId, issuccess => {
          if (issuccess) {
            dispatch(
              getImageByEventId(item.eventId, issuccess2 => {
                if (issuccess2) {
                  dispatch(
                    getEventInfoChirps(item.eventId, isSuccess3 => {
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
  // FlatList Render Item
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Pressable
          style={styles.flatDetailView}
          key={index}
          onPress={onEventPress(item)}>
          <CircleFilledIcon
            icon={Icons.CalendarIcn}
            iconStyle={styles.calendarIcon}
            containerStyle={styles.calendarIconViewStyle}
          />
          <View>
            <Text style={styles.scheduleText}>{item.eventName}</Text>
            <Text style={styles.scheduleText}>
              {Strings.EventDate}: {new Date(item?.eventDate).toDateString()}
            </Text>
            <Text style={styles.scheduleTimeText}>
              {Strings.EventStartTime}: {item.startTime}
            </Text>
            <Text style={styles.scheduleTimeText}>
              {Strings.EventEndTime}: {item.endTime}
            </Text>
          </View>
        </Pressable>
      );
    },
    [onEventPress],
  );
  // Future use
  // const renderCalendar = () => {
  //   return (
  //     <Calendar
  //       style={styles.calendarStyle}
  //       date={selected}
  //       initialDate={selected.toString()}
  //       onDayPress={day => {
  //         setSelected(day.dateString);
  //       }}
  //       theme={{
  //         calendarBackground: Colors.White,
  //         textSectionTitleColor: Colors.Black,
  //         textSectionTitleDisabledColor: Colors.BorderColor,
  //         dayTextColor: Colors.Black,
  //         textDayFontFamily: fonts.type.RobotoSerifRegular,
  //         textDayFontSize: fonts.size.s12,
  //         textDayFontWeight: '700',
  //         todayBackgroundColor:
  //           today !== selected ? `${Colors.BorderColor}80` : Colors.Transparent,
  //         todayTextColor: today !== selected ? Colors.DarkGreen : Colors.White,
  //         selectedDayTextColor: selected !== '' ? Colors.White : Colors.Black,
  //         agendaDayTextColor: Colors.Green,
  //         monthTextColor: Colors.DarkGreen,
  //         indicatorColor: Colors.Red,
  //         selectedDayBackgroundColor:
  //           selected === '' ? Colors.White : Colors.logoBackgroundColor,
  //         arrowColor: Colors.DarkGreen,
  //         textDisabledColor: `${Colors.Black}40`,
  //         textMonthFontFamily: fonts.type.RobotoSerifRegular,
  //         textMonthFontSize: fonts.size.s12,
  //         textMonthFontWeight: '700',
  //         stylesheet: {
  //           calendar: {
  //             header: {
  //               week: {
  //                 marginTop: verticalScale(30),
  //                 marginHorizontal: scale(12),
  //                 flexDirection: 'row',
  //                 justifyContent: 'space-between',
  //               },
  //             },
  //           },
  //         },
  //       }}
  //       markedDates={{
  //         [selected]: {selected: true, marked: false}, // You can customize marked dates as per your requirement
  //       }}
  //     />
  //   );
  // };
  // const onRightAction = useCallback(() => {}, []); for future use
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.UpcomingEvents}
        leftIcon={Icons.backArrowIcon}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.mainView}>
            {upcomingEventData?.length > 0 ? (
              <FlatList
                // ListHeaderComponent={renderCalendar} // Future Use
                scrollEnabled={false}
                data={upcomingEventData}
                keyExtractor={item => item?.eventId}
                renderItem={renderItem}
              />
            ) : (
              <View style={styles.emptyDataView}>
                <Text style={styles.emptyDataText}>
                  {Strings.NoUpcomingEventFound}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <GoogleAdsComponent />
    </View>
  );
};

export default UpcomingEvents;
