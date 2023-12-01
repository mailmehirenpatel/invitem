//3rd party imports
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import React, {createRef, useCallback, useState} from 'react';
import {Alert, Image, Linking, Pressable, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

//Local imports
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icons} from '../../assets';
import {ScreenContainer} from '../../components';
import CustomButton from '../../components/CustomButton';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import ErrorPopup from '../../components/ErrorPopup';
import {Metrics} from '../../config/metrics';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastSuccess} from '../../constants/ToastConstants';
import config from '../../constants/config';
import validationSchema from '../../services/validationServices';
import {
  requestSignUp,
  requestVerifyEmail,
} from '../../store/actions/AuthAction';
import Colors from '../../theme/Colors';
import styles from './styles';

// Global Signup Field References
const inputRef = {
  firstName: createRef(),
  lastName: createRef(),
  phoneNumber: createRef(),
  email: createRef(),
  password: createRef(),
  confirmPassword: createRef(),
};

const SignUp = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [show, setShow] = useState(false);
  const [isSecurePwd, setSecurePwd] = useState(true);
  const [isSecureCPwd, setSecureCPwd] = useState(true);
  const [countryCode, setCountryCode] = useState('+44');
  const [isError, setIsError] = useState(false);
  const [resError, setErrorMessage] = useState(null);
  // Error Popup Hide Functionality
  const handleError = useCallback(() => {
    setIsError(false);
  }, [setIsError]);
  const dispatch = useDispatch();

  const onTermsCondition = useCallback(() => {
    Linking.openURL(config.Terms_Condition_URL);
  }, []);

  const onPrivacyPolicy = useCallback(() => {
    Linking.openURL(config.Privacy_Policy_URL);
  }, []);

  // User SignUp API
  const userSignUp = useCallback(
    ({firstName, lastName, phoneNumber, email, password, confirmPassword}) => {
      if (toggleCheckBox) {
        const data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
          password: password,
          confirmPassword: confirmPassword,
        };
        try {
          dispatch(
            requestSignUp(data, (isSuccess, message) => {
              if (isSuccess) {
                ToastSuccess(message);
                dispatch(
                  requestVerifyEmail(email, isVerify => {
                    if (isVerify) {
                      ToastSuccess(Strings.VerifyEmail);
                      Alert.alert(
                        Strings.signUpNewAccountMessage1,
                        Strings.signUpNewAccountMessage2,
                        [
                          {
                            text: Strings.Ok,
                            onPress: () => {
                              //console.log('No Pressed');
                              navigation.navigate(NavigationRoutes.Login);
                            },
                            style: Strings.Ok,
                          },
                        ],
                        {cancelable: false},
                      );
                    }
                  }),
                );
              } else {
                setIsError(true);
                setErrorMessage(message);
              }
            }),
          );
        } catch (err) {
          console.log('err -> ', err);
        }
      } else {
        Toast.show(Strings.EmptyTermsAndCondition, Toast.LONG, {
          backgroundColor: Colors.logoBackgroundColor,
          textColor: Colors.White,
        });
      }
    },
    [countryCode, dispatch, navigation, toggleCheckBox],
  );
  // Navigate To Other Screen
  const onSignin = useCallback(() => {
    navigation.navigate(NavigationRoutes.Login);
  }, [navigation]);

  // Password Secure Functionality
  const onSecurePwd = useCallback(() => setSecurePwd(prev => !prev), []);
  const onSecureCPwd = useCallback(() => setSecureCPwd(prev => !prev), []);
  return (
    <ScreenContainer
      renderContent={() => (
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          contentContainerStyle={styles.KeyboardAwareScroll}>
          <View>
            <View style={styles.SubContainer}>
              <Text style={styles.mainHeading}>{Strings.SignUpTitle}</Text>
              <View>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={validationSchema.signUp}
                  onSubmit={userSignUp}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                  }) => (
                    <View>
                      <CustomLabelTextInput
                        label={Strings.firstNamePlaceholder}
                        inputStyle={styles.labelInputStyle}
                        containerStyle={{}}
                        leftIcon={Icons.username}
                        ref={inputRef.firstName}
                        keyboardType={'default'}
                        onChangeText={handleChange('firstName')}
                        value={values.firstName.trim()}
                        returnKeyType={'next'}
                        onBlur={handleBlur('firstName')}
                        error={touched.firstName && errors.firstName}
                        onSubmitEditing={() =>
                          inputRef.lastName.current.focus()
                        }
                      />
                      <CustomLabelTextInput
                        label={Strings.lastNamePlaceholder}
                        inputStyle={styles.labelInputStyle}
                        containerStyle={{}}
                        leftIcon={Icons.username}
                        ref={inputRef.lastName}
                        keyboardType={'default'}
                        onChangeText={handleChange('lastName')}
                        value={values.lastName.trim()}
                        returnKeyType={'next'}
                        onBlur={handleBlur('lastName')}
                        error={touched.lastName && errors.lastName}
                        onSubmitEditing={() =>
                          inputRef.phoneNumber.current.focus()
                        }
                      />

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
                              value={values.phoneNumber.trim()}
                              maxLength={10}
                              returnKeyType={'next'}
                              onBlur={handleBlur('phoneNumber')}
                              keyboardType={'numeric'}
                              error={touched.phoneNumber && errors.phoneNumber}
                              errorTextStyle={styles.phoneErrorStyle}
                              onSubmitEditing={() =>
                                inputRef.email.current.focus()
                              }
                            />
                          </View>
                        </View>
                      </View>
                      <CustomLabelTextInput
                        label={Strings.Email}
                        inputStyle={styles.labelInputStyle}
                        containerStyle={{}}
                        leftIcon={Icons.email}
                        ref={inputRef.email}
                        keyboardType={'email-address'}
                        onChangeText={handleChange('email')}
                        value={values.email.trim()}
                        returnKeyType={'next'}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                        autoCapitalize={'none'}
                        onSubmitEditing={() =>
                          inputRef.password.current.focus()
                        }
                      />
                      <CustomLabelTextInput
                        isPassword
                        togglePassword
                        showPassImage={Icons.eyeShowIcon}
                        hidePassImage={Icons.eyeHideIcon}
                        showPasswordImageStyles={styles.rightIconStyle}
                        label={Strings.Password}
                        leftIcon={Icons.password}
                        containerStyle={{}}
                        inputStyle={styles.labelInputStyle}
                        ref={inputRef.password}
                        keyboardType={'default'}
                        value={values.password.trim()}
                        returnKeyType={'done'}
                        error={touched.password && errors.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        onSubmitEditing={handleSubmit}
                      />
                      <CustomLabelTextInput
                        isPassword
                        togglePassword
                        showPassImage={Icons.eyeShowIcon}
                        hidePassImage={Icons.eyeHideIcon}
                        showPasswordImageStyles={styles.rightIconStyle}
                        label={Strings.confirmPasswordPlaceholder}
                        leftIcon={Icons.password}
                        containerStyle={{}}
                        inputStyle={styles.labelInputStyle}
                        ref={inputRef.confirmPassword}
                        keyboardType={'default'}
                        value={values.confirmPassword.trim()}
                        returnKeyType={'done'}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        onSubmitEditing={handleSubmit}
                      />
                      <View style={styles.checkBoxContainer}>
                        <CheckBox
                          tintColors={{
                            true: Colors.logoBackgroundColor,
                            false: Colors.AuthFiledBorder,
                          }}
                          boxType={'square'}
                          disabled={false}
                          tintColor={Colors.AuthFiledBorder}
                          style={styles.checkIcon}
                          value={toggleCheckBox}
                          onFillColor={Colors.logoBackgroundColor}
                          onCheckColor={Colors.White}
                          onTintColor={Colors.logoBackgroundColor}
                          onValueChange={() => {
                            setToggleCheckBox(prev => !prev);
                          }}
                        />
                        <Text style={styles.termsConditionText}>
                          <Text
                            style={styles.termsConditionText}
                            onPress={onTermsCondition}>
                            {Strings.termsConditionText}
                          </Text>
                          <Text
                            style={styles.privacyPolicyText}
                            onPress={onPrivacyPolicy}>
                            {Strings.PrivacyPolicyText}
                          </Text>
                        </Text>
                      </View>
                      <CustomButton
                        title={Strings.SignUpTitle}
                        onPress={handleSubmit}
                        btnStyle={styles.buttonContainerStyle}
                        disabled={!toggleCheckBox}
                      />
                    </View>
                  )}
                </Formik>
              </View>
            </View>

            <Text style={styles.footerMainText}>
              {Strings.haveAccount}
              <Text style={styles.footerButtonText} onPress={onSignin}>
                {Strings.SignIn}
              </Text>
            </Text>
          </View>

          <ErrorPopup
            {...{
              isError,
              setIsError,
              handleError,
            }}
            message={resError}
          />
        </KeyboardAwareScrollView>
      )}
      style={styles.container}
    />
  );
};

export default SignUp;
