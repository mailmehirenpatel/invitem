// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {
  Metrics,
  scale,
  verticalScale,
  moderateScale,
} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flexGrow: 1,
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
    borderRadius: verticalScale(6),
    marginVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    gap: verticalScale(8),
  },
  uploadIcon: {
    width: scale(28),
    height: verticalScale(28),
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
  eventImagesContainer: {
    borderRadius: 10,
    padding: moderateScale(20),
    backgroundColor: Colors.White,
  },
  imageRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imageView: {},
  imgStyle: {
    width: Metrics.screenWidth - 80,
    height: Metrics.screenHeight * 0.55,
    borderRadius: 10,
  },
  crossIconContainer: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.Red,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  crossIcn: {
    width: scale(12),
    height: verticalScale(12),
  },
  uploadedCountText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
});
