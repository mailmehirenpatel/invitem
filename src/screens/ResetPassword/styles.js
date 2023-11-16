// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  MainScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: scale(20),
  },
  SubContainer: {
    margin: scale(28),
    backgroundColor: Colors.White,
    borderRadius: 15,
    padding: scale(15),
  },
  textInputStyle: {
    color: Colors.logoBackgroundColor,
  },

  btnSignIn: {
    height: verticalScale(45),
    marginVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeading: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s25,
    fontWeight: fonts.weight.w700,
    marginTop: verticalScale(10),
    alignSelf: 'center',
    color: Colors.logoBackgroundColor,
  },
  KeyboardAwareScroll: {flexGrow: 1},
  labelInputStyle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    color: Colors.logoBackgroundColor,
    fontWeight: fonts.weight.w400,
  },
});
