// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {
  Metrics,
  moderateScale,
  scale,
  verticalScale,
} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainDocumentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  documentIcon: {
    height: scale(40),
    width: scale(40),
    resizeMode: 'contain',
  },
  titleStyle: {marginRight: scale(20)},
  documentContainer: {
    backgroundColor: Colors.White,
    marginTop: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.AuthFiledBorder,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(8),
    height: Metrics.screenHeight * 0.17,
    width: Metrics.screenWidth * 0.31,
  },
  documentCreatorName: {
    fontFamily: fonts.type.RobotoSerifBlack,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
    marginTop: verticalScale(10),
  },
  mainEventDocModalContainer: {
    flex: 1,
  },
  crossIcon: {
    tintColor: Colors.DarkGreen,
    height: scale(15),
    width: scale(15),
  },
});
