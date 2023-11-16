// THIRD PARTY IMPORTS
import {Formik} from 'formik';
import React, {
  Fragment,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Image, Linking, Pressable, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import ApiConstants from '../../constants/ApiConstants';

// LOCAL IMPORTS
import {Icons, Images} from '../../assets';
import {CustomNavbar, CustomTextInput, FastImageView} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';

import {getUserByIdData} from '../../store/actions/profileActions';
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

const userDataRef = createRef();

const UserInfo = ({navigation, route}) => {
  const {USERid} = route.params || {};
  const [UserDetails, setUserDetails] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserByIdData(USERid, result => {
        result && setUserDetails(result);
        userDataRef.current.setFieldValue(
          'firstName',
          result.firstName ? result?.firstName : '',
        );
        userDataRef.current.setFieldValue(
          'lastName',
          result.lastName ? result?.lastName : '',
        );
        userDataRef.current.setFieldValue(
          'email',
          result.email ? result?.email : '',
        );
        userDataRef.current.setFieldValue(
          'phoneNumber',
          result.phoneNumber ? result?.phoneNumber : '',
        );
        userDataRef.current.setFieldValue('bio', result.bio ? result?.bio : '');
        userDataRef.current.setFieldValue(
          'websiteLink',
          result.websiteLink ? result?.websiteLink : '',
        );
      }),
    );
  }, [USERid, dispatch]);

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

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        // rightIcon={!isEdit && [Icons.editIcon, Icons.settingIcn]}
        // onRightAction={handleEditIcon}
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
                  UserDetails?.profileUrl
                    ? `${ApiConstants.ImageBaseUrl}/${UserDetails?.profileUrl}`
                    : ''
                }
                style={styles.profileImage}
                defaultSource={Images.profileImage}
              />
            </View>
            {console.log('UserDetails.firstName -> ', UserDetails)}
          </View>
          <Formik
            innerRef={userDataRef}
            initialValues={{
              firstName: UserDetails ? UserDetails.firstName : '',
              lastName: UserDetails ? UserDetails.lastName : '',
              email: UserDetails ? UserDetails.email : '',
              phoneNumber: UserDetails ? UserDetails.phoneNumber : '',
              bio: UserDetails ? UserDetails.bio : '',
              websiteLink: UserDetails ? UserDetails?.socialMediaLink : [],
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.profileMainContainer}>
                <View style={styles.profileDetailContainer}>
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
                    editable={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => inputRef.lastName.current.focus()}
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
                    editable={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => inputRef.phoneNumber.current.focus()}
                  />
                  {!UserDetails?.isHideContactDetails && (
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
                  )}
                  {!UserDetails?.isHideContactDetails && (
                    <View style={styles.countryPickerMainContainer}>
                      <View style={styles.phoneImageContainer}>
                        <Image
                          source={Icons.phoneIcon}
                          style={styles.phoneIconStyle}
                        />
                      </View>
                      <View>
                        <View style={styles.countryCodeMainContainer}>
                          <Text style={styles.countryPickerTextStyle}>
                            {UserDetails?.countryCode}
                          </Text>
                        </View>
                      </View>
                      <CustomTextInput
                        ref={inputRef.phoneNumber}
                        placeholder={Strings.PhoneNumber}
                        inputStyle={styles.inputStyle}
                        onChangeText={handleChange('phoneNumber')}
                        value={values.phoneNumber}
                        onBlur={handleBlur('phoneNumber')}
                        containerStyle={styles.phoneNumTextInputContainer}
                        editable={false}
                        maxLength={10}
                        keyboardType={'numeric'}
                      />
                    </View>
                  )}

                  {!UserDetails?.isHideContactDetails && (
                    <View style={styles.bioContainer}>
                      <Image
                        source={Icons.DocIcn}
                        style={styles.docIconStyle}
                      />
                      <TextInput
                        style={styles.bioTextInputContainer}
                        placeholder={Strings.BioPlaceholder}
                        placeholderTextColor={Colors.PlaceholderLight}
                        onChangeText={handleChange('bio')}
                        multiline
                        value={values.bio}
                        editable={false}
                        scrollEnabled={false}
                        inputMode="text"
                        keyboardType="default"
                        textAlignVertical="top"
                        returnKeyType={'next'}
                        onSubmitEditing={() =>
                          inputRef.websiteLink.current.focus()
                        }
                      />
                    </View>
                  )}
                  {!UserDetails?.isHideContactDetails && (
                    <View style={styles.addSocialMediaContainer}>
                      <Image
                        source={Icons.attachIcon}
                        style={styles.docIconStyle}
                      />
                      <View>
                        <View>
                          {UserDetails?.socialMediaLink?.map((webLink, i) => {
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
                              </Pressable>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  )}
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
export default UserInfo;
