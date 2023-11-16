// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.logoBackgroundColor,
    height: verticalScale(45),
    borderColor: Colors.logoBackgroundColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.White,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: fonts.size.s16,
  },

  shoppingCartIcon: {
    height: verticalScale(20),
    width: scale(20),
    tintColor: Colors.White,
    top: verticalScale(9),
    alignSelf: 'center',
    right: Metrics.screenWidth * 0.12,
  },
});
