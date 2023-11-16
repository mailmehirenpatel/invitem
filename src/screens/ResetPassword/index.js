// 3rd party imports
import {Formik} from 'formik';
import React, {createRef, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

// Local imports
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icons} from '../../assets';
import {CustomButton, ScreenContainer} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import ErrorPopup from '../../components/ErrorPopup';
import SuccessPopup from '../../components/SuccessPopup';
import {Strings} from '../../config/strings';
import validationSchema from '../../services/validationServices';
import {requestResetPassword} from '../../store/actions/AuthAction';
import styles from './styles';

const ResetPassword = ({navigation, route}) => {
  const [isError, setIsError] = useState(false);
  const [isSecurePwd, setSecurePwd] = useState(true);
  const [isSecureCPwd, setSecureCPwd] = useState(true);
  const [resError, setErrorMessage] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [resSuccess, setSuccessMessage] = useState(null);

  // Global ResetPassword Field References
  const inputRef = {
    password: createRef(),
    confirmPassword: createRef(),
  };

  const dispatch = useDispatch();

  // Error Popup Error
  const handleError = useCallback(() => {
    setIsError(false);
  }, []);

  // Success Popup Ok Functionality
  const handleOk = useCallback(() => {
    setIsSuccessVisible(false);
    navigation.pop(3);
  }, [navigation]);

  // Value Pass Through Navigation Params
  const {email} = route.params;

  // Reset Password API Call
  const resetPassword = useCallback(
    ({password, confirmPassword}) => {
      try {
        dispatch(
          requestResetPassword(
            {
              password: password,
              confirmpassword: confirmPassword,
              email: email,
            },
            (isSuccess, message) => {
              if (!isSuccess) {
                setIsError(true);
                setErrorMessage(message);
              } else {
                setIsSuccessVisible(true);
                setSuccessMessage(message);
              }
            },
          ),
        );
      } catch (err) {
        console.log('err -> ', err);
      }
    },
    [dispatch, email],
  );

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
          <View style={styles.MainScreenContainer}>
            <View style={styles.SubContainer}>
              <Text style={styles.txtHeading}>{Strings.ResetPassword}</Text>
              <Formik
                initialValues={{
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema.resetPassword}
                onSubmit={resetPassword}>
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
                      error={touched.confirmPassword && errors.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      onSubmitEditing={handleSubmit}
                    />
                    <CustomButton
                      title={Strings.Save}
                      onPress={handleSubmit}
                      btnStyle={styles.btnSignIn}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
          <ErrorPopup
            {...{
              isError,
              setIsError,
              handleError,
            }}
            message={resError}
          />

          <SuccessPopup
            {...{
              setIsSuccessVisible,
              handleOk,
            }}
            isVisible={isSuccessVisible}
            message={resSuccess}
          />
        </KeyboardAwareScrollView>
      )}
      style={styles.container}
    />
  );
};

export default ResetPassword;
