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
  titleStyle: {marginRight: scale(35)},
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
    marginBottom: verticalScale(10),
  },
  questionText: {
    marginVertical: verticalScale(15),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },

  optionText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w500,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
    paddingVertical: verticalScale(5),
  },
  checkListOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconContainer: {
    marginRight: scale(12),
  },
  checkIconStyle: {
    height: verticalScale(15),
    width: scale(12),
    tintColor: Colors.Black,
    resizeMode: 'contain',
  },
  createdUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createdProfileImage: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(50),
    resizeMode: 'stretch',
  },
  checkIcon: {
    height: scale(15),
    width: scale(15),
  },
});
