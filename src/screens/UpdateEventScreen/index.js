// 3rd Party Imports
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons, Images} from '../../assets';
import {
  CircleFilledIcon,
  CustomButton,
  CustomDatePicker,
  CustomImagePicker,
  CustomNavbar,
  CustomTextInput,
} from '../../components';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import MultiUserView from '../../components/MultiUserView';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {getEventData, putEventData} from '../../store/actions/EventAction';
import {uploadMediaRequest} from '../../store/actions/profileActions';
import styles from '../UpdateEventScreen/styles';

const UpdateEventScreen = ({navigation, route}) => {
  const {eventObjectData} = useSelector(state => state.event);
  const [startDate, setStartDate] = useState(
    moment(eventObjectData?.startDate).format(AppConstants.DateFormats.Default),
  );
  const [endDate, setEndDate] = useState(
    moment(eventObjectData?.endDate).format(AppConstants.DateFormats.Default),
  );
  const [startTime, setStartTime] = useState(moment().format('HH:mm:ss'));
  const [endTime, setEndTime] = useState(moment().format('HH:mm:ss'));
  const [imagePath, setImagePath] = useState();
  const [selectLocation, setSelectLocation] = useState(null);
  const [selectEventType, setSelectEventType] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isPick, setIsPick] = useState(false);

  // state for multi event switch functionality.
  // const [isEnabled, setIsEnabled] = useState();
  const dispatch = useDispatch();

  // Get category and location data.
  const {categoryData, locationData} = useSelector(state => state.event);
  // Global Add Event Field References
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setImagePath(eventObjectData?.image.toString()), // set image path functionality
        setSelectLocation(
          locationData?.find(i => i.id === eventObjectData.locationId), // find location through location id
        ),
        setSelectEventType(
          categoryData?.find(i => i.id === eventObjectData.categoryId), // find category Type through category id
        ),
        setEventName(eventObjectData?.eventName),
        setEventDescription(eventObjectData?.description);
      setStartDate(new Date(eventObjectData?.startDate));
      setEndDate(new Date(eventObjectData?.endDate));
      setStartTime(eventObjectData?.eventDateSchedule[0]?.startTime);
      setEndTime(eventObjectData?.eventDateSchedule[0]?.endTime);
    });
    return unsubscribe;
  }, [
    categoryData,
    endTime,
    eventObjectData.categoryId,
    eventObjectData?.description,
    eventObjectData?.endDate,
    eventObjectData.eventDateSchedule,
    eventObjectData?.eventName,
    eventObjectData?.image,
    eventObjectData.locationId,
    eventObjectData?.startDate,
    locationData,
    navigation,
    startTime,
  ]);

  // select Location
  const onSelectLocation = location => {
    setSelectLocation(location);
  };

  // Select Event Type
  const onSelectEvent = selectedItem => {
    setSelectEventType(selectedItem);
  };

  // Camera Icon Click Show and Hide Image Picker Functionality
  const onCameraAction = useCallback(() => {
    setIsPick(true);
  }, []);

  // Custom Switch Toggle Button
  // const toggleSwitch = useCallback(() => setIsEnabled(!isEnabled), [isEnabled]);

  // Navigate To InfoTabs
  const onRightActionClicked = useCallback(
    () => navigation.navigate(NavigationRoutes.AdminInfo, {isUpdate: true}),
    [navigation],
  );

  // Event detail Participant list show through navigation params
  const onAddUser = useCallback(() => {
    navigation.navigate(NavigationRoutes.AddUser, {
      isUpdate: true,
    });
  }, [navigation]);

  // Api call for update event
  const onUpdateEvent = useCallback(() => {
    let RequestData = {
      id: eventObjectData.id,
      image: imagePath,
      eventName: eventName,
      description: eventDescription,
      locationId: selectLocation?.id,
      startDate:
        moment(startDate).format(AppConstants.DateFormats.Default) +
        'T' +
        startTime,
      endDate:
        moment(endDate).format(AppConstants.DateFormats.Default) +
        'T' +
        endTime,
      startTime: startTime ? startTime : null,
      endTime: endTime ? endTime : null,
      categoryId: selectEventType?.id,
      isMultipleEvent: eventObjectData?.isMultipleEvent,
    };
    //console.log(RequestData);
    //console.log(eventObjectData);

    if (eventName.length === 0) {
      ToastError(Strings.BlankEventError);
    } else if (
      eventObjectData.isMultipleEvent === false &&
      startTime === endTime
    ) {
      ToastError(Strings.endTimeValidation);
    } else if (!selectEventType) {
      ToastError(Strings.EventTypeError);
    } else if (!selectLocation) {
      ToastError(Strings.LocationSelectionError);
    } else if (typeof imagePath === 'object') {
      dispatch(
        uploadMediaRequest(
          imagePath,
          AppConstants.fileDriveName.Event,
          (isUploaded, data) => {
            if (isUploaded && data[0].isSuccess) {
              dispatch(
                putEventData(
                  {...RequestData, image: data[0]?.fileUrl},
                  (isSuccess, message) => {
                    if (isSuccess) {
                      ToastSuccess(message);
                      dispatch(getEventData());
                      navigation.navigate(NavigationRoutes.EventScreen);
                    } else {
                      ToastError(message);
                    }
                  },
                ),
              );
            }
          },
        ),
      );
    } else {
      dispatch(
        putEventData(RequestData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            dispatch(getEventData());
            navigation.navigate(NavigationRoutes.EventScreen);
          } else {
            ToastError(message);
          }
        }),
      );
    }
  }, [
    dispatch,
    endDate,
    endTime,
    eventDescription,
    eventName,
    eventObjectData,
    imagePath,
    navigation,
    selectEventType,
    selectLocation,
    startDate,
    startTime,
  ]);

  return (
    <View style={styles.mainEventContainer}>
      <CustomNavbar
        title={Strings.UpdateEvent}
        leftIcon={Icons.backArrowIcon}
        rightText={Strings.InfoTabs}
        onRightAction={onRightActionClicked}
      />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.viewContainer}>
          <View style={styles.EventContainer}>
            <View>
              <Image
                source={
                  imagePath &&
                  typeof imagePath === 'string' &&
                  imagePath.length > 0
                    ? {uri: `${ApiConstants.ImageBaseUrl}/${imagePath}`}
                    : imagePath?.uri
                    ? {uri: imagePath.uri}
                    : Images.EventImagePlaceholder
                }
                style={styles.EventLogo}
              />

              <CircleFilledIcon
                icon={Icons.cameraIcon}
                containerStyle={styles.cameraIconContainer}
                iconStyle={styles.cameraIcon}
                onPress={onCameraAction}
              />
              <CustomImagePicker
                isPickerVisible={isPick}
                setPickerVisible={setIsPick}
                setImageSource={setImagePath}
              />
            </View>
          </View>

          <View style={styles.eventSubContainer}>
            <Text style={styles.eventLabelText}>
              {eventObjectData.isMultipleEvent === false
                ? Strings.EnterTitle
                : Strings.enterTeamName}
            </Text>
            <CustomTextInput
              placeholder={
                eventObjectData.isMultipleEvent === false
                  ? Strings.AddTitle
                  : Strings.addTeamName
              }
              value={eventName}
              onChangeText={txt => setEventName(txt)}
              returnKeyType={'next'}
              inputStyle={styles.textInputStyle}
              containerStyle={styles.textInputContainerStyle}
              autoCapitalize={'words'}
            />
          </View>

          <View style={styles.eventSubContainer}>
            <Text style={styles.eventLabelText}>
              {Strings.EventDescription}
            </Text>
            <CustomTextInput
              placeholder={Strings.AddDescription}
              returnKeyType={'return'}
              value={eventDescription}
              onChangeText={txt => setEventDescription(txt)}
              inputStyle={styles.textInputDescriptionStyle}
              containerStyle={styles.textInputContainerDescriptionStyle}
              multiline={true}
              autoCapitalize={'sentences'}
            />
          </View>
          {eventObjectData.isMultipleEvent === false && (
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
                    setDate={date => {
                      setStartTime(moment(date).format('HH:mm:ss'));
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
                    maxDate={new Date().setFullYear(
                      new Date(startDate).getFullYear() + 1,
                    )}
                    selectedDate={endDate}
                    setDate={date => {
                      setEndDate(date);
                    }}
                  />
                </View>

                <View style={styles.eventDateLabelRow}>
                  <Text style={styles.eventLabelText}>
                    {Strings.EventEndTime}
                  </Text>
                </View>
                <View style={styles.eventDateRow}>
                  <Text style={styles.mainViewTimeWithDescription}>
                    {endTime}
                  </Text>
                  <CustomDatePicker
                    isClock
                    Mode="time"
                    selectedDate={endTime}
                    setDate={date => {
                      setEndTime(moment(date).format('HH:mm:ss'));
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          {/* profile selection for future use */}
          <View style={styles.eventGuestContainer}>
            <Text style={styles.eventLabelText}>{Strings.AddContacts}</Text>
            <MultiUserView
              listUsers={eventObjectData?.eventParticipants}
              btnText={Strings.Contacts}
              // onMoreAction={onAddUser}
              onRightAction={onAddUser}
            />
          </View>

          <View style={styles.eventTypeContainer}>
            <Text style={styles.eventLabelText}>{Strings.EventType}</Text>
            <View>
              <CustomSelectDropDown
                data={categoryData}
                defaultValue={selectEventType && selectEventType}
                defaultValueByIndex={selectEventType && selectEventType?.id}
                defaultButtonText={Strings.SelectEventType}
                buttonStyle={styles.LocationMainContainer}
                rowTextForSelection={item => {
                  return item.categoryName;
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem.categoryName;
                }}
                onSelect={item => {
                  setSelectEventType(item);
                }}
                searchPlaceHolder={Strings.SearchEventType}
              />
            </View>
          </View>

          <View style={styles.eventSubContainer}>
            <View style={styles.locationViewContainer}>
              <Text style={styles.eventLabelText}>
                {Strings.AddLocationForEvent}
              </Text>
              <CircleFilledIcon
                icon={Icons.plusIcon}
                iconStyle={styles.addLocationIcon}
                containerStyle={styles.addLocationIconContainer}
                onPress={() => {
                  navigation.navigate(NavigationRoutes.AddLocation);
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

          {selectLocation ? (
            <MapView
              ref={mapRef}
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
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
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        title={Strings.update}
        btnStyle={styles.btnContainerStyle}
        onPress={onUpdateEvent}
      />
    </View>
  );
};

export default UpdateEventScreen;
