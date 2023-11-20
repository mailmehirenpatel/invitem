import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavbar,
  CustomTextInput,
} from '../../components';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  getEventScheduleList,
  requestMultipalEvent,
} from '../../store/actions/EventAction';
import styles from './styles';
const AddEventSchedule = ({route, navigation}) => {
  const {selected_date} = route.params || {};
  const [startDate, setStartDate] = useState(
    selected_date === undefined ? new Date() : new Date(selected_date),
  );
  const [startTime, setStartTime] = useState(moment().format('HH:mm:ss'));
  const [endTime, setEndTime] = useState(moment().format('HH:mm:ss'));
  const [selectLocation, setSelectLocation] = useState(null);
  const {locationData} = useSelector(state => state.event);
  const dispatch = useDispatch();
  const {eventObjectData} = useSelector(state => state.event);
  const [RsvpTitle, setRsvpTitle] = useState('');
  const [RsvpDescription, setRsvpDescription] = useState('');

  const onAddSchedule = useCallback(() => {
    //form validation
    if (RsvpTitle.length === 0) {
      ToastError(Strings.EmptyRSVPTitle);
    } else if (RsvpDescription.length === 0) {
      ToastError(Strings.EmptyRSVPDesc);
    } else if (
      moment(startDate).format(AppConstants.DateFormats.Default) ===
      moment().format(AppConstants.DateFormats.Default)
    ) {
      ToastError(Strings.SelectStartDate);
    } else if (startTime === null) {
      ToastError(Strings.SelectStartTime);
    } else if (endTime === null) {
      ToastError(Strings.SelectEndTime);
    } else if (startTime === endTime) {
      ToastError(Strings.endTimeValidation);
    } else if (selectLocation?.id === undefined) {
      ToastError(Strings.EmptyLocationName);
    } else {
      let MultiEventRequest = {
        eventId: eventObjectData?.id,
        scheduleType: 0,
        startDate:
          moment(startDate).format(AppConstants.DateFormats.Default) +
          'T' +
          startTime,
        endDate:
          moment(startDate).format(AppConstants.DateFormats.Default) +
          'T' +
          endTime,
        startTime: null,
        endTime: null,
        dayOfMonth: 0,
        customSchedules: [],
        title: RsvpTitle,
        description: RsvpDescription,
        locationId: selectLocation?.id,
      };

      dispatch(
        requestMultipalEvent(MultiEventRequest, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            navigation.navigate(NavigationRoutes.EventScheduleList);
            dispatch(getEventScheduleList(eventObjectData.id));
          } else {
            ToastError(message);
          }
        }),
      );
    }
  }, [
    RsvpDescription,
    RsvpTitle,
    dispatch,
    endTime,
    eventObjectData.id,
    navigation,
    selectLocation,
    startDate,
    startTime,
  ]);

  return (
    <View style={styles.mainEventContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.AddScheduleEventList}
        rightText={Strings.Save}
        onRightAction={onAddSchedule}
      />
      <View style={{marginHorizontal: 20}}>
        <View style={styles.eventDateContainer}>
          <CustomTextInput
            placeholder={Strings.rsvpTitle}
            value={RsvpTitle}
            onChangeText={txt => setRsvpTitle(txt)}
            inputStyle={styles.textInputStyle}
            containerStyle={styles.textInputContainerStyle}
          />
          <CustomTextInput
            placeholder={Strings.rsvpDescription}
            value={RsvpDescription}
            onChangeText={txt => setRsvpDescription(txt)}
            inputStyle={styles.textInputStyle}
            containerStyle={styles.textInputContainerStyle}
            autoCapitalize={'sentences'}
          />
          <View style={styles.dateTimeView}>
            <View style={styles.eventDateLabelRow}>
              <Text style={styles.eventLabelText}>
                {Strings.EventStartDate}
              </Text>
            </View>
            <View style={styles.eventDateRow}>
              <Text style={styles.mainViewTimeWithDescription}>
                {moment(startDate).format(AppConstants.DateFormats.Default)}
              </Text>
              <CustomDatePicker
                Mode="date"
                minDate={new Date()}
                selectedDate={startDate}
                setDate={date => {
                  setStartDate(date);
                }}
              />
            </View>
            <View style={styles.eventDateLabelRow}>
              <Text style={styles.eventLabelText}>
                {Strings.EventStartTime}
              </Text>
            </View>

            <View style={styles.eventDateRow}>
              <Text style={styles.mainViewTimeWithDescription}>
                {startTime}
              </Text>
              <CustomDatePicker
                isClock
                Mode="time"
                selectedDate={startTime}
                setDate={time => {
                  setStartTime(moment(time).format('HH:mm:ss'));
                }}
              />
            </View>
          </View>
          <View style={styles.dateTimeView}>
            <View style={styles.eventDateLabelRow}>
              <Text style={styles.eventLabelText}>{Strings.EventEndTime}</Text>
            </View>
            <View style={styles.eventDateRow}>
              <Text style={styles.mainViewTimeWithDescription}>{endTime}</Text>
              <CustomDatePicker
                isClock
                Mode="time"
                selectedDate={endTime}
                setDate={time => {
                  setEndTime(moment(time).format('HH:mm:ss'));
                }}
              />
            </View>
            <View>
              <CustomSelectDropDown
                defaultValueByIndex={selectLocation && selectLocation?.id}
                defaultValue={selectLocation && selectLocation}
                data={locationData}
                defaultButtonText={Strings.SelectLocation}
                buttonStyle={styles.LocationMainContainer}
                rowTextForSelection={item => {
                  return item.locationName;
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem.locationName;
                }}
                onSelect={item => {
                  setSelectLocation(item);
                }}
                searchPlaceHolder={Strings.SearchLocation}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddEventSchedule;
