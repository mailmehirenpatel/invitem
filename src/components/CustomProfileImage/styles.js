// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import {scale} from '../../config/metrics';

export default StyleSheet.create({
  imageProfileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCompleteStyle: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    resizeMode: 'contain',
  },
});
