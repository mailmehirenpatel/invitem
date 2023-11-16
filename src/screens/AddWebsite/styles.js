// 3rd Party Imports
import {StyleSheet, Platform} from 'react-native';

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
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  textInputStyle: {
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w400,
    borderBottomColor: Colors.AuthFiledBorder,
    borderBottomWidth: 1,
    marginLeft: 0,
  },
  textInputContainerStyle: {
    height: verticalScale(30),
    color: Colors.Transparent,
    borderColor: Colors.Transparent,
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(30) : verticalScale(30),
    paddingTop: verticalScale(0),
    paddingLeft: scale(0),
    marginVertical: verticalScale(5),
  },
  mainViewTitle: {
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    opacity: 0.3,
    marginVertical: verticalScale(10),
    marginLeft: scale(5),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  mainViewContainer: {
    backgroundColor: Colors.White,
    width: Metrics.screenWidth * 0.9,
    borderRadius: 10,
    paddingLeft: scale(20),
    marginTop:
      Platform.OS === 'android' ? verticalScale(10) : verticalScale(20),
    marginHorizontal: scale(20),
  },
  flatListStyle: {
    backgroundColor: Colors.LightBlueBackground,
    marginHorizontal: scale(20),
    borderRadius: 10,
  },

  iconThreeDots: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: scale(5),
  },

  webLinkDataContainer: {
    backgroundColor: Colors.White,
    marginTop: verticalScale(10),
    borderRadius: 10,
    padding: moderateScale(10),
  },
  txtTitleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  webLinkDataTitle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    paddingLeft: scale(15),
    paddingTop: verticalScale(5),
  },
  webLinkTitleStringStyle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    marginHorizontal: scale(10),
    padding: moderateScale(5),
  },
  txtEdit: {color: Colors.Gray},
  txtDelete: {color: Colors.Red},

  webLinkStringStyle: {
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
  deleteIconStyle: {
    width: scale(21),
    height: verticalScale(21),
    resizeMode: 'contain',
    tintColor: Colors.Red,
  },
});
