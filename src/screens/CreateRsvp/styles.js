// 3rd Party Imports

import {StyleSheet} from 'react-native';
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  adminInfoMainView: {
    flex: 1,
    paddingHorizontal: scale(25),
    backgroundColor: Colors.White,
  },
  eventDateContainer: {
    borderBottomColor: Colors.AuthFiledBorder,
    marginVertical: verticalScale(5),
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainViewTimeWithDescription: {
    marginRight: scale(15),
    marginVertical: verticalScale(5),
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  eventLabelText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
    opacity: 0.5,
    marginTop: verticalScale(5),
  },
  eventDateLabelRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  dropdownContainer: {
    backgroundColor: Colors.White,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: scale(5),
    borderColor: Colors.borderColor,
    borderWidth: 1,
    marginVertical: verticalScale(5),
  },
  btnContainerStyle: {
    marginHorizontal: scale(25),
    marginBottom: verticalScale(20),
    marginVertical: verticalScale(10),
  },
  addLocationIcon: {
    height: scale(14),
    width: scale(14),
    tintColor: Colors.White,
    resizeMode: 'contain',
  },
  addLocationIconContainer: {
    height: scale(30),
    width: scale(30),
    backgroundColor: Colors.logoBackgroundColor,
    borderRadius: scale(15),
  },
  locationViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(5),
  },
  addLocationEventLable: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
    opacity: 0.5,
  },
  mapStyle: {
    height: Metrics.screenHeight * 0.2,
    borderRadius: 5,
    marginVertical: verticalScale(10),
  },
});
