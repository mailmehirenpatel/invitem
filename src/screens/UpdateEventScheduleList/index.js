import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
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
  requestUpdateSchedule,
} from '../../store/actions/EventAction';
import styles from './styles';
const UpdateEventScheduleList = ({route, navigation}) => {
  const {eventScheduleList} = route.params || {};
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(moment().format('HH:mm:ss'));

  const [endTime, setEndTime] = useState(moment().format('HH:mm:ss'));
  const [selectLocation, setSelectLocation] = useState(null);
  const {locationData} = useSelector(state => state.event);
  const dispatch = useDispatch();
  const {eventObjectData} = useSelector(state => state.event);
  const [RsvpTitle, setRsvpTitle] = useState('');
  const [RsvpDescription, setRsvpDescription] = useState('');
  // get schedule list API call

  const onUpdateSchedule = useCallback(() => {
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
      let RequestData = {
        id: eventScheduleList?.id,
        eventId: eventObjectData?.id,
        eventDate: moment(startDate).format(AppConstants.DateFormats.Default),
        startTime: startTime,
        endTime: endTime,
        locationId: selectLocation?.id,
        rsvpTitle: RsvpTitle,
        rsvpDescription: RsvpDescription,
      };
      //console.log(RequestData);

      dispatch(
        requestUpdateSchedule(RequestData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            dispatch(getEventScheduleList(eventObjectData.id));
            navigation.navigate(NavigationRoutes.EventScheduleList);
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
    eventScheduleList?.id,
    navigation,
    selectLocation?.id,
    startDate,
    startTime,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStartDate(new Date(eventScheduleList.eventDate));
      setSelectLocation(
        locationData?.find(i => i.id === eventScheduleList.locationId), // find location through location id
      );
      setStartTime(eventScheduleList?.startTime);
      setEndTime(eventScheduleList?.endTime);
      setRsvpTitle(eventScheduleList?.rsvpTitle);
      setRsvpDescription(eventScheduleList?.rsvpDescription);
    });
    return unsubscribe;
  }, [
    eventScheduleList?.endTime,
    eventScheduleList.eventDate,
    eventScheduleList.eventScheduleList,
    eventScheduleList.locationId,
    eventScheduleList?.rsvpDescription,
    eventScheduleList?.rsvpTitle,
    eventScheduleList?.startTime,
    locationData,
    navigation,
  ]);
  return (
    <View style={styles.mainEventContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.UpdateScheduleEventList}
        rightText={Strings.Save}
        onRightAction={onUpdateSchedule}
      />
      <View style={styles.updateScheduleContainer}>
        <View style={styles.viewContainer}>
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
          <View style={styles.eventDateLabelRow}>
            <Text style={styles.eventLabelText}>{Strings.EventStartDate}</Text>
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
            <Text style={styles.eventLabelText}>{Strings.EventStartTime}</Text>
          </View>
          <View style={styles.eventDateRow}>
            <Text style={styles.mainViewTimeWithDescription}>{startTime}</Text>
            <CustomDatePicker
              isClock
              Mode="time"
              selectedDate={startTime}
              setDate={date => {
                setStartTime(moment(date).format('HH:mm:ss'));
              }}
            />
          </View>

          <View style={styles.eventDateLabelRow}>
            <Text style={styles.eventLabelText}>{Strings.EventEndTime}</Text>
          </View>
          <View style={styles.eventDateRow}>
            <Text style={styles.mainViewTimeWithDescription}>{endTime}</Text>
            <CustomDatePicker
              isClock
              Mode="time"
              selectedDate={endTime}
              setDate={date => {
                setEndTime(moment(date).format('HH:mm:ss'));
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
  );
};

export default UpdateEventScheduleList;
