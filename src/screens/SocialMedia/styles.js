// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  leftIcon: {
    height: verticalScale(16),
    width: scale(15.98),
    resizeMode: 'contain',
  },
  titleStyle: {marginRight: scale(30)},
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  mainView: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  socialMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginTop: verticalScale(10),
  },
  separatorView: {
    height: verticalScale(1),
    marginHorizontal: scale(15),
    backgroundColor: Colors.AuthFiledBorder,
  },
  questionText: {
    marginHorizontal: scale(15),
    marginVertical: verticalScale(10),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
  flatListStyle: {
    marginVertical: verticalScale(5),
  },
  socialIconStyle: {
    height: verticalScale(24),
    width: scale(24),
    resizeMode: 'contain',
    marginHorizontal: scale(15),
    marginVertical: verticalScale(15),
  },
  renderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platFormText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
});
