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
  flatListStyle: {
    marginVertical: verticalScale(5),
    marginHorizontal: scale(20),
  },
  contentContainerView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginVertical: verticalScale(20),
    paddingVertical: verticalScale(10),
  },
  renderMainView: {
    marginHorizontal: scale(15),
    marginVertical: verticalScale(10),
  },
  optionVotesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(6),
  },
  selectedOptionText: {
    color: Colors.DarkGreen,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
  },
  votesText: {
    opacity: 0.5,
    color: Colors.DarkGreen,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w500,
    fontSize: fonts.size.s10,
  },
});
