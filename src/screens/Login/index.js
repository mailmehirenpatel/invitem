// 3rd party imports
import {Formik} from 'formik';
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';

// Local imports
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icons} from '../../assets';
import {CustomButton, ScreenContainer} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import ErrorPopup from '../../components/ErrorPopup';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import validationSchema from '../../services/validationServices';
import {
  requestRegisterDevice,
  requestSignIn,
} from '../../store/actions/AuthAction';
import {requestFcmToken} from '../../utils';
import styles from './styles';

const Login = ({navigation}) => {
  const [isError, setIsError] = useState(false);
  const [resError, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  // Global Login Field References.
  const inputRef = {
    userName: createRef(),
    password: createRef(),
  };
  const loginRef = createRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loginRef.current.setFieldValue('userName', '');
      loginRef.current.setFieldValue('password', '');
    });
    return unsubscribe;
  }, [loginRef, navigation]);

  const registerLoginDevice = useCallback(async () => {
    const token = await requestFcmToken();
    const uid = await DeviceInfo.getUniqueId();
    const deviceData = {
      id: 0,
      deviceToken: token,
      uId: uid,
      deviceType: Platform.OS === 'android' ? 1 : 2,
      appVersion: DeviceInfo.getVersion(),
      osVersion: DeviceInfo.getSystemVersion(),
      latitude: 0,
      longitude: 0,
    };
    console.log('deviceData --> ', deviceData);
    dispatch(
      requestRegisterDevice(deviceData, (result, message) => {
        result && ToastSuccess(message);
      }),
    );
  }, [dispatch]);

  // User Login API
  const userSignIn = useCallback(
    ({userName, password}) => {
      dispatch(
        requestSignIn(
          {userName: userName, password: password},
          (isSuccess, message, result) => {
            if (!isSuccess) {
              setIsError(true);
              setErrorMessage(message);
              loginRef.current.setFieldValue('userName', '');
              loginRef.current.setFieldValue('password', '');
            } else {
              registerLoginDevice();
              loginRef.current.setFieldValue('userName', '');
              loginRef.current.setFieldValue('password', '');
              result
                ? message && ToastSuccess(message)
                : message && ToastError(message);
            }
          },
        ),
      );
    },
    [dispatch, loginRef, registerLoginDevice],
  );

  // Error Popup Hide Functionality
  const handleError = useCallback(() => {
    setIsError(false);
  }, [setIsError]);

  // Navigate To Other Screen
  const onSignup = useCallback(() => {
    navigation.navigate(NavigationRoutes.SignUp);
  }, [navigation]);

  const onForgot = useCallback(() => {
    navigation.navigate(NavigationRoutes.ForgotPassword);
  }, [navigation]);

  const onLoginMPin = useCallback(() => {
    navigation.navigate(NavigationRoutes.MpinCode);
  }, [navigation]);

  return (
    <ScreenContainer
      renderContent={() => (
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          contentContainerStyle={styles.KeyboardAwareScroll}>
          <View style={styles.MainScreenContainer}>
            <View style={styles.SubContainer}>
              <Text style={styles.txtHeading}>{Strings.LoginTitle}</Text>
              <Formik
                innerRef={loginRef}
                initialValues={{
                  userName: '',
                  password: '',
                }}
                validationSchema={validationSchema.login}
                onSubmit={userSignIn}>
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
                      ref={inputRef.userName}
                      label={Strings.Email}
                      leftIcon={Icons.email}
                      onBlur={handleBlur('userName')}
                      containerStyle={{}}
                      inputStyle={styles.labelInputStyle}
                      keyboardType={'email-address'}
                      onChangeText={handleChange('userName')}
                      value={values.userName.trim()}
                      returnKeyType={'next'}
                      error={touched.userName && errors.userName}
                      onSubmitEditing={() => {
                        inputRef.password.current.focus();
                      }}
                    />

                    <CustomLabelTextInput
                      isFocused={false}
                      ref={inputRef.password}
                      label={Strings.Password}
                      isPassword
                      togglePassword
                      showPassImage={Icons.eyeShowIcon}
                      hidePassImage={Icons.eyeHideIcon}
                      onBlur={handleBlur('password')}
                      leftIcon={Icons.password}
                      inputStyle={styles.labelInputStyle}
                      value={values.password.trim()}
                      containerStyle={{}}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      error={touched.password && errors.password}
                      onChangeText={handleChange('password')}
                      onSubmitEditing={handleSubmit}
                    />
                    <Text style={styles.txtForgotPass} onPress={onForgot}>
                      {Strings.ForgotPassword}
                    </Text>

                    <CustomButton
                      title={Strings.Login}
                      onPress={handleSubmit}
                      btnStyle={styles.btnSignIn}
                    />
                  </View>
                )}
              </Formik>

              {/* below code for display login with mPin */}
              {/* <View style={styles.containerBottomView}>
                <Text style={styles.containerBottomHeading}>{Strings.Or}</Text>
                <Text
                  onPress={onLoginMPin}
                  style={styles.containerBottomHeadingText}>
                  {Strings.LoginWithMPin}
                </Text>
              </View> */}
            </View>
            <Text style={styles.txtHavetAccount}>
              {Strings.DontHaveAccount}
              <Text style={styles.txtSignup} onPress={onSignup}>
                {Strings.SignUp}
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

export default Login;
