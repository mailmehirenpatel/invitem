// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  mainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  linkOptionView: {
    marginHorizontal: scale(20),
  },
  linkOptionUpperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  flatListLinkOptionUpperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  addIconStyle: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: 'contain',
  },
  titleText: {
    opacity: 0.3,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
  },
  textInputStyle: {
    height: verticalScale(30),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    paddingBottom: verticalScale(10),
    color: Colors.DarkGreen,
    borderBottomWidth: 1,
    borderBottomColor: Colors.AuthFiledBorder,
  },
  textInputContainerStyle: {
    borderColor: Colors.Transparent,
    paddingHorizontal: scale(0),
    marginVertical: verticalScale(10),
    marginTop: verticalScale(0),
  },
  addMoreBtn: {
    marginHorizontal: scale(20),
  },
  separatorView: {
    height: verticalScale(1),
    backgroundColor: Colors.AuthFiledBorder,
    marginVertical: verticalScale(5),
  },
  optionText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginVertical: verticalScale(5),
  },
  flatListAddedOptionsView: {
    marginVertical: verticalScale(5),
    justifyContent: 'space-between',
  },
  addedOptionsView: {
    marginVertical: verticalScale(5),
  },
  flatListMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
  },
  socialIconStyle: {
    height: verticalScale(24),
    width: scale(24),
    resizeMode: 'contain',
    marginHorizontal: scale(5),
    marginVertical: verticalScale(10),
    tintColor: Colors.lightTheme,
  },
  btnContainerStyle: {
    marginHorizontal: scale(40),
    backgroundColor: Colors.logoBackgroundColor,
    marginVertical: verticalScale(10),
    borderRadius: 10,
  },
});
