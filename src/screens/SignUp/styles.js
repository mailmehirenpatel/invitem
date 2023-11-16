// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  KeyboardAwareScroll: {flexGrow: 1},
  MainScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  SubContainer: {
    margin: scale(28),
    backgroundColor: Colors.White,
    borderRadius: 15,
    padding: scale(15),
  },
  mainHeading: {
    fontSize: fonts.size.s18,
    fontWeight: fonts.weight.w700,
    color: Colors.Black,
    fontFamily: fonts.type.RobotoSerifRegular,
    alignSelf: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: verticalScale(30),
  },
  termsConditionText: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s11,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifRegular,
    marginVertical: verticalScale(7),
    textDecorationLine: 'underline',
  },
  privacyPolicyText: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s11,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifRegular,
    marginVertical: verticalScale(7),
    textDecorationLine: 'underline',
  },
  buttonContainerStyle: {
    color: Colors.logoBackgroundColor,
    marginBottom: verticalScale(20),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginVertical: verticalScale(8),
    marginLeft: scale(3),
    alignItems: 'center',
  },
  footerMainText: {
    color: Colors.White,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w500,
    alignSelf: 'center',
    marginBottom: verticalScale(23),
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  footerButtonText: {
    textDecorationLine: 'underline',
  },
  textInputPhoneStyle: {
    width: Metrics.screenWidth * 0.57,
    marginLeft: scale(10),
    height: scale(55),
  },
  phoneErrorStyle: {marginLeft: scale(12)},
  checkIcon: {
    height: scale(15),
    width: scale(15),
    marginRight: Platform.OS === 'android' ? scale(15) : scale(8),
  },
  countryCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight * 0.08,
    flexDirection: 'row',
  },
  countryCodeText: {
    fontSize: fonts.size.s14,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w500,
    fontFamily: fonts.type.RobotoSerifExtraBold,
  },
  countryDropDownIcon: {
    height: verticalScale(10),
    width: scale(10),
    marginLeft: scale(5),
  },
  countryCodeWithPhoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryCodeContainerView: {
    height: Metrics.screenHeight * 0.065,
    width: Metrics.screenWidth * 0.18,
    marginTop: verticalScale(15),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeMainContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
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
