// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {moderateScale, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    height: Platform.OS === 'android' ? verticalScale(80) : verticalScale(100),
    backgroundColor: Colors.White,
  },
  profileHeaderContainer: {
    marginTop: Platform.OS === 'android' ? 0 : moderateScale(10),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(60),
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  titleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s18,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
    textAlign: 'center',
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
  },
  leftIconStyle: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: 'contain',
  },
  profileIconStyle: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    resizeMode: 'cover',
    borderWidth: 0.5,
    borderColor: Colors.logoBackgroundColor,
  },
  rightIconStyle: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    marginRight: scale(8),
  },
  textIcon: {
    height: verticalScale(14),
    width: scale(14),
    marginLeft: scale(5),
    resizeMode: 'contain',
  },
  backArrowIconStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
  },
  buttonText: {
    color: Colors.Black,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w500,
  },
  rightText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w500,
    color: Colors.DarkGreen,
    flex: 2,
    textAlign: 'right',
  },
  mainHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 6,
    justifyContent: 'center',
  },
  emptyViewStyle: {
    flex: 2,
    height: verticalScale(40),
    justifyContent: 'center',
  },
  rightProfileIconStyle: {
    flex: 2,
    alignItems: 'flex-end',
  },
});
