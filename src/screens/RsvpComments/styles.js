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
    marginTop: verticalScale(-1),
  },
  contentContainer: {
    backgroundColor: Colors.LightBlueBackground,
    flex: 1,
  },
  leftIconStyle: {
    marginLeft: scale(10),
    marginRight: scale(19),
  },
  titleStyle: {
    justifyContent: 'flex-start',
  },
  rsvpStatusContainer: {
    backgroundColor: Colors.White,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(30),
  },
  attendUnattendContainer: {
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: scale(15),
    alignItems: 'center',
    paddingBottom: verticalScale(7),
  },
  attendUnattendTextStyle: {
    fontSize: fonts.size.s14,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Metrics.screenWidth,
    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  selectedTab: {
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: Colors.Transparent,
    borderBottomColor: Colors.DarkGreen,
  },
  selectedText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
  },
  unselectedTab: {
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  unSelectedText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w500,
    color: Colors.Gray,
  },
  flatListView: {
    backgroundColor: Colors.White,
    margin: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: 10,
  },
  rsvpCommentMainContainer: {
    paddingBottom: verticalScale(9),
    borderRadius: 10,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.BorderColor,
  },
  rsvpCommentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    resizeMode: 'cover',
    marginRight: scale(10),
  },
  rsvpRightContainer: {
    flex: 1,
  },
  commentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextStyle: {
    flex: 1,
    color: Colors.Black,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  commentRightIcon: {
    height: verticalScale(10),
    width: scale(10),
    resizeMode: 'contain',
  },
  descriptionTextStyle: {
    fontSize: fonts.size.s11,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifRegular,
    color: Colors.rsvpTextColor,
  },
  rsvpDateContainer: {alignItems: 'flex-end'},
  dateTextStyle: {
    fontSize: fonts.size.s10,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifRegular,
    color: Colors.rsvpTextColor,
  },
});
