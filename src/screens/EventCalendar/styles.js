// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  scrollView: {
    backgroundColor: Colors.LightBlueBackground,
  },
  mainView: {
    marginHorizontal: scale(20),
  },
  calendarStyle: {
    backgroundColor: Colors.White,
    marginVertical: verticalScale(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  flatDetailView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(5),
    alignItems: 'center',
    borderRadius: 10,
  },
  calendarIconViewStyle: {
    height: scale(30),
    width: scale(30),
    backgroundColor: Colors.logoBackgroundColor,
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  calendarIcon: {
    height: verticalScale(16),
    width: scale(14.22),
    resizeMode: 'contain',
    tintColor: Colors.White,
  },
  scheduleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w700,
    fontSize: fonts.size.s12,
    color: Colors.DarkGreen,
  },
  scheduleTimeText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s11,
    color: Colors.DarkGreen,
  },
  emptyDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height:
      Platform.OS === 'android'
        ? Metrics.screenHeight - 230
        : Metrics.screenHeight - 200,
  },
});
