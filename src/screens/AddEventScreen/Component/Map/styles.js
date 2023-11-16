// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import {verticalScale, Metrics} from '../../config/metrics';

export default StyleSheet.create({
  mapStyle: {
    height: Metrics.screenHeight * 0.2,
    borderRadius: 5,
    marginBottom: verticalScale(20),
  },
});
