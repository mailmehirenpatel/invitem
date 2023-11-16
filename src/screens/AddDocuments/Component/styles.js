// 3rd Party Imports
import {StyleSheet, Platform} from 'react-native';

// LOCAL IMPORTS
import Colors from '../../theme/Colors';
import {
  Metrics,
  verticalScale,
  scale,
  moderateScale,
} from '../../config/metrics';
import fonts from '../../config/fonts';

export default StyleSheet.create({
  documentListContainer: {
    height: Metrics.screenHeight * 0.07,
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginBottom: verticalScale(10),
  },
  documentListData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
  },
  documentListLeftView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DeleteIconContainer: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(13),
    backgroundColor: Colors.RejectedRedColor,
  },
  DeleteIcon: {
    width: scale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    tintColor: Colors.White,
  },
  documentHeadingStyle: {
    fontSize: fonts.size.s10,
    fontFamily: fonts.type.RobotoSerifBlack,
    fontWeight: fonts.weight.w700,
    textAlign: 'center',
    color: Colors.DarkGreen,
    marginLeft: scale(5),
  },
  docIconContainer: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    marginRight: scale(5),
  },
  docIcon: {
    width: scale(18),
    height: verticalScale(18),
    resizeMode: 'contain',
    tintColor: Colors.DarkGreen,
  },
  docIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainEventDocModalContainer: {
    flex: 1,
  },
  crossIconStyle: {
    tintColor: Colors.DarkGreen,
    height: scale(15),
    width: scale(15),
  },
  pdfStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  openDocumentView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainViewContainer: {
    marginBottom: 20,
  },
});
