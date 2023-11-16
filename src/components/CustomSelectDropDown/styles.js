// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  dropDownTextStyle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w400,
  },
  dropDownImageStyle: {
    height: verticalScale(14),
    width: scale(14),
    resizeMode: 'contain',
  },
  dropDownItemStyle: {
    textAlign: 'left',
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w400,
  },
  searchIconStyle: {
    height: verticalScale(14),
    width: scale(14),
    resizeMode: 'contain',
  },
});
