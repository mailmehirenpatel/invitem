import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import {scale} from '../../config/metrics';

export default StyleSheet.create({
  ContentContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  webViewStyle: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  titleStyle: {marginRight: scale(30)},
});
