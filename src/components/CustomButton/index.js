// 3rd Party Imports
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

// Local Imports
import styles from './style';

const CustomButton = ({title, btnStyle, textStyle, onPress}) => {
  // Create StyleSheet Compose File and Use to Other Screen for Styling
  const btnContainer = StyleSheet.compose(styles.btnContainer, btnStyle);
  const btnText = StyleSheet.compose(styles.btnText, textStyle);

  return (
    <Pressable style={btnContainer} onPress={onPress}>
      <Text style={btnText}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
