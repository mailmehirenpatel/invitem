// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  profileMainContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
  },
  profileDetailContainer: {
    margin: scale(20),
    padding: 10,
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  profileSettingItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.AuthFiledBorder,
  },
  itemLeftView: {
    flexDirection: 'row',
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
    resizeMode: 'contain',
  },
  leftIcon: {
    height: verticalScale(16),
    width: scale(16),
  },
  settingTextStyle: {marginRight: scale(30)},
  itemText: {
    marginLeft: scale(11),
    fontFamily: fonts.type.RobotoSerifBold,
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w600,
  },
  rightIcon: {
    width: scale(5),
    height: verticalScale(10),
  },
});
