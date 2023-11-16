// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../../../theme/Colors';
import {verticalScale, scale} from '../../../../config/metrics';
import fonts from '../../../../config/fonts';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(30),
  },
  settingHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
  },
  backIcon: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s20,
    fontWeight: fonts.weight.w700,
    color: Colors.DarkGreen,
  },
  eventSettingItemView: {
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
  },
  leftIcon: {
    height: verticalScale(16),
    width: scale(16),
  },
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
