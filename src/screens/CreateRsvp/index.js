// 3rd Party Imports
import React, {useCallback, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

// Local Imports
import {Icons} from '../../assets';
import {
  CircleFilledIcon,
  CustomButton,
  CustomDatePicker,
  CustomNavbar,
  CustomTextInput,
} from '../../components';
import {Strings} from '../../config/strings';
import moment from 'moment';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import AppConstants from '../../constants/AppConstants';
import {answerDeadlineData, recurringData} from '../../constants/mockdata';
import {styles} from './styles';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddRSVPInfoChirps,
  getEventInfoChirps,
} from '../../store/actions/InfoChirpsAction';

export default function CreateRsvp({navigation, route}) {
  const {InfoChirpsId} = route?.params || {};
  const dispatch = useDispatch();
  const [RsvpTitle, setRsvpTitle] = useState('');
  const [RsvpDescription, setRsvpDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [answerDeadline, setAnswerDeadline] = useState(null);
  const [sendRSVP, setSendRSVP] = useState(new Date());
  const [selectRecurring, setSelectRecurring] = useState(null);
  const [selectEventType, setSelectEventType] = useState(null);
  const [selectLocation, setSelectLocation] = useState(undefined);
  const {categoryData, locationData} = useSelector(state => state.event);
  const {eventObjectData} = useSelector(state => state.event);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const daysBeforeAfter = day => {
    const today = moment(new Date());
    const diff = moment(day).diff(today, 'days');
    return diff > 0
      ? `${Math.abs(diff)} ${Math.abs(diff) > 1 ? 'days' : 'day'} after`
      : `${Math.abs(diff)} ${Math.abs(diff) > 1 ? 'days' : 'day'} before`;
  };
  const weekBeforeAndAfter = day => {
    const today = moment(new Date());
    const diff = moment(day).diff(today, 'week');
    return diff > 0
      ? `${Math.abs(diff)} ${Math.abs(diff) > 1 ? 'weeks' : 'week'} after`
      : `${Math.abs(diff)} ${Math.abs(diff) > 1 ? 'weeks' : 'week'} before`;
  };

  const onAddRSVP = useCallback(() => {
    const RequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: RsvpTitle,
      description: RsvpDescription,
      startDate: startDate,
      endDate: endDate,
      recurring: selectRecurring?.id,
      stopRecurring: moment(new Date()),
      answerDeadline: answerDeadline?.id,
      sendRSVP: sendRSVP,
      eventTypeId: selectEventType?.id,
      locationId: selectLocation?.id,
      eventDateScheduleId: null,
    };
    if (RsvpTitle === '') {
      ToastError("Title can't be blank..");
    } else if (RsvpDescription === '') {
      ToastError("Description can't be blank..");
    } else {
      dispatch(
        AddRSVPInfoChirps(RequestData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            // setIsEdit(false);
            dispatch(getEventInfoChirps(eventObjectData.id));
            setRsvpTitle('');
            setRsvpDescription('');
            setStartDate(moment().format(AppConstants.DateFormats.Default));
            navigation.goBack();
          } else {
            ToastError(message);
          }
        }),
      );
    }
  }, [
    eventObjectData.id,
    InfoChirpsId,
    RsvpTitle,
    RsvpDescription,
    startDate,
    endDate,
    selectRecurring?.id,
    answerDeadline?.id,
    sendRSVP,
    selectEventType?.id,
    selectLocation?.id,
    dispatch,
    navigation,
  ]);
  const getNewLocationData = useCallback(newLocation => {
    setSelectLocation(newLocation);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.createRsvp}
        onBackAction={() => {
          navigation.goBack();
        }}
      />

      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.adminInfoMainView}>
          <CustomTextInput
            placeholder={Strings.rsvpTitle}
            value={RsvpTitle}
            onChangeText={txt => setRsvpTitle(txt)}
          />
          <CustomTextInput
            placeholder={Strings.rsvpDescription}
            value={RsvpDescription}
            onChangeText={txt => setRsvpDescription(txt)}
          />

          <View style={styles.eventDateContainer}>
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
                    setEndDate(date);
                  }}
                />
              </View>
            </View>
            <View style={styles.dateTimeView}>
              <View style={styles.eventDateLabelRow}>
                <Text style={styles.eventLabelText}>
                  {Strings.EventEndDate}
                </Text>
              </View>
              <View style={styles.eventDateRow}>
                <Text style={styles.mainViewTimeWithDescription}>
                  {moment(endDate).format(AppConstants.DateFormats.Default)}
                </Text>
                <CustomDatePicker
                  Mode="date"
                  minDate={startDate}
                  selectedDate={endDate}
                  setDate={date => {
                    setEndDate(date);
                  }}
                />
              </View>
            </View>
          </View>

          <CustomSelectDropDown
            data={recurringData}
            defaultValue={selectRecurring && selectRecurring}
            defaultValueByIndex={selectRecurring && selectRecurring?.id}
            defaultButtonText={Strings.recurring}
            buttonStyle={styles.dropdownContainer}
            rowTextForSelection={item => {
              return item?.name;
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem?.name;
            }}
            onSelect={item => {
              setSelectRecurring(item);
            }}
            searchPlaceHolder={Strings.searchRecurring}
          />

          <View style={styles.eventDateContainer}>
            <CustomSelectDropDown
              data={answerDeadlineData}
              defaultValue={answerDeadline && answerDeadline}
              defaultValueByIndex={answerDeadline && answerDeadline?.id}
              defaultButtonText={Strings.answerDeadline}
              buttonStyle={styles.dropdownContainer}
              rowTextForSelection={item => {
                return item?.day;
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem?.day;
              }}
              onSelect={item => {
                setAnswerDeadline(item);
              }}
              searchPlaceHolder={Strings.searchRecurring}
            />
            <View style={styles.dateTimeView}>
              <View style={styles.eventDateLabelRow}>
                <Text style={styles.eventLabelText}>{Strings.sendRSVP}</Text>
              </View>
              <View style={styles.eventDateRow}>
                <Text style={styles.mainViewTimeWithDescription}>
                  {weekBeforeAndAfter(sendRSVP)}
                </Text>
                <CustomDatePicker
                  Mode="date"
                  selectedDate={sendRSVP}
                  setDate={date => {
                    setSendRSVP(date);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.locationViewContainer}>
            {eventObjectData?.isMultipleEvent ? (
              <Text style={styles.addLocationEventLable}>
                {Strings.AddHomeClubLocation}
              </Text>
            ) : (
              <Text style={styles.addLocationEventLable}>
                {Strings.AddEventLocation}
              </Text>
            )}
            <CircleFilledIcon
              icon={Icons.plusIcon}
              iconStyle={styles.addLocationIcon}
              containerStyle={styles.addLocationIconContainer}
              onPress={() => {
                setSelectLocation(undefined);
                navigation.navigate(NavigationRoutes.AddLocation, {
                  getNewLocationData,
                });
              }}
            />
          </View>
          <CustomSelectDropDown
            defaultValueByIndex={selectLocation && selectLocation?.id}
            defaultValue={selectLocation && selectLocation}
            data={locationData}
            defaultButtonText={Strings.SelectLocation}
            buttonStyle={styles.dropdownContainer}
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
          {selectLocation ? (
            <MapView
              ref={mapRef}
              cacheEnabled
              style={styles.mapStyle}
              scrollEnabled={false}
              provider={PROVIDER_GOOGLE}
              zoomEnabled={false}
              zoomTapEnabled={false}
              region={{
                latitude: selectLocation.latitude,
                longitude: selectLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              initialRegion={{
                latitude: selectLocation.latitude,
                longitude: selectLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                ref={markerRef}
                coordinate={{
                  latitude: selectLocation.latitude,
                  longitude: selectLocation.longitude,
                }}
                title={selectLocation.locationName}
              />
            </MapView>
          ) : null}
          <CustomButton
            title={Strings.AddRSVP}
            btnStyle={styles.btnContainerStyle}
            onPress={onAddRSVP}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
