// 3rd Party Imports
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
// Local Imports
import {Icons} from '../../assets';
import styles from './styles';

const SearchTextInput = ({
  placeholder,
  onChangeText,
  value,
  placeholderTextColor,
  containerStyle,
  iconStyle,
  textInputStyle,
  onSubmitEditing,
}) => {
  // Create StyleSheet Compose File and Use to Other Screen for Styling
  const searchInputStyle = StyleSheet.compose(
    styles.searchInputStyle,
    textInputStyle,
  );
  return (
    <View style={[styles.searchContainerStyle, containerStyle]}>
      <Image source={Icons.searchIcon} style={[styles.iconStyle, iconStyle]} />
      <TextInput
        style={searchInputStyle}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SearchTextInput;
