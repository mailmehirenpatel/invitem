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
  mainEventContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },

  viewContainer: {
    backgroundColor: Colors.White,
    gap: verticalScale(10),
    marginTop: verticalScale(10),
  },

  eventLabelText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
    opacity: 0.5,
    marginTop: verticalScale(10),
  },
  addLocationEventLable: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
    opacity: 0.5,
  },
  mainViewTitleStyle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifRegular,
    opacity: 0.3,
  },

  mainViewTimeWithDescription: {
    marginRight: scale(15),
    marginVertical: verticalScale(5),
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
    fontFamily: fonts.type.RobotoSerifRegular,
  },

  btnContainerStyle: {
    marginHorizontal: scale(25),
    marginBottom: verticalScale(20),
  },

  switchEventView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  locationViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(5),
  },
  addLocationIconContainer: {
    height: scale(30),
    width: scale(30),
    backgroundColor: Colors.logoBackgroundColor,
    borderRadius: scale(15),
  },
  addLocationIcon: {
    height: scale(14),
    width: scale(14),
    tintColor: Colors.White,
    resizeMode: 'contain',
  },
  eventSubContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  textInputContainerStyle: {
    borderWidth: 0,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  textInputStyle: {
    paddingLeft: 0,
    height: verticalScale(40),
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
    marginLeft: 0,
  },
  textInputContainerDescriptionStyle: {
    borderWidth: 0,
    paddingHorizontal: 0,
    marginTop: verticalScale(10),
  },
  textInputDescriptionStyle: {
    fontSize: fonts.size.s13,
    paddingLeft: 0,
    marginLeft: 0,
    height: verticalScale(80),
    textAlignVertical: 'top',
  },
  eventDateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingBottom: verticalScale(10),
  },
  eventDateLabelRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventGuestContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingBottom: verticalScale(10),
  },
  eventTypeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingBottom: verticalScale(5),
  },
  mapStyle: {
    height: Metrics.screenHeight * 0.2,
    borderRadius: 5,
    marginBottom: verticalScale(20),
  },
  locationIcon: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
  },

  CenterEventLogo: {
    height: scale(80),
    width: scale(80),
    resizeMode: 'cover',
    borderRadius: scale(40),
    alignSelf: 'center',
  },
  LocationMainContainer: {
    backgroundColor: Colors.White,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.logoBackgroundColor,
    marginTop: verticalScale(10),
  },
  locationData: {
    marginHorizontal: scale(20),
  },
  RBSheetView: {
    marginHorizontal: scale(15),
    padding: moderateScale(15),
    borderRadius: 15,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  RBSheetHeaderText: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s16,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  ThreeOptionVIew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  ThreeOptionTOView: {
    height: verticalScale(50),
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThreeOptionsTxt: {
    color: Colors.White,
    fontSize: fonts.size.s16,
  },
  WeekDayItemView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  WeekDayeTxt: {
    color: Colors.White,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  updateScheduleContainer: {marginHorizontal: scale(20)},
});
