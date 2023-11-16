// 3rd party imports
import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

// Local imports
import {CustomButton, ScreenContainer} from '../../components';
import ErrorPopup from '../../components/ErrorPopup';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {requestVerifyOtp} from '../../store/actions/AuthAction';
import Colors from '../../theme/Colors';
import {styles} from './styles';

const OtpVerification = ({navigation, route}) => {
  const [Otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [resError, setErrorMessage] = useState(null);

  // Error Popup Hide Functionality
  const handleError = useCallback(() => {
    setIsError(false);
  }, [setIsError]);

  const dispatch = useDispatch();

  // Value Pass Through Navigation Params
  const {email, isMpin} = route.params;

  // Verify Otp API Call
  const verifyOtp = useCallback(() => {
    try {
      dispatch(
        requestVerifyOtp(
          {otp: Otp.toString(), email: email},
          (isSuccess, message) => {
            if (!isSuccess) {
              setOtp('');
              setIsError(true);
              setErrorMessage(message);
            } else {
              if (!isMpin) {
                navigation.navigate(NavigationRoutes.ResetPassword, {
                  email: email,
                });
                setOtp('');
              } else {
                navigation.navigate(NavigationRoutes.ResetMPin, {
                  email: email,
                });
                setOtp('');
              }
            }
          },
        ),
      );
    } catch (err) {
      console.log('err -> ', err);
    }
  }, [Otp, dispatch, email, isMpin, navigation]);

  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.container}>
          <Text style={styles.headingStyle}>{Strings.OtpVerification}</Text>
          <Text style={styles.enterCodeStyle}>{Strings.EnterOtp}</Text>
          <View style={styles.otpInputView}>
            <OTPInputView
              pinCount={6}
              code={Otp}
              onCodeChanged={otp => {
                setOtp(otp);
              }}
              secureTextEntry={true}
              style={styles.otpContainer}
              keyboardType="number-pad"
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.codeInputFieldStyle}
              selectionColor={Colors.BTNLiteGreen}
            />

            <View style={styles.mainBtnContainer}>
              <CustomButton
                title={Strings.cancel}
                onPress={() => {
                  navigation.goBack();
                }}
                btnStyle={styles.cancelBtn}
              />
              <CustomButton
                title={Strings.Continue}
                onPress={() => {
                  Otp.length > 5
                    ? verifyOtp()
                    : Toast.show(Strings.EmptyOtp, Toast.LONG, {
                        backgroundColor: Colors.RejectedRedColor,
                      });
                }}
                btnStyle={styles.continueBtn}
              />
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
        </View>
      )}
    />
  );
};

export default OtpVerification;
