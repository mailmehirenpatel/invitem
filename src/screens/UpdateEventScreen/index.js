// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View, Modal, Pressable} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons, Images} from '../../assets';
import {
  CircleFilledIcon,
  CustomButton,
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

  const [imagePath, setImagePath] = useState();
  const [selectEventType, setSelectEventType] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isPick, setIsPick] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const {categoryData, locationData} = useSelector(state => state.event);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setImagePath(eventObjectData?.image.toString()); // set image path functionality
      setSelectEventType(
        categoryData?.find(i => i.id === eventObjectData.categoryId), // find category Type through category id
      );
      setEventName(eventObjectData?.eventName);
      setEventDescription(eventObjectData?.description);
    });
    return unsubscribe;
  }, [
    categoryData,
    eventObjectData.categoryId,
    eventObjectData?.description,
    eventObjectData.endDate,
    eventObjectData.eventDateSchedule,
    eventObjectData?.eventName,
    eventObjectData?.image,
    eventObjectData.locationId,
    eventObjectData.startDate,
    locationData,
    navigation,
  ]);

  const handleFocus = () => {
    setDialogVisible(true);
  };
  const handleDialogClose = () => {
    setDialogVisible(false);
  };
  const handleDialogSubmit = () => {
    setDialogVisible(false);
  };

  // Select Event Type
  const onSelectEvent = selectedItem => {
    setSelectEventType(selectedItem);
  };

  // Camera Icon Click Show and Hide Image Picker Functionality
  const onCameraAction = useCallback(() => {
    setIsPick(true);
  }, []);

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
      locationId: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      categoryId: selectEventType?.id,
      isMultipleEvent: eventObjectData?.isMultipleEvent,
    };

    if (eventName.length === 0) {
      ToastError(Strings.BlankEventError);
    } else if (!selectEventType) {
      ToastError(Strings.EventTypeError);
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
    eventDescription,
    eventName,
    eventObjectData,
    imagePath,
    navigation,
    selectEventType,
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
            <Pressable onPress={handleFocus}>
              <Text style={styles.addDescription}>
                {eventDescription.length === 0
                  ? Strings.AddDescription
                  : eventDescription}
              </Text>
            </Pressable>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isDialogVisible}
              onRequestClose={handleDialogClose}>
              <View style={styles.modelMainView}>
                <View style={styles.modelMainSubView}>
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
                  <CustomButton
                    title={Strings.AddDescription}
                    btnStyle={styles.addDescriptionBtn}
                    onPress={handleDialogSubmit}
                  />
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.eventGuestContainer}>
            <Text style={styles.eventLabelText}>{Strings.AddContacts}</Text>
            <MultiUserView
              listUsers={eventObjectData?.eventParticipants}
              btnText={Strings.Contacts}
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
