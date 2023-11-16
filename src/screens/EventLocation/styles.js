// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {Metrics, scale, verticalScale} from '../../config/metrics';
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
  mainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  bottomSearchView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.TransparentBlack,
  },

  mapStyle: {
    height: Metrics.screenHeight * 0.8,
    marginBottom: verticalScale(20),
  },
  searchContainerStyle: {
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(10),
    height: Metrics.screenHeight * 0.05,
    borderColor: Colors.AuthFiledBorder,
    borderWidth: 0.5,
  },
  searchIcon: {
    height: verticalScale(18),
    width: scale(18),
    resizeMode: 'contain',
    marginHorizontal: scale(15),
  },
  textInput: {
    width: Metrics.screenWidth * 0.6,
  },
  cancelBtn: {
    backgroundColor: Colors.Transparent,
  },
  btnText: {
    color: Colors.LinkColor,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s15,
  },
  imgBgStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(50),
    width: scale(50),
  },
  imageBgImgStyle: {
    tintColor: Colors.LinkColor,
    resizeMode: 'contain',
  },
  eventPinIcon: {
    marginBottom: verticalScale(7),
    height: verticalScale(28),
    width: scale(28),
    resizeMode: 'contain',
    borderRadius: 20,
  },
});
