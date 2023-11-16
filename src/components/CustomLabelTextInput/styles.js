// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    borderRadius: 4,
    paddingHorizontal: scale(15),
    marginTop: verticalScale(15),
    borderWidth: 0.5,
    borderColor: Colors.AuthFiledBorder,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorBorder: {
    borderColor: Colors.Red,
  },
  focusedLabel: {
    color: Colors.Green,
  },
  errorLabel: {
    color: Colors.Red,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: verticalScale(0),
    paddingLeft: scale(5),
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.PrimaryLabel,
    height: scale(55),
    marginLeft: scale(5),
  },
  focusedInput: {
    borderColor: Colors.BlueColor,
  },
  rightIconStyle: {
    height: scale(17),
    width: scale(17),
    resizeMode: 'contain',
    tintColor: Colors.logoBackgroundColor,
    marginRight: scale(10),
  },
  leftIcon: {
    height: scale(15),
    width: scale(15),
    resizeMode: 'contain',
    tintColor: Colors.logoBackgroundColor,
  },

  errorText: {
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s14,
    color: Colors.Red,
    marginTop: verticalScale(10),
  },
  passwordIcon: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
  },
  rightButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
