// 3rd Party Imports
import {StyleSheet} from 'react-native';

// Local Imports
import {verticalScale} from './metrics';
import fonts from './fonts';
import Colors from '../theme/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  verticalSpace: {
    height: verticalScale(20),
  },
  dropDownContainer: {
    marginTop: verticalScale(10),
  },
  labelStyle: {
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s16,
    fontWeight: '700',
    color: Colors.Placeholder,
  },
  datePickerContainer: {
    marginTop: verticalScale(10),
  },
  inputText: {
    color: Colors.Black,
  },
});
