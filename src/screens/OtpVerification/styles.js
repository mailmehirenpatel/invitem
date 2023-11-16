// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {moderateScale, scale, verticalScale} from '../../config/metrics';
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
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s14,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w600,
    marginHorizontal: scale(10),
    marginTop: verticalScale(20),
  },
  otpInputView: {
    marginHorizontal: scale(10),
  },
  otpContainer: {
    marginTop: verticalScale(7),
    height: verticalScale(42),
    backgroundColor: Colors.White,
    textAlign: 'center',
  },
  mainBtnContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
  },
  cancelBtn: {
    backgroundColor: Colors.BTNLiteGreen,
    flex: 1,
    marginRight: scale(8),
  },
  continueBtn: {
    flex: 1,
    marginLeft: scale(8),
  },
  codeInputFieldStyle: {color: Colors.Black},
});
