// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../../../config/fonts';
import {
  Metrics,
  moderateScale,
  scale,
  verticalScale,
} from '../../../../config/metrics';
import Colors from '../../../../theme/Colors';

export default StyleSheet.create({
  KeyboardAvoidingView: {flex: 1},
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.White,
    marginBottom: verticalScale(20),
  },
  chatMessageContainer: {
    flex: 1,
    backgroundColor: Colors.LightBlueBackground,
    width: Metrics.screenWidth,
    paddingHorizontal: scale(20),
    alignSelf: 'center',
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  messageWrapperRight: {
    alignSelf: 'flex-end',
  },
  profileIcn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
    alignSelf: 'flex-start',
  },
  messageRightView: {gap: 5},
  messageView: {
    backgroundColor: Colors.White,
    padding: 10,
    width: 'auto',
    borderRadius: 10,
    gap: 5,
  },
  messageViewRight: {
    backgroundColor: Colors.BTNLiteGreen,
  },
  nameText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w500,
    color: Colors.DarkGreen,
  },
  messageText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
  },
  timeText: {
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s10,
    fontWeight: fonts.weight.w400,
    color: Colors.DarkGreen,
    alignSelf: 'flex-end',
  },
  ChatIsEmpty: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  rightIcon: {
    width: scale(21),
    height: scale(21),
    resizeMode: 'contain',
    marginRight: scale(8),
  },
  iconSend: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  sendContainer: {
    justifyContent: 'center',
    height: '100%',
    marginRight: scale(10),
  },
  sendBtnContainer: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(17.5),
    backgroundColor: Colors.logoBackgroundColor,
  },
  mainChatView: {flex: 1},
  renderSendView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStyle: {
    height: scale(35),
    width: scale(35),
    borderRadius: scale(17.5),
    resizeMode: 'cover',
  },
  renderChatFooterView: {
    shadowColor: Colors.blueCircleIcon,
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: moderateScale(5),
    backgroundColor: Colors.logoBackgroundColor,
  },
  renderChatFooterImage: {
    height: verticalScale(85),
    width: scale(85),
    borderRadius: 5,
  },
  CloseIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: 66,
    top: -4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  txtX: {
    fontSize: fonts.size.s18,
    fontWeight: fonts.weight.w700,
    color: Colors.Gray,
    fontFamily: fonts.type.RobotoSerifRegular,
  },
  chatImageStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(5),
    height: verticalScale(90),
    width: scale(140),
    resizeMode: 'cover',
    borderRadius: 10,
    margin: moderateScale(5),
  },
});
