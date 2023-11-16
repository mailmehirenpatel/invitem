// 3rd Party Imports
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {moderateScale, scale, verticalScale} from '../../config/metrics';
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
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  titleView: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(10),
  },
  flatListVoteTitleView: {
    marginVertical: verticalScale(10),
    marginHorizontal: scale(20),
  },
  voteOptionView: {
    marginHorizontal: scale(20),
  },
  voteOptionUpperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    opacity: 0.3,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w600,
    fontSize: fonts.size.s14,
    color: Colors.DarkGreen,
    marginTop: verticalScale(10),
  },
  textInputStyle: {
    height: verticalScale(30),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    paddingBottom: verticalScale(10),
    color: Colors.DarkGreen,
    marginLeft: scale(0),
    paddingLeft: scale(0),
    marginTop: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.AuthFiledBorder,
  },
  descriptionTextInputStyle: {
    height: verticalScale(60),
    fontFamily: fonts.type.RobotoSerifRegular,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s14,
    paddingBottom: verticalScale(10),
    color: Colors.DarkGreen,
    marginLeft: scale(0),
    paddingLeft: scale(0),
    marginTop: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.AuthFiledBorder,
  },
  textInputContainerStyle: {
    borderColor: Colors.Transparent,
    marginTop: verticalScale(0),
  },
  separatorView: {
    height: verticalScale(1),
    backgroundColor: Colors.AuthFiledBorder,
  },
  flatListMainView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
  },
  mainViewSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  mainViewTimeWithDescription: {
    marginRight: scale(15),
    color: Colors.Black,
    fontWeight: fonts.weight.w400,
    fontSize: fonts.size.s13,
  },
  flatListContainer: {marginBottom: verticalScale(20)},
  rsvpDataContainer: {
    backgroundColor: Colors.White,
    marginTop: moderateScale(10),
    borderRadius: 10,
    marginHorizontal: scale(20),
    padding: moderateScale(5),
  },

  rsvpDataTitle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    paddingLeft: scale(15),
    paddingTop: verticalScale(5),
    flex: 1,
  },
  RSVPDataDescription: {
    color: Colors.EventNoteDescriptionColor,
    fontSize: fonts.size.s12,
    fontWeight: fonts.weight.w400,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    marginHorizontal: scale(10),
    padding: moderateScale(5),
  },
  btnContainerStyle: {
    marginHorizontal: scale(40),
    backgroundColor: Colors.logoBackgroundColor,
    marginVertical: verticalScale(10),
    borderRadius: 10,
  },
  txttitleview: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detailsview: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: scale(5),
  },
  iconThreeDots: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  txtDelete: {color: Colors.Red},
});
