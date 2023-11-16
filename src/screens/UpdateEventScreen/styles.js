// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import {scale, verticalScale, Metrics} from '../../config/metrics';
import fonts from '../../config/fonts';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainEventContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  mainContainerView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  viewContainer: {
    paddingHorizontal: scale(25),
    gap: verticalScale(15),
  },
  titleStyle: {marginLeft: scale(10)},
  mainMeetingViewContainer: {
    marginVertical: verticalScale(20),
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: verticalScale(20),
  },
  mainViewGroupContainer: {
    borderBottomColor: Colors.BorderColor,
    borderBottomWidth: 1,
    paddingBottom: verticalScale(10),
  },
  mainViewGroupSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },
  eventLabelText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
    opacity: 0.5,
  },
  mainViewLocationTitle: {
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifRegular,
    opacity: 0.3,
    fontSize: fonts.size.s14,
  },
  mainViewTitleStyle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifRegular,
    opacity: 0.3,
  },
  mainViewDescription: {
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  mainViewTimeWithDescription: {
    marginRight: scale(15),
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  MeetingDefaultColor: {
    color: Colors.Red,
  },
  tickIcon: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainViewColorContainer: {
    height: verticalScale(120),
  },
  btnContainerStyle: {
    marginHorizontal: scale(25),
    marginBottom: verticalScale(20),
  },
  contactButtonContainer: {
    height: verticalScale(30),
    width: scale(90),
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.Black,
  },
  contactButton: {
    fontSize: fonts.size.s12,
    textAlign: 'center',
    color: Colors.Black,
    paddingTop: verticalScale(6),
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  switchEventView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListView: {
    marginTop: verticalScale(5),
  },

  profileSelectionImageView: {
    paddingLeft: scale(15),
    width: scale(25),
  },
  profileSelectionText: {
    color: Colors.White,
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
  LocationMainContainer: {
    backgroundColor: Colors.White,
    width: '100%',
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
    marginTop: verticalScale(5),
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
  multipleLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(10),
  },
  locationIcon: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
  },
  multipleLocationListContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
  },
  multipleLocationTitle: {
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  CenterEventLogo: {
    height: scale(80),
    width: scale(80),
    resizeMode: 'cover',
    borderRadius: scale(40),
    alignSelf: 'center',
  },

  EventContainer: {
    alignItems: 'center',
    gap: 15,
    paddingBottom: verticalScale(20),
    backgroundColor: Colors.White,
  },
  EventLogo: {
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
  dateTimeView: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.Gray,
    marginVertical: verticalScale(5),
    padding: scale(10),
  },
});
