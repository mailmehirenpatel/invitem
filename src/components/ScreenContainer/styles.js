// 3rd Party Imports
import {StyleSheet, StatusBar} from 'react-native';

// LOCAL IMPORTS
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.logoBackgroundColor,
  },
  mainContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  footerArea: {
    backgroundColor: Colors.Transparent,
  },
  appBackgroundStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBackground: {
    flex: 0.37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImageContainer: {
    height: verticalScale(120),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarImage: {
    height: Metrics.screenHeight * 0.14,
    width: Metrics.screenHeight * 0.14,
    borderRadius: (Metrics.screenHeight * 0.14) / 2,
  },
  defaultAvatarImage: {
    height: Metrics.screenHeight * 0.14,
    width: Metrics.screenHeight * 0.14,
    resizeMode: 'contain',
  },
  CameraIconContainer: {
    backgroundColor: Colors.White,
    height: verticalScale(40),
    width: scale(40),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: Colors.Grey,
    elevation: 2,
  },
  CameraIconStyle: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    position: 'absolute',
  },
  CenterImage: {
    width: Metrics.screenWidth * 0.19,
    height: Metrics.screenHeight * 0.19,
    resizeMode: 'contain',
  },
  imgBackgroundImage: {resizeMode: 'stretch'},
  renderContent: {flex: 0.7},
});
