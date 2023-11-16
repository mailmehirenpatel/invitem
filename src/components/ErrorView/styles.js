// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  errorView: {
    alignSelf: 'flex-start',
    marginBottom: verticalScale(10),
    width: '100%',
  },
  errorText: {
    fontSize: fonts.size.s14,
    color: Colors.Red,
  },
});
