// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale, moderateScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  eventNoteDataMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  eventNoteDataContainer: {
    backgroundColor: Colors.White,
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
    borderRadius: 10,
  },
  eventNoteDataTitle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    paddingLeft: scale(15),
    paddingTop: verticalScale(20),
  },
  eventNoteDataDescription: {
    color: Colors.EventNoteDescriptionColor,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    margin: moderateScale(10),
    padding: moderateScale(5),
  },
  navContainerStyle: {
    justifyContent: 'flex-start',
    marginLeft: scale(5),
  },
  titleTextStyle: {
    marginLeft: scale(20),
  },
});
