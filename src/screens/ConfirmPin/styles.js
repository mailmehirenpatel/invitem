// 3rd Party Imports
import {StyleSheet, Platform} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  confirmPinMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  confirmPinIconStyle: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
    backgroundColor: Colors.confirmPinLogoBgColor,
  },
  numberPadIconStyle: {
    height: scale(40),
    width: scale(40),
    resizeMode: 'contain',
  },
  confirmPinTopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? verticalScale(30) : verticalScale(0),
  },
  confirmPinMainHeading: {
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s20,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w600,
    marginVertical: verticalScale(15),
  },
  confirmPinButtonStyle: {
    marginTop: verticalScale(24),
    marginHorizontal: scale(50),
  },
  inputViewEmptyStyle: {
    backgroundColor: Colors.White,
    height: scale(15),
    width: scale(15),
    borderRadius: scale(7),
    borderWidth: 2,
    borderColor: Colors.logoBackgroundColor,
  },
  inputViewFilledStyle: {
    backgroundColor: Colors.logoBackgroundColor,
    height: scale(15),
    width: scale(15),
    borderRadius: scale(7),
    borderWidth: 2,
    borderColor: Colors.logoBackgroundColor,
  },
  inputButtonStyle: {
    color: Colors.logoBackgroundColor,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s25,
    fontWeight: fonts.weight.w400,
  },
  inputButtonViewStyle: {
    borderWidth: 2,
    borderColor: Colors.borderColor,
  },
  confirmPinBottomHeading: {
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s14,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w500,
    textAlign: 'center',
  },
  confirmPinContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom:
      Platform.OS === 'android' ? verticalScale(10) : verticalScale(30),
  },
  confirmPinCloseIcon: {
    height: verticalScale(19),
    width: scale(27),
    resizeMode: 'contain',
  },
  inputViewEmptyCloseStyle: {
    backgroundColor: Colors.White,
    height: scale(74),
    width: scale(74),
    borderRadius: scale(37),
    borderWidth: 2,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
