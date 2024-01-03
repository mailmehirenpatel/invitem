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
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  rsvpMainContainer: {
    backgroundColor: Colors.White,
    width: Metrics.screenWidth - 40,
    flex: 1,
    marginTop: verticalScale(10),
    alignSelf: 'center',
    borderRadius: 15,
  },
  titleStyle: {marginRight: scale(35)},
  rsvpTitleMainContainer: {
    backgroundColor: Colors.logoBackgroundColor,
    padding: moderateScale(10),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  rsvpExpiredTextStyle: {
    alignSelf: 'flex-end',
    color: Colors.ClockOutRed,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s16,
    marginBottom: verticalScale(8),
  },
  rsvpTitleContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: Colors.LightBlueBackground,
    flex: 1,
  },
  rsvpTitle: {
    color: Colors.White,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBold,
    fontWeight: fonts.weight.w600,
    flex: 1,
  },
  rsvpTitleName: {
    color: Colors.White,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBold,
    fontWeight: fonts.weight.w400,
    flex: 1,
  },
  rsvpDate: {
    color: Colors.White,
    fontSize: fonts.size.s13,
    fontFamily: fonts.type.RobotoSerifBold,
    fontWeight: fonts.weight.w400,
    alignSelf: 'flex-end',
    flex: 0.65,
  },
  rsvpDetailsContainer: {
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(10),
  },
  rsvpDescription: {
    marginTop: 10,
    color: Colors.Black,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBold,
    fontWeight: fonts.weight.w600,
  },
  rsvpDescriptionData: {
    marginTop: verticalScale(10),
    color: Colors.Black,
    fontSize: fonts.size.s15,
    fontFamily: fonts.type.RobotoSerifBold,
    fontWeight: fonts.weight.w400,
  },
  rsvpBtnContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  rsvpResultContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  rsvpResultText: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s16,
    marginRight: scale(5),
    fontWeight: fonts.weight.w600,
  },
  rightArrowStyle: {
    height: verticalScale(15),
    width: scale(15),
    resizeMode: 'contain',
    tintColor: Colors.logoBackgroundColor,
  },
  rsvpAccept: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: moderateScale(10),
    borderWidth: 1,
    marginRight: scale(5),
    borderRadius: 8,
  },
  rsvpDecline: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: moderateScale(10),
    borderWidth: 1,
    marginLeft: scale(5),
    borderRadius: 8,
  },
});
