// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
    marginBottom: verticalScale(20),
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scale(6),
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  selectedTab: {
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopColor: Colors.Transparent,
    borderLeftColor: Colors.Transparent,
    borderRightColor: Colors.Transparent,
    borderBottomColor: Colors.DarkGreen,
    flex: 0.3,
  },
  selectedText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.DarkGreen,
  },
  unselectedTab: {
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.Transparent,
    flex: 0.3,
  },
  unSelectedText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w500,
    color: Colors.Gray,
  },
});
