// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainEventContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  backArrowStyle: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
  },
  mainContainerView: {
    backgroundColor: Colors.White,
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(30),
  },
  addUserImage: {
    height: verticalScale(60),
    width: scale(60),
    resizeMode: 'contain',
  },
  renderUserListView: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
  },
  scrollViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    paddingVertical: verticalScale(5),
  },
  addUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedIconContainer: {
    height: scale(25),
    width: scale(25),
    backgroundColor: Colors.logoBackgroundColor,
    borderRadius: scale(12),
  },
  SelectedIconStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    alignItems: 'center',
  },
  addUserName: {
    color: Colors.Black,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w500,
    marginLeft: scale(15),
  },
  addGuestImageContainer: {
    backgroundColor: Colors.DarkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
  },
  addGuestImage: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
  },
  headerMainComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(5),
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  addGuestText: {
    color: Colors.Black,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w500,
    marginLeft: scale(15),
  },
  textInputStyle: {
    paddingLeft: scale(0),
    marginLeft: scale(0),
    marginBottom: verticalScale(10),
  },
  guestNotesIcon: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    resizeMode: 'contain',
  },
  bottomSheetNavContainer: {
    marginTop: verticalScale(0),
    height: verticalScale(40),
  },
  rightButtonDefaultStyles: {
    color: Colors.Black,
  },
  rightButtonStyles: {
    color: Colors.Gray,
  },
  customStyles: {
    container: {
      minHeight: Metrics.screenHeight * 0.45,
      maxHeight: Metrics.screenHeight * 0.9,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    draggableIcon: {
      backgroundColor: Colors.Black,
      width: scale(60),
      marginTop: verticalScale(20),
    },
  },
  rightIconStyle: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: 'contain',
  },
  BottomSheetTextInput: {
    flexDirection: 'row',
  },
  bottomSheetMainContainer: {
    paddingHorizontal: scale(20),
  },
  errorTextStyle: {
    marginLeft: scale(20),
  },
  settingHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
    paddingHorizontal: scale(20),
  },
  backIcon: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s20,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
  addText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w500,
    color: Colors.DarkGreen,
  },

  textInputPhoneStyle: {
    width: Metrics.screenWidth * 0.53,
    marginLeft: scale(10),
    height: scale(55),
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  PhoneRightContainer: {
    marginTop: verticalScale(20),
  },
  userProfileImage: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    resizeMode: 'cover',
  },
  guestTextContainer: {
    height: verticalScale(19),
    width: scale(47),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.guestTextBgColor,
  },
  guestText: {
    fontSize: fonts.size.s12,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w500,
    fontFamily: fonts.type.RobotoSerifExtraBold,
  },
  countryDropDownIcon: {
    height: verticalScale(10),
    width: scale(10),
    marginLeft: scale(5),
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
  searchIcon: {
    height: verticalScale(18),
    width: scale(18),
    resizeMode: 'contain',
    marginHorizontal: scale(15),
  },
  searchContainerStyle: {
    alignItems: 'center',
    marginHorizontal: scale(10),
    height: Metrics.screenHeight * 0.05,
    borderColor: Colors.AuthFiledBorder,
    borderWidth: 0.5,
  },
  textInput: {
    width: Metrics.screenWidth * 0.6,
    color: Colors.Black,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
  },
  noUserFoundTxt: {
    marginTop: verticalScale(50),
    color: Colors.Black,
    fontSize: fonts.size.s18,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
  },
  noUserFoundView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
