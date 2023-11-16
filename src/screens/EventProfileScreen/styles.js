// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  eventProfileMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollViewStyle: {
    backgroundColor: Colors.LightBlueBackground,
  },
  eventProfileTopContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  eventProfileLogo: {
    height: Metrics.screenHeight * 0.18,
    width: Metrics.screenWidth * 0.6,
    resizeMode: 'contain',
    borderRadius: 10,
    alignSelf: 'center',
  },
  mainHeading: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s17,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w700,
    textAlign: 'center',
    paddingBottom: verticalScale(20),
  },
  eventProfileImage: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: scale(7),
  },
  eventProfileText: {
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w500,
    color: Colors.Black,
    fontFamily: fonts.type.RobotoSerifRegular,
    marginLeft: scale(15),
  },
  eventProfileNotificationContainer: {
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
  eventProfileNotificationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventProfileNotificationMainContainer: {
    marginVertical: verticalScale(20),
    marginHorizontal: scale(20),
  },
  eventProfileNotification: {
    flexDirection: 'row',
    height: verticalScale(30),
    width: scale(30),
    borderRadius: 15,
  },
  eventProfileParticipateView: {
    flexDirection: 'row',
    marginRight: scale(15),
    height: verticalScale(30),
    width: scale(30),
    borderRadius: 15,
  },
  eventProfileParticipateImage: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    resizeMode: 'contain',
  },
  eventProfileParticipateName: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w500,
    color: Colors.Black,
  },
  eventProfileParticipateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  eventProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  micIconStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    marginLeft: scale(6),
  },
  headerListComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(22),
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
  eventProfileParticipantMainContainer: {
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
});
