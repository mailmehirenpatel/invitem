// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CustomButton, CustomNavbar, CustomTextInput} from '../../components';
import CustomSelectDropDown from '../../components/CustomSelectDropDown';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastInDevelopment} from '../../constants/ToastConstants';
import {addEventData} from '../../store/actions/EventAction';
import {uploadMediaRequest} from '../../store/actions/profileActions';
import styles from '../AddEventScreen/styles';
import UploadImageComponent from './Component/UploadImage';

const AddEventScreen = ({navigation, route}) => {
  const [imagePath, setImagePath] = useState();

  const [selectEventType, setSelectEventType] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const {eventType} = route.params || {};
  const dispatch = useDispatch();

  const {categoryData} = useSelector(state => state.event);

  // const onSelectEvent = selectedItem => {
  //   setSelectEventType(selectedItem);
  // };

  const onAddEvent = useCallback(() => {
    let RequestData = {
      id: 0,
      image: '',
      eventName: eventName,
      description: eventDescription,
      locationId: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      scheduleType: 0,
      organizationId: null,
      categoryId: selectEventType?.id,
      isMultipleEvent: eventType === 'team' ? true : false,
      eventCode: null,
    };

    if (eventName.length === 0) {
      ToastError(Strings.BlankEventError);
    } else if (!selectEventType) {
      ToastError(Strings.EventTypeError);
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
                      navigation.navigate(NavigationRoutes.AddUser, {
                        eventDetails: eventData,
                        isUpdate: false,
                      });
                    } else {
                      // display alert message - warning
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
            navigation.navigate(NavigationRoutes.AddUser, {
              eventDetails: data,
              isUpdate: false,
            });
          } else {
            // display alert message - warning
          }
        }),
      );
    }
  }, [
    dispatch,
    eventDescription,
    eventName,
    eventType,
    imagePath,
    navigation,
    selectEventType,
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
              returnKeyType={'done'}
              value={eventDescription}
              onChangeText={txt => setEventDescription(txt)}
              inputStyle={styles.textInputDescriptionStyle}
              containerStyle={styles.textInputContainerDescriptionStyle}
              multiline={true}
              autoCapitalize={'sentences'}
            />
          </View>

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
        </View>

        <CustomButton
          title={eventType === 'team' ? 'Add Team Members' : Strings.AddGuest}
          btnStyle={styles.btnContainerStyle}
          onPress={onAddEvent}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddEventScreen;
