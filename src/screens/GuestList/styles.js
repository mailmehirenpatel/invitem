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
    backgroundColor: Colors.White,
    margin: moderateScale(20),
    borderRadius: 10,
  },
  guestListContainer: {
    marginHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
