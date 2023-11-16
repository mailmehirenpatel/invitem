// 3rd Party Imports
import {Dimensions, Platform, StyleSheet} from 'react-native';
// import { Metrics, Colors, moderateScale, verticalScale, Fonts, horizontalScale } from '../../theme';
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  opacityContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  connectionModalView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#00000000',
  },
  modalContainer: {
    backgroundColor: '#8B0000',
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    // fontFamily: Fonts.type.PoppinsSemiBold,
    marginTop: 14,
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 10,
  },
});
export default styles;
