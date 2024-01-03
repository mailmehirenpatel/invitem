// 3rd Party Imports
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
  },
  modalSubView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: verticalScale(80),
    width: scale(80),
    backgroundColor: Colors.White,
  },
});
export default styles;
