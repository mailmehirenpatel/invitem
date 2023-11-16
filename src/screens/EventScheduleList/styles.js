// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {
  scale,
  moderateScale,
  verticalScale,
  Metrics,
} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  guestListMainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  guestListContentContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  guestListMainView: {
    marginBottom: verticalScale(10),
  },
  mainGuestListContainer: {
    marginVertical: verticalScale(5),
  },
  subGuestListContainer: {
    flex: 1,
  },
  guestListContainer: {
    marginHorizontal: scale(20),
    borderWidth: 1,
    borderColor: Colors.logoBackgroundColor,
    padding: moderateScale(8),
    marginTop: verticalScale(10),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  guestListContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  guestListImage: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    resizeMode: 'contain',
  },
  guestListText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w500,
    color: Colors.DarkGreen,
    marginLeft: scale(10),
  },
  profileImageStyle: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    resizeMode: 'cover',
  },
  emptyDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    height:
      Platform.OS === 'android'
        ? Metrics.screenHeight - 230
        : Metrics.screenHeight - 200,
  },
  emptyDataText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w500,
    color: Colors.RejectedRedColor,
  },
  guestTextContainer: {
    height: verticalScale(19),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.guestTextBgColor,
    paddingHorizontal: scale(5),
  },
  editIconContainer: {
    alignItems: 'center',
  },
  editIconStyle: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
  },
  deleteIconStyle: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: 'contain',
    tintColor: Colors.Red,
  },
});
