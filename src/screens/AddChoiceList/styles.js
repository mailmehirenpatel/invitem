// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

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
  container: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  mainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  choiceOptionView: {
    marginHorizontal: scale(20),
  },
  choiceOptionUpperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatListChoiceOptionUpperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  addIconStyle: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: 'contain',
  },
  titleText: {
    opacity: 0.3,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginTop: verticalScale(10),
    marginLeft: scale(5),
  },
  docTitleText: {
    opacity: 0.3,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginVertical: verticalScale(10),
  },
  textInputStyle: {
    height: verticalScale(40),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    paddingBottom: verticalScale(10),
    color: Colors.DarkGreen,
    borderBottomWidth: 1,
    borderBottomColor: Colors.AuthFiledBorder,
    marginLeft: 0,
    textAlignVertical: 'top',
  },
  textInputContainerStyle: {
    borderColor: Colors.Transparent,
    paddingHorizontal: scale(2),
    marginVertical: verticalScale(0),
    marginLeft: 0,
  },
  addMoreBtn: {
    marginHorizontal: scale(20),
  },
  separatorView: {
    height: verticalScale(1),
    backgroundColor: Colors.AuthFiledBorder,
    marginVertical: verticalScale(5),
  },
  optionText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginVertical: verticalScale(5),
    marginHorizontal: scale(15),
  },
  flatListAddedOptionsView: {
    marginVertical: verticalScale(5),
    justifyContent: 'space-between',
  },
  addedOptionsView: {
    marginVertical: verticalScale(5),
  },
  flatListMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
  },
  deleteBtn: {
    flexDirection: 'row-reverse',
    marginVertical: verticalScale(15),
  },
  deleteText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w500,
    fontSize: fonts.size.s12,
    color: Colors.Red,
  },
  multiImagesBrowseContainer: {
    height: Metrics.screenHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.DottedBorder,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: verticalScale(20),
    marginHorizontal: scale(20),
    gap: verticalScale(8),
    backgroundColor: `${Colors.DottedBorder}10`,
  },
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
  imagesContainer: {
    width: Metrics.screenWidth - 40,
    borderRadius: 10,
    padding: moderateScale(10),
    backgroundColor: Colors.White,
  },
  imageRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: scale(10),
  },
  uploadedCountText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
    marginLeft: scale(15),
  },
  imageView: {
    marginRight: scale(10),
    marginVertical: verticalScale(15),
  },
  documentContainer: {
    height: verticalScale(80),
    width: scale(65),
    backgroundColor: Colors.documentBackgroundColor,
    borderRadius: 5,
  },
  documentUploadLogo: {
    height: verticalScale(25),
    width: scale(25),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:
      Platform.OS === 'android' ? verticalScale(12) : verticalScale(20),
  },
  documentHeading: {
    fontSize: fonts.size.s10,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w700,
    textAlign: 'center',
    color: Colors.documentTextColor,
    marginTop: verticalScale(5),
  },
  crossIconContainer: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: Colors.Red,
    position: 'absolute',
    left: scale(55),
    bottom: verticalScale(70),
  },
  crossIcn: {
    width: scale(8),
    height: verticalScale(8),
    resizeMode: 'contain',
  },
  voteTitleView: {
    marginTop: verticalScale(10),
    marginHorizontal: scale(20),
  },

  flatListVoteTitleView: {
    marginVertical: verticalScale(10),
    marginHorizontal: scale(20),
  },

  voteOptionView: {
    marginHorizontal: scale(20),
  },

  voteOptionUpperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionTitleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginVertical: verticalScale(5),
    marginLeft: scale(12),
  },

  addImageStyle: {
    height: verticalScale(30),
    width: scale(30),
    tintColor: Colors.logoBackgroundColor,
  },

  titleView: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(20),
  },

  mainViewSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
  },

  mainViewTimeWithDescription: {
    marginRight: scale(15),
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
  },

  optionListContainer: {
    flexDirection: 'row',
    padding: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray,
    marginVertical: verticalScale(5),
  },
  deleteOptionList: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  deleteIconStyle: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: 'contain',
    tintColor: Colors.Red,
  },
  addPollOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectPollOptionImageContainer: {alignItems: 'center'},
  selectedPollImage: {
    height: verticalScale(80),
    width: scale(80),
    resizeMode: 'contain',
    margin: scale(5),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(20),
  },
  renderEventPollMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginTop: verticalScale(10),
    marginHorizontal: scale(20),
  },
  questionView: {
    marginHorizontal: scale(15),
  },
  questionText: {
    marginVertical: verticalScale(15),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
  radioIconStyle: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: 'contain',
    marginHorizontal: scale(15),
    marginVertical: verticalScale(10),
  },

  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionImageStyle: {
    height: verticalScale(100),
    width: scale(100),
    resizeMode: 'contain',
    borderRadius: 5,
    marginHorizontal: scale(10),
  },

  votePollListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerStyle: {marginTop: 0},
  addMorePollOption: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w600,
    marginTop: verticalScale(10),
  },
  choiceOptionContainer: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
  },
});
