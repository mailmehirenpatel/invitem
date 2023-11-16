// 3rd Party Imports
import {StyleSheet} from 'react-native';

// Local Imports
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';
import fonts from '../../config/fonts';
import appStyles from '../../config/appStyles';

export default StyleSheet.create({
  ...appStyles,
  datePickerContainer: {
    height: verticalScale(10),
    borderWidth: 0,
    borderColor: Colors.Transparent,
    borderBottomColor: Colors.BorderColor,
    marginTop: verticalScale(10),
  },
  dateLabelText: {
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s16,
    fontWeight: '700',
    color: Colors.Placeholder,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  placeholderText: {
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s14,
    fontWeight: '600',
    color: Colors.PlaceholderLight,
  },
  dateText: {
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s14,
    fontWeight: '600',
    color: Colors.Black,
  },
  calendarIconContainer: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.logoBackgroundColor,
    marginBottom: verticalScale(30),
  },
  dateIcon: {
    width: scale(16),
    height: verticalScale(16),
    resizeMode: 'contain',
    tintColor: Colors.White,
  },
});
