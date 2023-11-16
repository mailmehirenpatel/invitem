// Local Imports
import {moderateScale} from './metrics';

// Define Fonts Type
const type = {
  LatoBlack: 'Lato-Black',
  LatoBold: 'Lato-Bold',
  LatoItalic: 'Lato-Italic',
  LatoLight: 'Lato-Light',
  LatoRegular: 'Lato-Regular',
  LatoThin: 'Lato-Thin',
  RobotoSerifBlack: 'RobotoSerif-Black',
  RobotoSerifBold: 'RobotoSerif-Bold',
  RobotoSerifSemiBold: 'RobotoSerif-SemiBold',
  RobotoSerifExtraBold: 'RobotoSerif-ExtraBold',
  RobotoSerifItalic: 'RobotoSerif-Italic',
  RobotoSerifLight: 'RobotoSerif-Light',
  RobotoSerifExtraLight: 'RobotoSerif-ExtraLight',
  RobotoSerifRegular: 'RobotoSerif-Regular',
  RobotoSerifMedium: 'RobotoSerif-Medium',
  RobotoSerifThin: 'RobotoSerif-Thin',
};

// Define Fonts Size
const size = {
  s8: moderateScale(8),
  s10: moderateScale(10),
  s11: moderateScale(11),
  s12: moderateScale(12),
  s13: moderateScale(13),
  s14: moderateScale(14),
  s15: moderateScale(15),
  s16: moderateScale(16),
  s17: moderateScale(17),
  s18: moderateScale(18),
  s20: moderateScale(20),
  s23: moderateScale(23),
  s24: moderateScale(24),
  s25: moderateScale(25),
  s26: moderateScale(26),
  s28: moderateScale(28),
  s30: moderateScale(30),
  s34: moderateScale(34),
};

const weight = {
  w400: '400',
  w500: '500',
  w600: '600',
  w700: '700',
};

// Export
export default {type, size, weight};
