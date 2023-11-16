// 3rd party imports
import {Formik} from 'formik';
import React, {createRef, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

// Local imports
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icons} from '../../assets';
import {CustomButton, ScreenContainer} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import ErrorPopup from '../../components/ErrorPopup';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import validationSchema from '../../services/validationServices';
import {requestForgotPass} from '../../store/actions/AuthAction';
import Colors from '../../theme/Colors';
import styles from './styles';

const ForgotPassword = ({navigation}) => {
  const [isError, setIsError] = useState(false);
  const [resError, setErrorMessage] = useState(null);

  // Global forgotPassword Field References.
  const inputRef = {
    email: createRef(),
  };
  const dispatch = useDispatch();

  // Forgot Password API Call
  const forgotPassword = useCallback(
    ({email}) => {
      try {
        dispatch(
          requestForgotPass(email, (isSuccess, message) => {
            if (!isSuccess) {
              setIsError(true);
              setErrorMessage(message);
            } else {
              Toast.show(Strings.OtpSent, Toast.LONG, {
                backgroundColor: Colors.ApprovedGreenColor,
              });
              navigation.navigate(NavigationRoutes.OtpVerification, {
                email: email,
                isMpin: false,
              });
            }
          }),
        );
      } catch (err) {
        console.log('err -> ', err);
      }
    },
    [dispatch, navigation],
  );
  // Navigate To Other Screen
  const onLogin = useCallback(() => {
    navigation.navigate(NavigationRoutes.Login);
  }, [navigation]);
  // Error Popup Hide Functionality
  const handleError = useCallback(() => {
    setIsError(false);
  }, [setIsError]);

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
              <Text style={styles.txtHeading}>
                {Strings.ForgotPasswordTitle}
              </Text>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={validationSchema.forgotPassword}
                onSubmit={forgotPassword}>
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
                      ref={inputRef.email}
                      label={Strings.emailPlaceholder}
                      inputStyle={styles.labelInputStyle}
                      leftIcon={Icons.email}
                      containerStyle={{}}
                      keyboardType={'email-address'}
                      onChangeText={handleChange('email')}
                      value={values.email.trim()}
                      returnKeyType={'next'}
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email}
                      onSubmitEditing={handleSubmit}
                    />

                    <CustomButton
                      title={Strings.sendOtp}
                      onPress={handleSubmit}
                      btnStyle={styles.btnSignIn}
                    />
                  </View>
                )}
              </Formik>
            </View>
            <Text style={styles.backToLogin}>
              {Strings.BackToLogin}
              <Text style={styles.txtSignIn} onPress={onLogin}>
                {Strings.Login}
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

export default ForgotPassword;
