// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  guestProfileListMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollViewStyle: {
    backgroundColor: Colors.LightBlueBackground,
  },
  guestProfileListTopContainer: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  eventProfileLogo: {
    height: scale(140),
    width: scale(140),
    resizeMode: 'contain',
    borderRadius: scale(70),
    alignSelf: 'center',
  },
  mainHeading: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s17,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w700,
    textAlign: 'center',
    paddingBottom: verticalScale(20),
    marginTop: verticalScale(10),
  },
  guestEventProfileImage: {
    height: verticalScale(14),
    width: scale(14),
    resizeMode: 'contain',
  },
  guestEventProfileText: {
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w500,
    color: Colors.Black,
    fontFamily: fonts.type.RobotoSerifRegular,
    marginLeft: scale(15),
  },
  guestEventProfileNotificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  guestEventProfileNotificationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestEventProfileNotificationsContainer: {
    marginVertical: verticalScale(20),
    marginHorizontal: scale(20),
  },
  guestEventProfileNotification: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
  },
  eventProfileParticipateView: {
    flexDirection: 'row',
    marginRight: scale(15),
    height: verticalScale(30),
    width: scale(30),
    borderRadius: 15,
  },
  guestEventProfileParticipateName: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w500,
    color: Colors.DarkGreen,
    marginLeft: scale(10),
  },
  guestEventProfileParticipateMainContainer: {},
  guestEventProfileParticipateImage: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    resizeMode: 'cover',
    borderWidth: 0.5,
    borderColor: Colors.Gray,
  },
  guestEventProfileParticipantMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guestEventProfileParticipateContainer: {
    marginHorizontal: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingVertical: verticalScale(8),
  },
  guestProfileLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestEventProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerListComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(5),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  participantTextStyle: {
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w500,
    color: Colors.DarkGreen,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  searchIconStyle: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
  },
  participantMainContainer: {
    backgroundColor: Colors.White,
    marginHorizontal: scale(20),
    marginBottom: verticalScale(50),
    paddingBottom: verticalScale(30),
    borderRadius: 10,
  },
  scrollViewNotificationStyle: {
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  guestText: {
    fontSize: fonts.size.s10,
    textAlign: 'center',
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  guestTextContainer: {
    height: verticalScale(19),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.guestTextBgColor,
    paddingHorizontal: scale(5),
  },
  btnDeleteEvent: {
    height: verticalScale(45),
    marginVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(20),
  },
});
