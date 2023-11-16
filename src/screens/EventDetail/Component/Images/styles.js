// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../../../theme/Colors';
import {verticalScale, Metrics, scale} from '../../../../config/metrics';
import fonts from '../../../../config/fonts';

export default StyleSheet.create({
  // Event Image
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
    alignSelf: 'center',
  },
  gridContainer: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(20),
  },
  eventImageView: {
    width: Metrics.screenWidth * 0.5 - 30,
    height: Metrics.screenHeight * 0.18,
    backgroundColor: Colors.White,
    borderRadius: 10,
    margin: 10,
    shadowColor: Colors.Black,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.2,
    elevation: 2,
    marginLeft: scale(15),
  },
  eventImage: {
    width: Metrics.screenWidth * 0.5 - 30,
    height: Metrics.screenHeight * 0.18,
    borderRadius: 10,
  },
  NoImgFoundView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  NoImgFoundTxt: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s18,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
});
