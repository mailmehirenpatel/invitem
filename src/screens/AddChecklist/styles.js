// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  flatListContainer: {marginBottom: verticalScale(20)},
  textInputStyle: {
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s12,
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(20) : verticalScale(10),
    minHeight: verticalScale(50),
    marginLeft: 0,
    maxHeight: verticalScale(50),
  },
  seperator: {
    backgroundColor: Colors.borderColor,
    height: 1,
    marginBottom: verticalScale(5),
  },
  textInputContainerStyle: {
    minHeight: verticalScale(45),
    color: Colors.Transparent,
    borderColor: Colors.Transparent,
    paddingTop: verticalScale(0),
    paddingHorizontal: scale(0),
    marginLeft: 0,
    borderBottomColor: Colors.BorderColor,
    borderBottomWidth: 1,
    marginTop: verticalScale(0),
    marginHorizontal: scale(5),
  },

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

  voteOptionView: {
    marginTop: verticalScale(10),
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

  titleView: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(20),
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

  renderEventPollMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginTop: verticalScale(10),
    marginHorizontal: scale(20),
  },
  questionView: {
    marginHorizontal: scale(15),
    marginBottom: verticalScale(10),
  },
  questionText: {
    marginVertical: verticalScale(15),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
  createdUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  createdUserText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s17,
    color: Colors.DarkGreen,
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  votePollListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addMorePollOption: {
    color: Colors.logoBackgroundColor,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w600,
  },
  checkListOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconStyle: {
    height: verticalScale(15),
    width: scale(12),
    tintColor: Colors.Black,
    marginRight: scale(12),
    resizeMode: 'contain',
  },
  listMemberContainer: {
    backgroundColor: Colors.White,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: scale(5),
    borderColor: Colors.Gray,
    borderWidth: 1,
  },
});
