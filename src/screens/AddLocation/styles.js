// 3rd Party Imports
import {StyleSheet} from 'react-native';

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
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
    paddingHorizontal: scale(20),
  },
  searchView: {
    height: verticalScale(80),
    alignSelf: 'center',
    margin: moderateScale(20),
  },
  searchViewWithLocation: {
    height: Metrics.screenHeight * 0.25,
    backgroundColor: Colors.White,
  },
  searchContainerStyle: {
    justifyContent: 'center',
    backgroundColor: Colors.White,
    width: Metrics.screenWidth - 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  searchContainerwithLocation: {
    justifyContent: 'flex-start',
  },
  leftView: {
    marginLeft: scale(15),
    justifyContent: 'center',
  },
  searchIcon: {
    height: verticalScale(18),
    width: scale(18),
    resizeMode: 'contain',
  },
  textInputContainer: {
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 25,
    marginVertical: verticalScale(10),
    marginHorizontal: scale(15),
    backgroundColor: Colors.White,
  },
  textInput: {
    alignSelf: 'center',
    height: verticalScale(30),
    marginRight: scale(10),
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  listContainer: {
    flexGrow: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(40),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  locationDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderTopColor: Colors.Transparent,
    borderLeftColor: Colors.Transparent,
    borderRightColor: Colors.Transparent,
    borderBottomColor: Colors.borderColor,
    paddingVertical: verticalScale(10),
  },
  titleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
  },
  detailText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
  },
  separatorView: {
    backgroundColor: Colors.borderColor,
    height: verticalScale(1),
    marginVertical: verticalScale(5),
  },
  currentLocationView: {
    backgroundColor: Colors.LightBlueBackground,
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginTop: -20,
  },
  locationIconView: {
    backgroundColor: Colors.DarkGreen,
    height: scale(30),
    width: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  useMyCurrentLocationText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
    marginHorizontal: scale(13),
  },
  iconStyle: {
    height: verticalScale(15),
    width: scale(12.5),
    resizeMode: 'contain',
    tintColor: Colors.White,
  },
  detailLocationIconStyle: {
    height: verticalScale(15),
    width: scale(12.5),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
    marginHorizontal: scale(10),
  },
  locationList: {
    marginHorizontal: scale(40),
  },
  locationText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
  },
  textsView: {
    width: Metrics.screenWidth * 0.7,
  },
  addressContainer: {
    backgroundColor: Colors.White,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(10),
  },
  inputStyle: {
    fontFamily: fonts.type.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  inputContainer: {
    borderWidth: 0,
    borderBottomColor: Colors.AuthFiledBorder,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  errorTextStyle: {
    marginLeft: scale(5),
    fontSize: fonts.size.s10,
    fontSizeFocused: fonts.size.s8,
  },
  addressInput: {
    minHeight: verticalScale(60),
    maxHeight: verticalScale(130),
    marginTop: verticalScale(15),
  },
  addressInputContainer: {
    maxHeight: verticalScale(200),
    minHeight: verticalScale(60),
  },
  customLabelStyle: {
    colorBlurred: Colors.PlaceholderLight,
    colorFocused: Colors.PlaceholderLight,
    fontSizeFocused: fonts.size.s12,
  },
});
