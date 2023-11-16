// 3rd Party Imports
import React from 'react';
import {StyleSheet} from 'react-native';

// LOCAL IMPORTS
import {Metrics, scale, verticalScale} from '../../config/metrics';
import Colors from '../../theme/Colors';

export const useStyle = () => {
  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.DimmedBlack,
      },
      modalView: {
        backgroundColor: Colors.BorderColor,
        paddingVertical: verticalScale(20),
        shadowColor: Colors.Black,
        marginHorizontal: scale(40),
        elevation: 20,
        borderRadius: 30,
      },
      messageText: {
        color: Colors.Black,
        textAlign: 'center',
        marginVertical: 20,
      },
      buttonsView: {
        alignSelf: 'center',
      },
      confirmButton: {
        backgroundColor: Colors.DarkGreen,
        height: verticalScale(40),
        width: Metrics.screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      failImageStyle: {
        height: verticalScale(40),
        width: scale(40),
        alignSelf: 'center',
      },
      confirmText: {
        color: Colors.White,
      },
    });
  return React.useMemo(() => styles(), []);
};
