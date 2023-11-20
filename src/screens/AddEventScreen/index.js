// 3rd Party Imports
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import RBSheet from 'react-native-raw-bottom-sheet';
import {FlatGrid} from 'react-native-super-grid';
import {Icons} from '../../assets';
import {
  CircleFilledIcon,
  CustomButton,
  CustomDatePicker,
  CustomNavbar,
  CustomTextInput,
} from '../../components';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {
  ToastError,
  ToastInDevelopment,
  ToastSuccess,
} from '../../constants/ToastConstants';
import {weekDays} from '../../constants/mockdata';
import {
  addEventData,
  getEventData,
  requestMultipalEvent,
} from '../../store/actions/EventAction';
import {uploadMediaRequest} from '../../store/actions/profileActions';
import Colors from '../../theme/Colors';
import styles from '../AddEventScreen/styles';
import UploadImageComponent from './Component/UploadImage';

const AddEventScreen = ({navigation, route}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(moment().format('HH:mm:ss'));
  //const [startTime, setStartTime] = useState(new Date().setHours(9, 0, 0));
  const [endTime, setEndTime] = useState(moment().format('HH:mm:ss'));
  //const [endTime, setEndTime] = useState(new Date().setHours(21, 0, 0));
  const [imagePath, setImagePath] = useState();
  const [selectLocation, setSelectLocation] = useState(undefined);

  const [selectEventType, setSelectEventType] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [EventResult, setEventResult] = useState(undefined);

  const [isMultipal, setisMultipal] = useState(false);
  const [monthDate, setMonthDate] = useState(new Date());
  const [MultipalType, setMultipalType] = useState(1);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [RsvpTitle, setRsvpTitle] = useState('');
  const [RsvpDescription, setRsvpDescription] = useState('');
  const {eventType} = route.params || {};
  const dispatch = useDispatch();

  const BottomSheetRef = useRef();
  const onOpen = useCallback(() => {
    BottomSheetRef.current.open();
  }, []); // Open BottomSheet
  const onClose = useCallback(() => {
    BottomSheetRef.current.close();
  }, []); // Close BottomSheet

  // Get category and location data.
  const {categoryData, locationData} = useSelector(state => state.event);
  // Global Add Event Field References
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Select Event Type
  const onSelectEvent = selectedItem => {
    setSelectEventType(selectedItem);
  };

  // Custom Switch Toggle Button
  const toggleSwitch = useCallback(
    () => setisMultipal(!isMultipal),
    [isMultipal],
  );
  useEffect(() => {
    if (!isMultipal) {
      setMonthDate(new Date());
      setMultipalType(1);
      setSelectedDay(undefined);
    }
  }, [isMultipal]);

  const addMultiEvent = useCallback(() => {
    let MultiEventRequest = {
      eventId: EventResult?.id,
      scheduleType: MultipalType,
      startDate: moment(new Date(EventResult?.startDate)).format(
        AppConstants.DateFormats.Default,
      ),
      endDate: moment(new Date(EventResult?.endDate)).format(
        AppConstants.DateFormats.Default,
      ),
      startTime: EventResult?.startTime,
      endTime: EventResult?.endTime,
      dayOfMonth: MultipalType === 3 ? new Date(monthDate).getDate() : null,
      customSchedules:
        MultipalType === 2
          ? [
              {
                day: selectedDay,
                startTime: EventResult?.startTime,
                endTime: EventResult?.endTime,
              },
            ]
          : [],
      title: RsvpTitle,
      description: RsvpDescription,
      locationId: EventResult?.locationId,
    };

    if (RsvpTitle.length === 0) {
      ToastError(Strings.EmptyRSVPTitle);
    } else if (RsvpDescription.length === 0) {
      ToastError(Strings.EmptyRSVPDesc);
    } else {
      dispatch(
        requestMultipalEvent(MultiEventRequest, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            onClose();
            navigation.navigate(NavigationRoutes.AddUser, {
              eventDetails: EventResult,
              isUpdate: false,
            });
          }
        }),
      );
    }
  }, [
    EventResult,
    MultipalType,
    RsvpDescription,
    RsvpTitle,
    dispatch,
    monthDate,
    navigation,
    onClose,
    selectedDay,
  ]);

  // Navigate To Other Screen For multi user view.
  // const onAddUser = useCallback(
  //   () => navigation.navigate(NavigationRoutes.AddUser),
  //   [navigation],
  // );
  // Navigate To Other Screen

  // const onAddUser = useCallback(() => {
  //   navigation.navigate(NavigationRoutes.AddUser, {eventName: eventName});
  // }, [eventName, navigation]);

  // const onEventProfile = useCallback(
  //   () => navigation.navigate(NavigationRoutes.AdminInfo),
  //   [navigation],
  // );

  const getNewLocationData = useCallback(newLocation => {
    setSelectLocation(newLocation);
  }, []);

  const renderWeekDaysItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.WeekDayItemView,
        {
          backgroundColor:
            item.id === selectedDay
              ? Colors.LightGreen
              : Colors.logoBackgroundColor,
        },
      ]}
      onPress={() => setSelectedDay(item.id)}>
      <Text style={styles.WeekDayeTxt}>{item.name}</Text>
    </TouchableOpacity>
  );

  const onAddEvent = useCallback(() => {
    let RequestData = {
      id: 0,
      image: '',
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
      startTime: startTime,
      endTime: endTime,
      scheduleType: 0,
      organizationId: 1,
      categoryId: selectEventType?.id,
      isMultipleEvent: eventType === 'team' ? !isMultipal : isMultipal,
    };
    //console.log(RequestData);

    //if (true) {
    if (eventName.length === 0) {
      ToastError(Strings.BlankEventError);
    } else if (!selectEventType) {
      ToastError(Strings.EventTypeError);
    } else if (!selectLocation) {
      ToastError(Strings.LocationSelectionError);
    } else if (imagePath) {
      dispatch(
        uploadMediaRequest(
          imagePath,
          AppConstants.fileDriveName.Event,
          (isUploaded, data) => {
            if (isUploaded && data[0].isSuccess) {
              dispatch(
                addEventData(
                  {...RequestData, image: data[0]?.fileUrl},
                  (isSuccess, eventData) => {
                    if (isSuccess) {
                      if (!isMultipal) {
                        navigation.navigate(NavigationRoutes.AddUser, {
                          eventDetails: eventData,
                          isUpdate: false,
                        });
                      } else {
                        setEventResult(eventData);
                        dispatch(
                          getEventData((success, d) => {
                            success && onOpen();
                          }),
                        );
                      }
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
        addEventData(RequestData, (isSuccess, data) => {
          if (isSuccess) {
            if (!isMultipal) {
              navigation.navigate(NavigationRoutes.AddUser, {
                eventDetails: data,
                isUpdate: false,
              });
            } else {
              setEventResult(data);
              dispatch(
                getEventData((success, d) => {
                  success && onOpen();
                }),
              );
            }
          }
        }),
      );
    }
    //}
  }, [
    dispatch,
    endDate,
    endTime,
    eventDescription,
    eventName,
    eventType,
    imagePath,
    isMultipal,
    navigation,
    onOpen,
    selectEventType,
    selectLocation,
    startDate,
    startTime,
  ]);

  return (
    <View style={styles.mainEventContainer}>
      <CustomNavbar
        title={eventType === 'team' ? Strings.TeamPage : 'Event Page'}
        leftIcon={Icons.backArrowIcon}
        onRightAction={() => ToastInDevelopment()}
      />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.viewContainer}>
          {imagePath ? (
            <Image
              source={{uri: imagePath.uri}}
              style={styles.CenterEventLogo}
            />
          ) : null}

          <UploadImageComponent
            callBack={setImagePath}
            isClear={imagePath ? false : true}
          />

          <View style={styles.eventSubContainer}>
            <Text style={styles.eventLabelText}>
              {eventType === 'team' ? 'Enter Team Name' : Strings.EnterTitle}
            </Text>
            <CustomTextInput
              placeholder={
                eventType === 'team' ? 'Add Team Name' : Strings.AddTitle
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
              {eventType === 'team' ? 'About Team' : Strings.EventDescription}
            </Text>
            <CustomTextInput
              placeholder={
                eventType === 'team' ? 'Add About Team' : Strings.AddDescription
              }
              returnKeyType={'Return'}
              value={eventDescription}
              onChangeText={txt => setEventDescription(txt)}
              inputStyle={styles.textInputDescriptionStyle}
              containerStyle={styles.textInputContainerDescriptionStyle}
              multiline={true}
              autoCapitalize={'sentences'}
            />
          </View>

          {eventType === 'single' && (
            <View style={styles.eventDateContainer}>
              <View style={styles.dateTimeView}>
                <Text>{Strings.EnterEventDateandTime}</Text>
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
                {!isMultipal && (
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
                )}
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
                      startDate.getFullYear() + 1,
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
          {/*
          For Future Use
          {eventType === 'team' && (
          <View style={styles.switchEventView}>
            <Text style={styles.mainViewTitleStyle}>
              {Strings.MultipleEvent}
            </Text>
            <CustomSwitch onValueChange={toggleSwitch} isEnabled={isMultipal} />
          </View>
          )} */}

          <View style={styles.eventTypeContainer}>
            <Text style={styles.eventLabelText}>
              {eventType === 'team' ? 'Sport type ' : Strings.EventType}
            </Text>
            <View>
              <CustomSelectDropDown
                data={categoryData}
                defaultButtonText={
                  eventType === 'team'
                    ? 'Select Sport '
                    : Strings.SelectEventType
                }
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
              {eventType === 'team' ? (
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
        </View>

        <CustomButton
          title={eventType === 'team' ? 'Add Team Members' : Strings.CreateNext}
          btnStyle={styles.btnContainerStyle}
          onPress={onAddEvent}
        />
      </KeyboardAwareScrollView>
      <RBSheet
        height={Metrics.screenHeight}
        ref={BottomSheetRef}
        closeOnDragDown={false}
        closeOnPressMask={false}
        closeOnPressBack={false}
        keyboardAvoidingViewEnabled>
        <SafeAreaView>
          <View style={styles.RBSheetView}>
            <Text style={styles.RBSheetHeaderText}>
              {Strings.ScheduleEvent}
            </Text>
            {isMultipal && isMultipal && (
              <View style={styles.ThreeOptionVIew}>
                <TouchableOpacity
                  onPress={() => {
                    setMultipalType(1);
                  }}
                  style={[
                    styles.ThreeOptionTOView,
                    {
                      backgroundColor:
                        MultipalType === 1
                          ? Colors.LightGreen
                          : Colors.logoBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.ThreeOptionsTxt}>{Strings.Daily}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMultipalType(2);
                  }}
                  style={[
                    styles.ThreeOptionTOView,
                    {
                      backgroundColor:
                        MultipalType === 2
                          ? Colors.LightGreen
                          : Colors.logoBackgroundColor,
                      marginHorizontal: scale(10),
                    },
                  ]}>
                  <Text style={styles.ThreeOptionsTxt}>{Strings.Weekly}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMultipalType(3);
                  }}
                  style={[
                    styles.ThreeOptionTOView,
                    {
                      backgroundColor:
                        MultipalType === 3
                          ? Colors.LightGreen
                          : Colors.logoBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.ThreeOptionsTxt}>{Strings.Monthly}</Text>
                </TouchableOpacity>
              </View>
            )}

            {isMultipal && MultipalType === 2 && (
              <View style={styles.scheduleContainer}>
                <View style={styles.eventDateLabelRow}>
                  <Text style={styles.eventLabelText}>{Strings.MonthDate}</Text>
                </View>
                <FlatGrid
                  maxItemsPerRow={4}
                  scrollEnabled={false}
                  itemDimension={20}
                  data={weekDays}
                  keyExtractor={item => item.id}
                  renderItem={renderWeekDaysItem}
                />
              </View>
            )}

            {isMultipal && MultipalType === 3 && (
              <View style={styles.scheduleContainer}>
                <View style={styles.eventDateLabelRow}>
                  <Text style={styles.eventLabelText}>{Strings.MonthDate}</Text>
                </View>
                <View style={styles.eventDateRow}>
                  <Text style={styles.mainViewTimeWithDescription}>
                    {moment(monthDate).format(AppConstants.DateFormats.Default)}
                  </Text>
                  <CustomDatePicker
                    Mode="date"
                    minDate={startDate}
                    maxDate={endDate}
                    selectedDate={monthDate}
                    setDate={date => {
                      setMonthDate(date);
                    }}
                  />
                </View>
              </View>
            )}

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

            <CustomButton
              title={Strings.Next}
              onPress={addMultiEvent}
              btnStyle={{marginTop: verticalScale(20)}}
            />
          </View>
        </SafeAreaView>
      </RBSheet>
    </View>
  );
};

export default AddEventScreen;
