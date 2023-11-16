// THIRD PARTY IMPORTS
import React from 'react';
import {Switch, Platform} from 'react-native';
// LOCAL IMPORTS
import Colors from '../../theme/Colors';
import styles from './styles';

const CustomSwitch = ({onValueChange, isEnabled, disabled = false}) => {
  return (
    <>
      <Switch
        trackColor={{
          false: Colors.BorderColor,
          true: Colors.switchActiveColor,
        }}
        thumbColor={isEnabled && Colors.White}
        disabled={disabled}
        borderColor={Colors.White}
        onValueChange={onValueChange}
        value={isEnabled}
        style={
          Platform.OS === 'android'
            ? styles.customSwitchStyle
            : styles.defaultCustomSwitchStyle
        }
      />
    </>
  );
};

export default CustomSwitch;
