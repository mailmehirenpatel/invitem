// 3rd Party Imports
import {StyleSheet, Platform} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  adminInfoMainView: {
    flex: 1,
    paddingHorizontal: scale(25),
    backgroundColor: Colors.White,
  },
  adminInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    paddingLeft: scale(6),
    paddingRight: scale(20),
    marginTop: verticalScale(14),
    borderBottomColor: Colors.AuthFiledBorder,
  },
  adminInfoSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftItemIconStyle: {
    height: verticalScale(35),
    width: scale(35),
  },
  leftIconContainer: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
  },
  leftIcon: {
    height: verticalScale(16),
    width: scale(16),
  },
  leftTextStyle: {
    marginLeft: scale(11),
    fontFamily: fonts.type.RobotoSerifBold,
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w600,
  },

  nextIconStyle: {width: scale(5), height: verticalScale(10)},

  btnCreateEvent: {
    height: verticalScale(45),
    width: Metrics.screenWidth * 0.85,
    marginHorizontal: scale(10),
    marginTop: verticalScale(100),
    alignSelf: 'center',
    marginBottom: verticalScale(50),
  },
  infoTabDescriptionView: {
    height: Metrics.screenHeight * 0.1,
    width: Metrics.screenWidth * 0.6,
    backgroundColor: Colors.DarkGreen,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    left: scale(115),
    top: Platform.OS === 'android' ? verticalScale(72) : verticalScale(80),
    borderRadius: 10,
  },
  infoTabDescriptionViewText: {
    color: Colors.White,
    fontSize: fonts.size.s12,
    textAlign: 'center',
    paddingBottom: verticalScale(20),
  },
  tipIconStyle: {
    height: scale(20),
    width: scale(20),
    position: 'relative',
    bottom: verticalScale(1),
    right: scale(2),
    alignSelf: 'center',
  },
});
