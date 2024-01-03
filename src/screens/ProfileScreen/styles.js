// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {
  Metrics,
  moderateScale,
  scale,
  verticalScale,
} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  contentContainer: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    gap: 15,
    paddingBottom: verticalScale(20),
    backgroundColor: Colors.White,
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    resizeMode: 'stretch',
  },
  cameraIconContainer: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.White,
    shadowColor: Colors.Gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 4,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cameraIcon: {
    height: verticalScale(14),
    width: scale(16),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
  },
  profileNameText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s20,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
  },
  profileMainContainer: {
    backgroundColor: Colors.LightBlueBackground,
  },
  profileDetailContainer: {
    margin: moderateScale(20),
    padding: moderateScale(10),
    backgroundColor: Colors.White,
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  countryPickerMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.AuthFiledBorder,
    borderBottomWidth: 0.5,
    height: verticalScale(60),
  },
  phoneImageContainer: {marginLeft: scale(15)},
  phoneIconStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
  },
  countryPickerTextStyle: {
    marginLeft: scale(11),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w400,
  },
  textInputContainer: {
    borderWidth: 0,
    borderBottomColor: Colors.AuthFiledBorder,
    borderBottomWidth: 0.5,
    marginTop: 0,
  },
  inputStyle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  phoneNumTextInputContainer: {
    borderWidth: 0,

    marginTop: 0,
    flex: 1,
  },

  bioContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    borderBottomColor: Colors.AuthFiledBorder,
    borderBottomWidth: 0.5,
    paddingVertical: verticalScale(16),
  },
  bioTextInputContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: scale(12),
    flex: 1,
    color: Colors.DarkGreen,
    textAlignVertical: 'top',
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  socialTextInputContainer: {
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifRegular,
    color: Colors.DarkGreen,
    paddingLeft: 15,
    textAlignVertical: 'top',
    marginTop: Platform.OS === 'android' ? verticalScale(0) : verticalScale(5),
  },
  socialLinkTextInput: {
    borderWidth: 0,
    marginTop: 0,
  },
  addSocialMediaContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  docIconStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
    alignSelf: 'flex-start',
  },
  attachIconStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
    alignSelf: 'flex-start',
    marginTop: verticalScale(5),
  },
  defaultSocialMediaTextStyle: {
    marginLeft: scale(15),
    marginTop: Platform.OS === 'android' ? verticalScale(5) : verticalScale(5),
    color: Colors.PlaceholderLight,
    fontSize: fonts.size.s14,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
  },

  btnTextStyle: {
    fontFamily: fonts.type.RobotoSerifBold,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w500,
    color: Colors.White,
  },
  addSocialMediaBtn: {
    height: verticalScale(30),
    backgroundColor: Colors.logoBackgroundColor,
    borderRadius: 5,
    paddingHorizontal: scale(10),
    marginRight: scale(25),
    marginTop: verticalScale(12),
  },

  attackSocialSubContainer: {
    flexDirection: 'row',
  },
  optionText: {
    marginLeft: scale(15),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    color: Colors.LinkColor,
    fontWeight: fonts.weight.w400,
    margin: verticalScale(3),
    textDecorationLine: 'underline',
  },
  leftIconStyle: {
    tintColor: Colors.DarkGreen,
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    marginLeft: scale(15),
  },
  deleteIconStyle: {
    width: scale(21),
    height: verticalScale(21),
    resizeMode: 'contain',
    tintColor: Colors.Red,
  },
  webLinkTextContainer: {flex: 1},
  redirectToWebView: {
    width: Metrics.screenWidth * 0.75,
    flexDirection: 'row',
  },
  countryDropDownIcon: {
    height: verticalScale(10),
    width: scale(10),
    marginLeft: scale(5),
  },
  countryCodeMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateModeContainer: {
    alignItem: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
