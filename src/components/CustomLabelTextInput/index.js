import React, {forwardRef, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import styles from './styles';

const CustomLabelTextInput = forwardRef(
  (
    {
      label,
      isPassword,
      togglePassword,
      showPassImage,
      hidePassImage,
      leftText,
      leftLabelStyle,
      leftIcon,
      leftIconStyle,
      rightIcon,
      error,
      keyboardType,
      multiline,
      numberOfLines,
      editable = true,
      secureTextEntry,
      maxLength,
      value,
      onRightAction,
      inputStyle,
      containerStyle,
      errorTextStyle,
      onChangeText,
      customLabelStyles,
      rightComponent,
      showPasswordImageStyles,
      isFocused,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    // Handle Focus and Blur Functionality
    const handleFocus = () => setFocused(false);
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
            <FloatingLabelInput
              editable={editable}
              ref={ref}
              isFocused={false}
              label={label}
              isPassword={isPassword}
              togglePassword={false}
              customShowPasswordImage={showPassImage}
              customHidePasswordImage={hidePassImage}
              customLabelStyles={customLabelStyles}
              containerStyles={containerStyle}
              inputStyles={inputCompleteStyle}
              autoCapitalize={'none'}
              showPasswordImageStyles={styles.rightIconStyle}
              value={value}
              onChangeText={onChangeText}
              multiline={multiline}
              numberOfLines={numberOfLines}
              keyboardType={keyboardType}
              maxLength={maxLength}
              onFocus={onFocus}
              {...props}
            />
            {rightIcon && (
              <Pressable onPress={onRightAction}>
                <Image style={styles.rightIconStyle} source={rightIcon} />
              </Pressable>
            )}
          </View>
        </View>
        {error && <Text style={errorText}>{error}</Text>}
      </>
    );
  },
);

export default CustomLabelTextInput;
