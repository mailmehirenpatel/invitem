// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../../../theme/Colors';
import {
  verticalScale,
  scale,
  Metrics,
  moderateScale,
} from '../../../../config/metrics';
import fonts from '../../../../config/fonts';

export default StyleSheet.create({
  mainContentContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  eventMap: {
    marginTop: verticalScale(15),
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderRadius: 10,
    gap: 10,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapTitleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  mapIcon: {
    width: scale(15),
    height: verticalScale(15),
    resizeMode: 'contain',
    marginRight: scale(10),
    tintColor: Colors.DarkGreen,
  },
  mapStyle: {
    height: Metrics.screenHeight * 0.18,
    borderRadius: 6,
  },
  eventDateView: {
    marginTop: verticalScale(15),
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderRadius: 10,
  },
  dateLabelView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateValueView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
  },
  dateRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '25%',
  },
  dateLabelText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
  dateValueText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  eventGuestView: {
    marginTop: verticalScale(15),
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderRadius: 10,
  },
  eventGuestTitle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
  },
  eventDetailView: {
    marginTop: verticalScale(15),
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderRadius: 10,
    gap: verticalScale(6),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabelText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
  detailValueText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  detailText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  optionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: Colors.White,
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: verticalScale(15),
    // marginBottom: verticalScale(100),
  },
  optionView: {
    width: Metrics.screenWidth * 0.28,
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  optionText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w700,
  },
  optionIcn: {
    width: scale(22),
    height: verticalScale(22),
    resizeMode: 'contain',
  },
  btnSettingView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    backgroundColor: Colors.White,
    position: 'absolute',
    right: scale(20),
    bottom: verticalScale(30),
    shadowColor: Colors.Black,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  btnSettingIcon: {
    width: scale(16),
    height: verticalScale(16),
    resizeMode: 'contain',
  },
  emptyDataView: {
    paddingVertical: verticalScale(10),
  },
  emptyDataText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w700,
    color: Colors.PlaceholderLight,
  },
  viewAllTxtStyle: {
    color: Colors.BlueColor,
    textDecorationLine: 'underline',
    marginRight: scale(30),
  },
});
