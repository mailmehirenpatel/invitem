// 3rd Party Imports
import {StyleSheet, Platform} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {
  Metrics,
  scale,
  verticalScale,
  moderateScale,
} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  button: {
    height: moderateScale(60),
    width: Metrics.screenWidth - 40,
    zIndex: 1,
    paddingBottom: verticalScale(6),
    paddingRight: scale(20),
  },
  buttonView: {
    marginHorizontal: scale(5),
  },
  titleText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s16,
    fontWeight: '700',
    color: Colors.Placeholder,
  },
  selectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  },
  placeHolderText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: '600',
    color: Colors.PlaceholderLight,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    width: Metrics.screenWidth - 40,
    minHeight: Metrics.screenHeight * 0.15,
    maxHeight: Metrics.screenHeight * 0.3,
    shadowColor: Colors.BorderColor,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.3,
    elevation: 20,
    borderWidth: 1,
    borderColor: Colors.BorderColor,
    backgroundColor: Colors.White,
    paddingHorizontal: scale(10),
  },
  item: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderColor: Colors.BorderColor,
  },
  itemView: {
    paddingVertical: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.White,
  },
  selectedText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    marginLeft: Platform.OS === 'ios' ? scale(2) : scale(3),
    color: Colors.Black,
  },
  textItem: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s13,
    color: Colors.DarkGreen,
    fontWeight: '600',
  },
  downArrow: {
    width: scale(10),
    height: scale(10),
    tintColor: Colors.DarkGreen,
  },
  errorStyle: {
    marginBottom: 0,
  },
  errorBorder: {
    borderColor: Colors.Red,
  },
});
