// 3rd Party Imports
import {Formik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icons} from '../../assets';
import {
  CircleFilledIcon,
  CustomNavbar,
  CustomProfileImage,
  SearchTextInput,
} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import {Metrics} from '../../config/metrics';
import {Strings} from '../../config/strings';
import mockImages from '../../constants/MockImages/images';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import validationSchema from '../../services/validationServices';
import {
  getEventObjectData,
  getRegisterUser,
  requestEventParticipants,
  requestInviteUser,
} from '../../store/actions/EventAction';
import Colors from '../../theme/Colors';
import styles from '../AddUser/styles';
// import CustomTextInput from '../../components/CustomTextInput/customTextInput';

// Render Header Component
const RenderHeaderComponent = (onOpen, searchText, onSearch) => (
  <View>
    <SearchTextInput
      iconStyle={styles.searchIcon}
      containerStyle={styles.searchContainerStyle}
      textInputStyle={styles.textInput}
      placeholder={Strings.SearchUser}
      placeholderTextColor={Colors.Gray}
      value={searchText}
      onChangeText={onSearch}
    />
    <Pressable style={styles.headerMainComponent} onPress={onOpen}>
      <View style={styles.addGuestImageContainer}>
        <Image source={Icons.addGuest} style={styles.addGuestImage} />
      </View>
      <Text style={styles.addGuestText}>{Strings.AddGuest}</Text>
    </Pressable>
  </View>
);

// BottomSheet eventSetting Header
const EventSettingHeader = ({onClose, requestInviteUserData}) => (
  <View style={styles.settingHeaderView}>
    <Pressable onPress={onClose}>
      <Image source={Icons.backArrowIcon} style={styles.backIcon} />
    </Pressable>
    <Text style={styles.headerText}>{Strings.AddGuest}</Text>
    <Text style={styles.addText} onPress={requestInviteUserData}>
      {Strings.Add}
    </Text>
  </View>
);

const EmptyListMessage = () => {
  return (
    <View style={styles.noUserFoundView}>
      <Text style={styles.noUserFoundTxt}>{Strings.NoUserFound}</Text>
    </View>
  );
};

const AddUser = ({navigation, route}) => {
  // Global Add User Field References
  const BottomSheetRef = useRef();
  const inputRef = {
    guest: createRef(),
    email: createRef(),
    phoneNumber: createRef(),
  };

  const dispatch = useDispatch();
  const {isUpdate, eventDetails} = route.params || {}; // Value get redux Through Navigation Params
  const {eventObjectData} = useSelector(state => state.event);
  const [countryCode, setCountryCode] = useState('+44'); // Country Code Selection
  const [show, setShow] = useState(false);
  const [UserList, setUserList] = useState();
  const [MainUserList, setMainUserList] = useState([]);
  const [SelectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const onOpen = useCallback(() => BottomSheetRef.current.open(), []); // Open BottomSheet
  const onClose = useCallback(() => BottomSheetRef.current.close(), []); // Close BottomSheet

  // Search User List
  const onSearch = useCallback(
    value => {
      setSearchText(value);
      if (MainUserList?.length > 0) {
        const filterUsers = MainUserList?.filter(e =>
          e.name.toLowerCase().includes(value.toLowerCase()),
        );
        setUserList(filterUsers);
      }
      if (value?.length === 0) {
        setUserList(MainUserList);
      }
    },
    [MainUserList],
  );

  // Api call for event participants
  const onSave = useCallback(() => {
    let data = {
      eventId: eventDetails ? eventDetails.id : eventObjectData.id,
      participantIds: SelectedUsers,
    };
    try {
      dispatch(
        requestEventParticipants(data, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            dispatch(
              getEventObjectData(
                eventDetails ? eventDetails.id : eventObjectData.id,
              ),
            );
            isUpdate
              ? navigation.goBack()
              : navigation.navigate(NavigationRoutes.AdminInfo, {
                  isUpdate: false,
                }); // Navigate to other screen
          } else {
            ToastError(message);
          }
        }),
      );
    } catch (error) {
      ToastError(Strings.EventParticipantError);
    }
  }, [
    SelectedUsers,
    dispatch,
    eventDetails,
    eventObjectData.id,
    isUpdate,
    navigation,
  ]); // Selected Id Store Functionality

  // Api call for get registered user
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(
        getRegisterUser(
          eventDetails ? eventDetails.id : eventObjectData.id,
          registerUserData => {
            if (registerUserData?.length !== 0) {
              setUserList(registerUserData); // set Userlist functionality
              setMainUserList(registerUserData);
              setSelectedUsers(
                registerUserData
                  .filter(i => i.isSelected === true) // Filter functionality through isSelected flag
                  .map(j => j.id),
              );
            }
          },
        ),
      );
    });
    return () => {
      setUserList([]);
      unsubscribe();
    };
  }, [dispatch, eventDetails, eventObjectData.id, navigation]);

  // Invite user api calling
  const requestInviteUserData = useCallback(
    ({guest, phoneNumber, email}) => {
      const data = {
        eventId: eventObjectData.id,
        eventName: eventObjectData.eventName,
        name: guest,
        email: email,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
      };
      try {
        dispatch(
          requestInviteUser(data, (isSuccess, message) => {
            if (isSuccess) {
              ToastSuccess(message); // Show Success Message
              onClose();
            } else {
              ToastError(message); // Show Error Message
              onClose();
            }
          }),
        );
      } catch (err) {
        ToastError(Strings.InviteUserError);
      }
    },

    [
      countryCode,
      dispatch,
      eventObjectData.eventName,
      eventObjectData.id,
      onClose,
    ],
  );

  return (
    <View style={styles.mainEventContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={
          eventObjectData?.isMultipleEvent
            ? Strings.AddMember
            : Strings.AddGuest
        }
        rightText={isUpdate ? Strings.Add : Strings.Next}
        onRightAction={onSave}
      />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.KeyboardAwareScroll}>
        <View>
          <FlatList
            data={UserList}
            ListEmptyComponent={EmptyListMessage}
            renderItem={({item}) => (
              <View style={styles.renderUserListView}>
                <Pressable
                  style={styles.scrollViewStyle}
                  disabled={item?.isAdmin ? true : false}
                  onPress={() => {
                    let newUserList = UserList.map(i =>
                      i.id === item.id
                        ? i.isSelected === true
                          ? {...i, isSelected: false}
                          : {...i, isSelected: true}
                        : {...i},
                    );
                    setUserList(newUserList);
                    setSelectedUsers(
                      newUserList
                        .filter(i => i.isSelected === true)
                        .map(j => j.id),
                    );
                  }}>
                  <View style={styles.addUserContainer}>
                    <CustomProfileImage
                      image={item.profileUrl}
                      imageStyle={styles.userProfileImage}
                    />
                    <Text style={styles.addUserName}>{item.name}</Text>
                  </View>
                  <Pressable>
                    {item.isSelected && item.isAdmin ? (
                      <View style={styles.guestTextContainer}>
                        <Text style={styles.guestText}>{Strings.Admin}</Text>
                      </View>
                    ) : (
                      item.isSelected && (
                        <CircleFilledIcon
                          icon={mockImages.selectIcon}
                          iconStyle={styles.SelectedIconStyle}
                          containerStyle={styles.selectedIconContainer}
                        />
                      )
                    )}
                  </Pressable>
                </Pressable>
              </View>
            )}
            ListHeaderComponent={RenderHeaderComponent(
              onOpen,
              searchText,
              onSearch,
            )}
            scrollEnabled={false}
            keyExtractor={item => item?.id.toString()}
          />
        </View>

        <RBSheet
          ref={BottomSheetRef}
          closeOnDragDown={true}
          closeOnPressMask
          customStyles={styles.customStyles}>
          <SafeAreaView>
            <Formik
              initialValues={{
                guest: '',
                email: '',
                phoneNumber: '',
              }}
              validationSchema={validationSchema.addUserData}
              onSubmit={requestInviteUserData}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <View style={styles.bottomSheetMainContainer}>
                  <EventSettingHeader
                    {...{onClose}}
                    requestInviteUserData={handleSubmit}
                  />
                  <CustomLabelTextInput
                    label={Strings.AddGuestPlaceholder}
                    inputStyle={styles.labelInputStyle}
                    containerStyle={{}}
                    leftIcon={Icons.username}
                    ref={inputRef.guest}
                    onChangeText={handleChange('guest')}
                    value={values.guest}
                    returnKeyType={'next'}
                    onBlur={handleBlur('guest')}
                    error={touched.guest && errors.guest}
                    errorTextStyle={styles.errorTextStyle}
                    autoCapitalize={'words'}
                    onSubmitEditing={() => inputRef.email.current.focus()}
                  />
                  <CustomLabelTextInput
                    label={Strings.Email}
                    inputStyle={styles.labelInputStyle}
                    containerStyle={{}}
                    leftIcon={require('../../assets/icons/email.png')}
                    ref={inputRef.email}
                    onChangeText={handleChange('email')}
                    keyboardType={'email-address'}
                    value={values.email}
                    returnKeyType={'next'}
                    onBlur={handleBlur('email')}
                    errorTextStyle={styles.errorTextStyle}
                    error={touched.email && errors.email}
                    onSubmitEditing={() => inputRef.phoneNumber.current.focus()}
                  />

                  <View style={styles.BottomSheetTextInput}>
                    <View style={styles.countryCodeMainContainer}>
                      <View style={styles.countryCodeContainerView}>
                        <Pressable
                          onPress={() => setShow(true)}
                          style={styles.countryCodeContainer}>
                          <Text style={styles.countryCodeText}>
                            {countryCode}
                          </Text>
                          <Image
                            source={Icons.showDropdownIcon}
                            style={styles.countryDropDownIcon}
                          />
                        </Pressable>

                        <CountryPicker
                          show={show}
                          pickerButtonOnPress={item => {
                            setCountryCode(item.dial_code);
                            setShow(false);
                          }}
                          style={{
                            modal: {
                              height: Metrics.screenHeight * 0.5,
                            },
                          }}
                          onBackdropPress={() => setShow(false)}
                        />
                      </View>
                      <View style={styles.countryCodeWithPhoneContainer}>
                        <View>
                          <CustomLabelTextInput
                            label={Strings.PhoneNumber}
                            inputStyle={styles.labelInputStyle}
                            leftIcon={Icons.phoneIcon}
                            ref={inputRef.phoneNumber}
                            containerStyle={styles.textInputPhoneStyle}
                            onChangeText={handleChange('phoneNumber')}
                            value={values.phoneNumber}
                            maxLength={10}
                            returnKeyType={'next'}
                            onBlur={handleBlur('phoneNumber')}
                            keyboardType={'numeric'}
                            error={touched.phoneNumber && errors.phoneNumber}
                            onSubmitEditing={() =>
                              inputRef.email.current.focus()
                            }
                          />
                        </View>
                      </View>

                      <View style={styles.PhoneRightContainer}>
                        <Image
                          source={Icons.guestNotesIcon}
                          style={styles.guestNotesIcon}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </SafeAreaView>
        </RBSheet>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddUser;
