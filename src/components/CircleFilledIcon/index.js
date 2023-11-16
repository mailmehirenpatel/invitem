// 3rd Party Imports
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

// Local Imports
import styles from './styles';

const CircleFilledIcon = ({icon, containerStyle, iconStyle, onPress}) => {
  // Create StyleSheet Compose File and Use to Other Screen for Styling
  const iconContainer = StyleSheet.compose(
    styles.iconContainer,
    containerStyle,
  );
  const iconCompleteStyle = StyleSheet.compose(styles.centerIcn, iconStyle);

  return onPress ? (
    <Pressable style={iconContainer} onPress={onPress}>
      <Image style={iconCompleteStyle} source={icon} />
    </Pressable>
  ) : (
    <View style={iconContainer}>
      <Image style={iconCompleteStyle} source={icon} />
    </View>
  );
};

export default CircleFilledIcon;
