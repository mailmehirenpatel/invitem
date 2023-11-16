// 3rd party imports
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';

// Local imports
import {CustomButton, ScreenContainer} from '../../components';
import ErrorPopup from '../../components/ErrorPopup';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError} from '../../constants/ToastConstants';
import {
  requestForgotPass,
  requestRefreshToken,
  requestVerifyMpinUrl,
} from '../../store/actions/AuthAction';
import {onLogout} from '../../store/slice/AuthSlice';
import Colors from '../../theme/Colors';
import {styles} from './styles';

export default function MpinCode({navigation}) {
  const [Otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [resError, setErrorMessage] = useState(null);
  const {isLogin} = useSelector(state => state.auth);
  //console.log(isLogin);
  useEffect(() => {
    //console.log(new Date());
    //console.log(new Date(isLogin?.validTo));
    // if (new Date(isLogin?.validTo) < new Date('2023-11-03T14:24:25.000Z')) {
    //   console.log('expired...');
    // } else {
    //   console.log('not expired....');
    // }

    if (new Date(isLogin?.validTo) < new Date()) {
      let requestData = {
        token: isLogin?.token,
        refreshToken: isLogin?.refreshToken,
      };
      dispatch(requestRefreshToken(requestData));
    }
  }, [
    dispatch,
    isLogin?.refreshToken,
    isLogin?.refreshTokenExpiryTime,
    isLogin?.token,
    isLogin?.validTo,
  ]);

  // Error Popup Hide Functionality
  const handleError = useCallback(() => {
    setIsError(false);
  }, [setIsError]);

  const dispatch = useDispatch();
  // Logout Functionality
  const clearData = useCallback(() => {
    dispatch(onLogout());
  }, [dispatch]);

  // forgot m-pin
  const ForgotMpinCall = useCallback(() => {
    dispatch(
      requestForgotPass(isLogin?.email, (isSuccess, message) => {
        if (!isSuccess) {
          setIsError(true);
          setErrorMessage(message);
        } else {
          Toast.show(Strings.OtpSent, Toast.LONG, {
            backgroundColor: Colors.ApprovedGreenColor,
          });
          navigation.navigate(NavigationRoutes.OtpVerification, {
            email: isLogin?.email,
            isMpin: true,
          });
        }
      }),
    );
  }, [dispatch, isLogin?.email, navigation]);

  // M-pin Authentication api call
  const mPinAuth = useCallback(() => {
    try {
      dispatch(
        requestVerifyMpinUrl(Otp, (isSuccess, message) => {
          if (isSuccess) {
            setOtp('');
            navigation.replace(NavigationRoutes.EventScreen);
          } else {
            setOtp('');
            ToastError(Strings.ValidMpin);
          }
        }),
      );
    } catch (err) {
      console.log('mpin-auth-api-err ==> ', err);
    }
  }, [Otp, dispatch, navigation]);

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <View style={styles.container}>
            <Text style={styles.headingStyle}>{Strings.Mpin}</Text>
            <Text style={styles.enterCodeStyle}>{Strings.EnterMpinCode}</Text>
            <View style={styles.otpInputView}>
              <OTPInputView
                pinCount={4}
                code={Otp}
                onCodeChanged={otp => {
                  setOtp(otp);
                }}
                secureTextEntry={true}
                style={styles.otpContainer}
                autoFocusOnLoad={false}
                keyboardType="number-pad"
                codeInputFieldStyle={styles.codeInputFieldStyle}
                selectionColor={Colors.BTNLiteGreen}
              />
            </View>
            <Text style={styles.txtForgotMpin} onPress={ForgotMpinCall}>
              {Strings.ForgotMpin}
            </Text>
            <CustomButton
              title={Strings.Login}
              onPress={() => {
                Otp.length > 3
                  ? mPinAuth()
                  : Toast.show(Strings.InvalidOtp, Toast.LONG, {
                      backgroundColor: Colors.RejectedRedColor,
                    });
              }}
              btnStyle={styles.loginBtn}
            />
          </View>
          <Text style={styles.txtHavetAccount}>
            {Strings.BackToLogin}
            <Text style={styles.txtSignup} onPress={clearData}>
              {Strings.Login}
            </Text>
          </Text>
          <ErrorPopup
            {...{
              isError,
              setIsError,
              handleError,
            }}
            message={resError}
          />
        </>
      )}
    />
  );
}
