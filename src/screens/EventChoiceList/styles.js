// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  titleStyle: {marginRight: scale(30)},
  separatorView: {
    height: verticalScale(1),
    backgroundColor: Colors.AuthFiledBorder,
    marginBottom: verticalScale(10),
  },
  flatListStyle: {
    marginHorizontal: scale(20),
  },
  renderEventPollMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginTop: verticalScale(10),
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
  optionText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w500,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteView: {
    marginBottom: verticalScale(20),
    marginHorizontal: scale(15),
    flexDirection: 'row-reverse',
  },
  voteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(72),
    height: verticalScale(30),
    backgroundColor: Colors.logoBackgroundColor,
    borderRadius: 5,
  },
  voteText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.White,
  },
  optionImageStyle: {
    height: verticalScale(100),
    width: scale(100),
    resizeMode: 'contain',
    borderRadius: 5,
    marginHorizontal: scale(20),
  },
  inputNote: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    color: Colors.Black,
    borderColor: Colors.Black,
    marginHorizontal: scale(15),
  },
});
