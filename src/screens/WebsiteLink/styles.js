// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale, moderateScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  websiteLinkMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  webLinkDataContainer: {
    backgroundColor: Colors.White,
    marginTop: verticalScale(10),
    borderRadius: 10,
    padding: moderateScale(10),
    marginHorizontal: moderateScale(20),
  },
  txtTitleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleTextStyle: {marginRight: scale(20)},
  webLinkDataTitle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    paddingLeft: scale(15),
    paddingTop: verticalScale(5),
  },
  txtEdit: {color: Colors.Gray},
  txtDelete: {color: Colors.Red},
  webLinkTitleStringStyle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    marginHorizontal: scale(10),
    padding: moderateScale(5),
  },
  webLinkStyle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    paddingLeft: scale(15),
    paddingTop: verticalScale(5),
  },
  websiteLinksStyle: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    marginHorizontal: scale(10),
    padding: moderateScale(5),
    textDecorationLine: 'underline',
  },
});
