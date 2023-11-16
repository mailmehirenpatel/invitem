// THIRD PARTY IMPORTS
import {Formik} from 'formik';
import React, {Fragment, createRef, useCallback, useState} from 'react';
import {
  Image,
  Linking,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import ApiConstants from '../../constants/ApiConstants';

// LOCAL IMPORTS
import {Icons, Images} from '../../assets';
import {
  CircleFilledIcon,
  CustomButton,
  CustomImagePicker,
  CustomNavbar,
  CustomSwitch,
  CustomTextInput,
  FastImageView,
} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Metrics} from '../../config/metrics';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError} from '../../constants/ToastConstants';
import validationSchema, {
  WEBSITELINK_REGEX,
} from '../../services/validationServices';
import {
  getUserProfileData,
  putUserProfileData,
  uploadMediaRequest,
} from '../../store/actions/profileActions';
import Colors from '../../theme/Colors';
import styles from './styles';

// Global Profile Screen Field References
const inputRef = {
  firstName: createRef(),
  lastName: createRef(),
  email: createRef(),
  phoneNumber: createRef(),
  bio: createRef(),
  websiteLink: createRef(),
};

const ProfileScreen = ({navigation}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isPick, setIsPick] = useState(false);
  const [selectedFile, setFile] = useState(undefined);
  const [linkOption, setLinkOption] = useState();
  const userId = useSelector(state => state.auth.userId);
  const {profileData} = useSelector(state => state.profile);
  const [linksList, setLinksList] = useState(
    profileData?.socialMediaLink || [],
  );
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState(
    profileData ? profileData?.countryCode : '',
  );
  const [selectedItems, setSelectedItems] = useState(
    profileData ? profileData?.isHideContactDetails : false,
  );
  const dispatch = useDispatch();
  const onPressAddSocialMedia = useCallback(() => {
    if (linkOption && !WEBSITELINK_REGEX.exec(linkOption)) {
      ToastError(Strings.invalidWebsiteLink);
    } else if (linkOption?.length) {
      setLinksList(prev => [...prev, linkOption]);
      setLinkOption('');
    }
  }, [linkOption]);

  const toggleSwitch = useCallback(() => setSelectedItems(prev => !prev), []); // privateMode functionality

  // Edit Icon Functionality
  const handleEditIcon = useCallback(
    index => () => {
      index === 0
        ? setIsEdit(!isEdit)
        : navigation.navigate(NavigationRoutes.ProfileSetting);
    },
    [isEdit, navigation],
  );

  //For redirect in webview.
  const redirectToWeb = useCallback(
    url => () => {
      return new Promise((resolve, reject) => {
        Linking.openURL(`https://${url}`)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    [],
  );

  // Camera Icon Click Show and Hide Image Picker Functionality
  const onCameraAction = useCallback(() => {
    setIsPick(true);
  }, []);
  const updateUser = useCallback(
    props => {
      const {profileUrl, params} = props;
      const userData = {
        firstName: params.firstName,
        lastName: params.lastName,
        countryCode: countryCode,
        phoneNumber: params.phoneNumber,
        email: params.email,
        profileUrl: profileUrl,
        bio: params.bio,
        socialMediaLink: linksList,
        isHideContactDetails: selectedItems,
      };
      dispatch(
        putUserProfileData(userData, (isSuccess, message) => {
          if (isSuccess) {
            setIsEdit(false);
            Toast.show(message, Toast.SHORT, {
              backgroundColor: Colors.logoBackgroundColor,
              textColor: Colors.White,
            });
            setLinkOption('');
            dispatch(getUserProfileData());
          } else {
            Toast.show(message, Toast.SHORT, {
              backgroundColor: Colors.logoBackgroundColor,
              textColor: Colors.White,
            });
          }
        }),
      );
    },
    [countryCode, dispatch, linksList, selectedItems],
  );

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        rightIcon={!isEdit && [Icons.editIcon, Icons.settingIcn]}
        onRightAction={handleEditIcon}
      />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <Fragment>
          <View style={styles.profileContainer}>
            <View>
              <FastImageView
                uri={
                  selectedFile
                    ? selectedFile.uri
                    : profileData?.profileUrl
                    ? `${ApiConstants.ImageBaseUrl}/${profileData?.profileUrl}`
                    : ''
                }
                style={styles.profileImage}
                defaultSource={Images.profileImage}
              />
              {isEdit ? (
                <CircleFilledIcon
                  icon={Icons.cameraIcon}
                  containerStyle={styles.cameraIconContainer}
                  iconStyle={styles.cameraIcon}
                  onPress={onCameraAction}
                />
              ) : null}
              <CustomImagePicker
                isPickerVisible={isPick}
                setPickerVisible={setIsPick}
                setImageSource={setFile}
              />
            </View>
            <Text style={styles.profileNameText}>
              {profileData?.firstName} {profileData?.lastName}
            </Text>
          </View>
          <Formik
            initialValues={{
              firstName: profileData ? profileData.firstName : '',
              lastName: profileData ? profileData.lastName : '',
              email: profileData ? profileData.email : '',
              phoneNumber: profileData ? profileData.phoneNumber : '',
              bio: profileData ? profileData.bio : '',
              websiteLink: profileData ? profileData?.socialMediaLink : [],
            }}
            validationSchema={validationSchema.ProfileData}
            onSubmit={params => {
              if (selectedFile) {
                dispatch(
                  uploadMediaRequest(
                    selectedFile,
                    AppConstants.fileDriveName.Profile,
                    (isUploaded, data) => {
                      if (isUploaded && data[0]?.isSuccess) {
                        updateUser({profileUrl: data[0]?.fileUrl, params});
                      }
                    },
                  ),
                );
              } else {
                updateUser({profileUrl: profileData?.profileUrl, params});
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.profileMainContainer}>
                <View style={styles.profileDetailContainer}>
                  <View style={styles.privateModeContainer}>
                    <Text style={styles.guestEventProfileText}>
                      {Strings.PrivateMode}
                    </Text>
                    <CustomSwitch
                      disabled={isEdit ? false : true}
                      onValueChange={toggleSwitch}
                      isEnabled={selectedItems}
                    />
                  </View>

                  <CustomTextInput
                    ref={inputRef.firstName}
                    placeholder={Strings.firstNamePlaceholder}
                    leftIcon={Icons.username}
                    onChangeText={handleChange('firstName')}
                    leftIconStyle={styles.leftIconStyle}
                    value={values.firstName}
                    onBlur={handleBlur('firstName')}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.textInputContainer}
                    editable={isEdit}
                    returnKeyType={'next'}
                    onSubmitEditing={() => inputRef.lastName.current.focus()}
                    error={touched.firstName && errors.firstName}
                    autoCapitalize={'words'}
                  />
                  <CustomTextInput
                    ref={inputRef.lastName}
                    placeholder={Strings.lastNamePlaceholder}
                    leftIcon={Icons.username}
                    onChangeText={handleChange('lastName')}
                    leftIconStyle={styles.leftIconStyle}
                    value={values.lastName}
                    onBlur={handleBlur('lastName')}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.textInputContainer}
                    editable={isEdit}
                    autoCapitalize={'words'}
                    returnKeyType={'next'}
                    error={touched.lastName && errors.lastName}
                    onSubmitEditing={() => inputRef.phoneNumber.current.focus()}
                  />
                  {profileData?.isHideContactDetails &&
                  profileData?.id === userId ? (
                    <CustomTextInput
                      ref={inputRef.email}
                      placeholder={Strings.Email}
                      containerStyle={styles.textInputContainer}
                      leftIconStyle={styles.leftIconStyle}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      onBlur={handleBlur('email')}
                      leftIcon={Icons.email}
                      inputStyle={styles.inputStyle}
                      editable={false}
                      returnKeyType={'next'}
                      onSubmitEditing={() =>
                        inputRef.phoneNumber.current.focus()
                      }
                    />
                  ) : (
                    ''
                  )}
                  <View style={styles.countryPickerMainContainer}>
                    <View style={styles.phoneContainer}>
                      <View style={styles.phoneImageContainer}>
                        <Image
                          source={Icons.phoneIcon}
                          style={styles.phoneIconStyle}
                        />
                      </View>
                      <View>
                        <Pressable
                          onPress={() => (isEdit ? setShow(true) : null)}
                          style={styles.countryCodeMainContainer}>
                          <Text style={styles.countryPickerTextStyle}>
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
                    </View>
                    <View>
                      <CustomTextInput
                        ref={inputRef.phoneNumber}
                        placeholder={Strings.PhoneNumber}
                        inputStyle={styles.inputStyle}
                        onChangeText={handleChange('phoneNumber')}
                        value={values.phoneNumber}
                        onBlur={handleBlur('phoneNumber')}
                        containerStyle={styles.phoneNumTextInputContainer}
                        editable={isEdit}
                        maxLength={10}
                        keyboardType={'numeric'}
                        error={touched.phoneNumber && errors.phoneNumber}
                        errorTextStyle={styles.phoneNoErrorStyle}
                      />
                    </View>
                  </View>
                  {values?.bio?.length > 0 || isEdit ? (
                    <View style={styles.bioContainer}>
                      <Image
                        source={Icons.profileDocIcn}
                        style={styles.docIconStyle}
                      />
                      <TextInput
                        style={styles.bioTextInputContainer}
                        placeholder={Strings.BioPlaceholder}
                        placeholderTextColor={Colors.PlaceholderLight}
                        onChangeText={handleChange('bio')}
                        multiline
                        value={values.bio.trimStart()}
                        editable={isEdit}
                        scrollEnabled={false}
                        inputMode="text"
                        keyboardType="default"
                        textAlignVertical="top"
                        autoCapitalize={'sentences'}
                        returnKeyType={'next'}
                        onSubmitEditing={() =>
                          inputRef.websiteLink.current.focus()
                        }
                      />
                    </View>
                  ) : (
                    ''
                  )}

                  {isEdit || profileData?.socialMediaLink?.length > 0 ? (
                    <View style={styles.addSocialMediaContainer}>
                      <Image
                        source={Icons.attachIcon}
                        style={styles.attachIconStyle}
                      />
                      <View>
                        <View>
                          {linksList?.map((webLink, i) => {
                            return (
                              <Pressable
                                key={i}
                                style={styles.redirectToWebView}>
                                <View style={styles.webLinkTextContainer}>
                                  <Text
                                    style={styles.optionText}
                                    onPress={redirectToWeb(webLink)}>
                                    {webLink}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    let tempLinkListArray = linksList.filter(
                                      i => i !== webLink,
                                    );
                                    setLinksList(tempLinkListArray);
                                  }}>
                                  {isEdit && (
                                    <Image
                                      source={Icons.deleteIcon}
                                      style={styles.deleteIconStyle}
                                    />
                                  )}
                                </TouchableOpacity>
                              </Pressable>
                            );
                          })}
                        </View>
                        {!isEdit ? (
                          <View>
                            {linksList.length === 0 ? (
                              <Text
                                style={
                                  !isEdit
                                    ? styles.defaultSocialMediaTextStyle
                                    : styles.socialMediaTextStyle
                                }>
                                {Strings.AddSocialMedia}
                              </Text>
                            ) : null}
                          </View>
                        ) : (
                          <View>
                            <CustomTextInput
                              style={
                                !isEdit
                                  ? styles.defaultSocialMediaTextStyle
                                  : styles.socialTextInputContainer
                              }
                              ref={inputRef.websiteLink}
                              placeholder={Strings.AddSocialMedia}
                              value={linkOption}
                              onChangeText={val => {
                                linkOption?.length === 0
                                  ? setLinkOption(`https://${val}`)
                                  : setLinkOption(val);
                              }}
                              containerStyle={styles.socialLinkTextInput}
                              editable={isEdit}
                              returnKeyType={'done'}
                              onSubmitEditing={handleSubmit}
                            />
                            <CustomButton
                              title={`+ ${Strings.AddSocialMediaOrWebsite}`}
                              textStyle={styles.btnTextStyle}
                              btnStyle={styles.addSocialMediaBtn}
                              onPress={onPressAddSocialMedia}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  ) : (
                    ''
                  )}

                  {isEdit ? (
                    <>
                      <CustomButton
                        title={Strings.update}
                        onPress={handleSubmit}
                      />
                    </>
                  ) : null}
                </View>
              </View>
            )}
          </Formik>
        </Fragment>
      </KeyboardAwareScrollView>
      <GoogleAdsComponent />
    </View>
  );
};
export default ProfileScreen;
