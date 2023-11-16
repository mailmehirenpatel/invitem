// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.TransparentBlack,
  },
  modalContent: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    width: Metrics.screenWidth,
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(15),
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    paddingVertical: verticalScale(20),
  },
  btnText: {
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s14,
    fontWeight: '600',
    color: Colors.PrimaryLabel,
  },
  seperator: {
    height: 1,
    backgroundColor: Colors.BorderColor,
  },
});
