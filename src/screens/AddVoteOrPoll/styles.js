// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  flatListContainer: {marginBottom: verticalScale(20)},
  mainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
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

  titleText: {
    opacity: 0.3,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginLeft: scale(5),
  },

  textInputStyle: {
    height: verticalScale(30),
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
    marginVertical: verticalScale(10),
    flex: 1,
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
    marginLeft: scale(2),
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
  },
  optionFlatListStyle: {marginTop: verticalScale(20)},
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
  selectPollOptionImageContainer: {flexDirection: 'row', alignItems: 'center'},
  selectedPollImage: {
    height: verticalScale(80),
    width: scale(80),
    resizeMode: 'contain',
    margin: scale(5),
    borderRadius: 5,
  },
  renderEventPollMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginTop: verticalScale(20),
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
  },
});
