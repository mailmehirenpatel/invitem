// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';
export default StyleSheet.create({
  MainScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: scale(20),
  },
  SubContainer: {
    margin: scale(28),
    backgroundColor: Colors.White,
    borderRadius: 15,
    padding: scale(15),
  },
  btnSignIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtForgotPass: {
    marginVertical: verticalScale(15),
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s14,
    fontFamily: fonts.type.RobotoSerifRegular,
    alignSelf: 'flex-end',
    fontWeight: fonts.weight.w500,
  },
  txtHeading: {
    fontSize: fonts.size.s24,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifRegular,
    marginTop: verticalScale(10),
    alignSelf: 'center',
    color: Colors.logoBackgroundColor,
  },
  txtHavetAccount: {
    color: Colors.White,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w500,
    alignSelf: 'center',
    marginBottom: verticalScale(23),
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  txtSignup: {textDecorationLine: 'underline'},
  KeyboardAwareScroll: {flexGrow: 1},
  containerBottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(5),
  },
  containerBottomHeading: {
    color: Colors.loginBottomLightText,
    fontSize: fonts.size.s14,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w500,
    marginBottom: verticalScale(10),
  },
  containerBottomHeadingText: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s14,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w500,
  },
  customLabelStyle: {
    colorBlurred: Colors.PlaceholderLight,
    colorFocused: Colors.PlaceholderLight,
    fontSizeFocused: fonts.size.s12,
  },
  labelInputStyle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w400,
  },
});
