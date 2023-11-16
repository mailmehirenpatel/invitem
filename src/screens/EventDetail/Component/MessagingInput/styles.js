// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../../../theme/Colors';
import {verticalScale, scale, Metrics} from '../../../../config/metrics';
import fonts from '../../../../config/fonts';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Metrics.screenWidth,
    alignSelf: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: Colors.White,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    paddingLeft: scale(5),
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.PrimaryLabel,
    minHeight: verticalScale(50),
    maxHeight: verticalScale(100),
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rightIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  sendBtnContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.logoBackgroundColor,
  },
  iconSend: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  // Attachment Modal
  modalContent: {
    backgroundColor: Colors.White,
    borderRadius: 20,
    width: Metrics.screenWidth - 40,
    marginHorizontal: scale(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 20,
    shadowColor: Colors.Gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 4,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  btnText: {
    fontFamily: fonts.type.LatoRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    color: Colors.PrimaryLabel,
  },
  seperator: {
    height: 1,
    backgroundColor: Colors.BorderColor,
  },
});
