// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  searchInputStyle: {
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: verticalScale(0),
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s15,
    fontWeight: '600',
    color: Colors.searchPlaceholder,
  },
  searchContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    height: verticalScale(30),
    borderRadius: 20,
  },
  iconStyle: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    marginLeft: scale(10),
  },
});
