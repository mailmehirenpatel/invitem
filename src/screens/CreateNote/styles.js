// 3rd Party Imports
import {Platform, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import fonts from '../../config/fonts';
import {moderateScale, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  mainEventContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: scale(25),
    backgroundColor: Colors.LightBlueBackground,
  },
  mainViewContainer: {
    marginTop: Platform.OS === 'android' ? verticalScale(10) : verticalScale(5),
    paddingHorizontal: scale(20),
    borderRadius: 20,
    backgroundColor: Colors.White,
  },
  flatListContainer: {marginBottom: verticalScale(20)},
  textInputStyle: {
    fontSize: fonts.size.s12,
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(30) : verticalScale(10),
  },
  textInputContainerStyle: {
    height: verticalScale(30),
    color: Colors.Transparent,
    borderColor: Colors.Transparent,
    paddingTop: verticalScale(0),
    paddingHorizontal: scale(0),
    marginBottom: verticalScale(5),
  },
  textInputDescriptionStyle: {
    fontSize: fonts.size.s12,
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(30) : verticalScale(10),
    minHeight: verticalScale(50),
    maxHeight: verticalScale(80),
  },
  textInputContainerDescriptionStyle: {
    minHeight: verticalScale(45),
    color: Colors.Transparent,
    borderColor: Colors.Transparent,
    paddingTop: verticalScale(0),
    paddingHorizontal: scale(0),
  },
  seperator: {
    backgroundColor: Colors.borderColor,
    height: 1,
    marginBottom: verticalScale(5),
  },
  mainViewTitle: {
    color: Colors.DarkGreen,
    fontWeight: fonts.weight.w700,
    fontFamily: fonts.type.RobotoSerifRegular,
    fontSize: fonts.size.s14,
    opacity: 0.3,
    paddingTop: verticalScale(20),
  },
  eventNoteDataContainer: {
    backgroundColor: Colors.White,
    marginTop: verticalScale(10),
    borderRadius: 10,
  },
  eventNoteDataTitle: {
    color: Colors.DarkGreen,
    fontSize: fonts.size.s14,
    fontWeight: fonts.weight.w600,
    fontFamily: fonts.type.RobotoSerifBlack,
    textAlign: 'auto',
    paddingLeft: scale(15),
    paddingTop: verticalScale(5),
  },
  eventNoteDataDescription: {
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
  txtEdit: {color: Colors.Black},
  txtDelete: {color: Colors.Red},
});
