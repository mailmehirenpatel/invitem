// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../../../theme/Colors';
import {verticalScale, scale, Metrics} from '../../../../config/metrics';
import fonts from '../../../../config/fonts';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.TransparentBlack,
    paddingTop: Metrics.screenHeight * 0.12,
    width: Metrics.screenWidth,
  },
  modalContent: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.White,
  },
  image: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight * 0.2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    padding: 10,
  },
  leftView: {
    gap: 2,
  },
  eventTitleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
  eventDescText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s10,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  rightIcon: {
    width: scale(16),
    height: verticalScale(16),
    resizeMode: 'contain',
  },
});
