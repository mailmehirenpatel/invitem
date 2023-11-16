import {StyleSheet} from 'react-native';
import fonts from '../../config/fonts';
import {
  Metrics,
  moderateScale,
  scale,
  verticalScale,
} from '../../config/metrics';
import Colors from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(40),
    marginHorizontal: scale(15),
    padding: moderateScale(15),
    borderRadius: 15,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  headingStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s24,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  enterCodeStyle: {
    alignSelf: 'center',
    paddingBottom: verticalScale(10),
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s14,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w600,
    marginHorizontal: scale(10),
    marginTop: verticalScale(20),
  },
  otpInputView: {
    marginHorizontal: scale(40),
  },
  otpContainer: {
    marginTop: verticalScale(7),
    height: verticalScale(42),
    backgroundColor: Colors.White,
    textAlign: 'center',
  },
  loginBtn: {
    marginTop: verticalScale(10),
  },
  loginBtnTextStyle: {
    color: Colors.White,
  },
  txtForgotMpin: {
    marginVertical: verticalScale(15),
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifRegular,
    alignSelf: 'flex-end',
    fontWeight: fonts.weight.w500,
  },
  codeInputFieldStyle: {color: Colors.Black},

  txtSignup: {textDecorationLine: 'underline'},
  txtHavetAccount: {
    color: Colors.White,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w500,
    alignSelf: 'center',
    fontFamily: fonts.type.RobotoSerifRegular,
    marginTop: verticalScale(20),
  },
});
