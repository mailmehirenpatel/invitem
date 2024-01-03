import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import {Metrics, scale, verticalScale} from '../../config/metrics';
import fonts from '../../config/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.DimmedBlack,
  },
  modalView: {
    justifyContent: 'center',
    width: '90%',
    backgroundColor: Colors.White,
    paddingVertical: verticalScale(20),
    shadowColor: Colors.Black,
    marginHorizontal: scale(20),
    elevation: 20,
    borderRadius: 20,
  },
  mainDetailView: {
    backgroundColor: Colors.transparentPrimaryLabel,
    borderWidth: 1,
    borderColor: Colors.BtnGrayBackground,
    padding: scale(10),
    borderRadius: scale(10),
    marginHorizontal: scale(15),
    justifyContent: 'center',
    marginVertical: verticalScale(5),
  },
  rsvpTitleText: {
    textAlign: 'center',
    fontFamily: fonts.type.LatoBold,
    fontSize: fonts.size.s17,
    fontWeight: fonts.weight.w700,
    color: Colors.PrimaryLabel,
    marginVertical: verticalScale(5),
  },
  pleaseConfirmText: {
    textAlign: 'center',
    fontFamily: fonts.type.LatoThin,
    fontSize: fonts.size.s15,
    fontWeight: fonts.weight.w600,
    color: Colors.Gray,
  },
  rsvpCloseText: {
    textAlign: 'center',
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s13,
    fontWeight: fonts.weight.w600,
    color: Colors.orangeCircleIcon,
    marginVertical: verticalScale(5),
  },
  buttonsView: {
    alignSelf: 'center',
  },
  viewRSVPButton: {
    backgroundColor: Colors.logoBackgroundColor,
    height: verticalScale(40),
    width: Metrics.screenWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  viewText: {
    color: Colors.White,
  },
});
