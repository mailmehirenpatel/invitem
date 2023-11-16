// 3rd Party Imports
import React, {forwardRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// Local Imports
import Colors from '../../theme/Colors';
import styles from './styles';

const CustomTextInput = forwardRef(
  (
    {
      leftIcon,
      leftIconStyle,
      rightIcon,
      error,
      keyboardType,
      multiline,
      numberOfLines,
      editable,
      secureTextEntry,
      maxLength,
      value,
      onRightAction,
      inputStyle,
      containerStyle,
      errorTextStyle,
      onChangeText,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    // Handle Focus and Blur Functionality
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    // Create StyleSheet Compose File and Use to Other Screen for Styling
    const mainContainerStyle = StyleSheet.compose(styles.mainContainer, [
      containerStyle,
      error && styles.errorBorder,
    ]);
    const inputCompleteStyle = StyleSheet.compose(styles.input, [
      inputStyle,
      focused && styles.focusedInput,
    ]);
    const errorText = StyleSheet.compose(styles.errorText, [errorTextStyle]);
    const leftIcnStyle = StyleSheet.compose(styles.leftIcon, leftIconStyle);
    return (
      <>
        <View style={mainContainerStyle}>
          <View style={styles.inputContainer}>
            {leftIcon && <Image style={leftIcnStyle} source={leftIcon} />}
            <TextInput
              ref={ref}
              autoCapitalize={'none'}
              placeholderTextColor={Colors.PlaceholderLight}
              style={inputCompleteStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              onChangeText={onChangeText}
              multiline={multiline}
              numberOfLines={numberOfLines}
              keyboardType={keyboardType}
              maxLength={maxLength}
              editable={editable}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {rightIcon && (
              <Pressable onPress={onRightAction}>
                <Image style={styles.rightIcon} source={rightIcon} />
              </Pressable>
            )}
          </View>
        </View>
        {error && <Text style={errorText}>{error}</Text>}
      </>
    );
  },
);

export default CustomTextInput;
