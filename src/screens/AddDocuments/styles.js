// 3rd Party Imports
import {StyleSheet, Platform} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../theme/Colors';
import {
  Metrics,
  verticalScale,
  scale,
  moderateScale,
} from '../../config/metrics';
import fonts from '../../config/fonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.LightBlueBackground,
  },
  multiImagesBrowseContainer: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.DottedBorder,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
    gap: 8,
  },
  textStyle: {marginRight: scale(50)},
  uploadIcon: {
    width: scale(25),
    height: verticalScale(25),
    resizeMode: 'contain',
  },
  uploadFilesText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    color: Colors.logoBackgroundColor,
  },
  browseText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w500,
    fontSize: fonts.size.s14,
    color: Colors.DottedBorder,
    textDecorationLine: 'underline',
  },
  multiImagesContainer: {
    width: Metrics.screenWidth - 40,
    borderRadius: 10,
    padding: moderateScale(10),
    backgroundColor: Colors.White,
    marginBottom: verticalScale(20),
  },
  imageRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: scale(10),
  },
  imageView: {
    marginRight: scale(10),
    marginVertical: verticalScale(15),
  },
  imgStyle: {
    width: Metrics.screenWidth * 0.18,
    height: verticalScale(70),
    borderRadius: 5,
  },
  crossIconContainer: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: Colors.Red,
    position: 'absolute',
    right: scale(-5),
    top: verticalScale(-5),
  },
  crossIcn: {
    width: scale(8),
    height: verticalScale(8),
  },
  uploadedCountText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
    marginLeft: scale(15),
  },
  documentUploadLogo: {
    height: verticalScale(25),
    width: scale(25),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:
      Platform.OS === 'android' ? verticalScale(12) : verticalScale(20),
  },
  documentUploadLogoStyle: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  documentContainer: {
    height: verticalScale(90),
    width: scale(85),
    backgroundColor: Colors.documentBackgroundColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentHeading: {
    fontSize: fonts.size.s8,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w700,
    textAlign: 'center',
    color: Colors.documentTextColor,
    marginTop: verticalScale(5),
  },
  documentListContainer: {
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginBottom: verticalScale(10),
  },
  documentListData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
  },
  documentListLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DeleteIconContainer: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(13),
    backgroundColor: Colors.RejectedRedColor,
  },
  DeleteIcon: {
    width: scale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    tintColor: Colors.White,
  },
  documentHeadingStyle: {
    fontSize: fonts.size.s10,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w700,
    textAlign: 'left',
    color: Colors.DarkGreen,
    marginLeft: scale(5),
    width: '70%',
  },
  docIconContainer: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    marginRight: scale(5),
  },
  docIcon: {
    width: scale(18),
    height: verticalScale(18),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
  },
  docIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainEventDocModalContainer: {
    flex: 1,
  },
  crossIconStyle: {
    tintColor: Colors.DarkGreen,
    height: scale(15),
    width: scale(15),
  },
  pdfStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  openDocumentView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainViewContainer: {
    marginTop: verticalScale(10),
  },
});
