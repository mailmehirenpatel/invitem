// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(6),
  },
  multiGuestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  EventErrorView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  guestImageStyle: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    resizeMode: 'cover',
    borderWidth: 0.4,
    borderColor: Colors.DarkGreen,
  },
  guestMoreView: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.DarkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(-10),
  },
  guestMoreTextStyle: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w600,
    color: Colors.White,
  },
  overlayImageStyle: {
    marginLeft: scale(-10),
  },
  btnViewAll: {
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.DarkGreen,
    borderRadius: 15,
    paddingHorizontal: scale(15),
    alignSelf: 'flex-end',
  },
  viewAllText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
  extraMargin: {
    marginLeft: scale(5),
  },
  EventGuestTextError: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w700,
    color: Colors.PlaceholderLight,
  },
});
