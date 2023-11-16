import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import {scale, verticalScale} from '../../config/metrics';
import fonts from '../../config/fonts';

export default StyleSheet.create({
  ContentContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  SubContainer: {
    marginHorizontal: scale(20),
  },
  textInputStyle: {
    color: Colors.textInputStyleColor,
  },

  btnSignIn: {
    height: verticalScale(45),
    marginVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeading: {
    fontSize: fonts.size.s16,
    fontWeight: fonts.weight.w700,
    marginTop: verticalScale(10),
    color: Colors.DarkGreen,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  labelInputStyle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w400,
    marginTop: verticalScale(20),
  },
  titleStyle: {marginRight: scale(30)},
});
