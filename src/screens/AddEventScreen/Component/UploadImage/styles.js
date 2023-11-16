// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../../../theme/Colors';
import {scale, verticalScale} from '../../../../config/metrics';
import fonts from '../../../../config/fonts';

export default StyleSheet.create({
  mainViewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  mainViewLogoTitle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
    opacity: 0.5,
  },
  uploadImageMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(6),
  },
  defaultImageSourcePath: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w400,
    color: Colors.Placeholder,
    opacity: 0.5,
  },
  imageSourcePath: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
    width: '70%',
  },
  uploadButtonText: {
    fontSize: fonts.size.s12,
    textAlign: 'center',
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifBlack,
  },
  uploadButtonContainer: {
    height: verticalScale(30),
    width: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.DarkGreen,
    borderRadius: 15,
  },
  uploadImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
});
