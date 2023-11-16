// 3rd Party Imports
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// Local Imports
import {Images} from '../../assets';
import ApiConstants from '../../constants/ApiConstants';
import FastImageView from '../FastImageView';
import styles from './styles';

const CustomNavbar = ({
  leftIcon,
  title,
  headerIcon,
  rightIcon,
  rightText,
  profileIcon,
  onRightAction,
  onProfileAction,
  containerStyle,
  titleTextStyle,
  onBackAction,
  leftIconStyles,
  textIconStyle,
  titleHeadingStyle,
}) => {
  // use Navigation for Navigate to Other Screen
  const navigation = useNavigation();
  // GoBack Functionality
  const onBack = useCallback(() => navigation.goBack(), [navigation]);
  // Create StyleSheet Compose File and Use to Other Screen for Styling
  const container = StyleSheet.compose(styles.container, containerStyle);
  const titleText = StyleSheet.compose(styles.titleText, titleTextStyle);
  const textIcon = StyleSheet.compose(styles.textIcon, textIconStyle);
  const mainHeadingContainer = StyleSheet.compose(
    styles.mainHeadingContainer,
    titleHeadingStyle,
  );
  const leftIconStyle = StyleSheet.compose(
    styles.leftIconStyle,
    leftIconStyles,
  );
  const mainContainerStyle = StyleSheet.compose(
    styles.mainContainer,
    profileIcon ? styles.profileHeaderContainer : {},
  );

  // Render rightView Component
  const renderRightView = () => {
    if (rightIcon && profileIcon) {
      return (
        <View style={styles.rightIconContainer}>
          <View>
            {rightIcon?.map((icon, index) => (
              <Pressable
                key={icon}
                onPress={
                  rightIcon.length === 1 ? onRightAction : onRightAction(index)
                }>
                <Image source={icon} style={styles.rightIconStyle} />
              </Pressable>
            ))}
          </View>
          <Pressable onPress={onProfileAction}>
            <FastImageView
              uri={
                typeof profileIcon === 'string'
                  ? `${ApiConstants.ImageBaseUrl}/${profileIcon}`
                  : ''
              }
              style={styles.profileIconStyle}
              defaultSource={Images.profileImage}
            />
            {/* <Image source={profileIcon} style={styles.profileIconStyle} /> */}
          </Pressable>
        </View>
      );
    } else if (rightIcon) {
      return (
        <View style={styles.rightIconContainer}>
          {rightIcon?.map((icon, index) => (
            <Pressable
              key={icon}
              onPress={
                rightIcon.length === 1 ? onRightAction : onRightAction(index)
              }>
              <Image source={icon} style={styles.rightIconStyle} />
            </Pressable>
          ))}
        </View>
      );
    } else if (profileIcon) {
      return (
        <Pressable
          onPress={onProfileAction}
          style={styles.rightProfileIconStyle}>
          <FastImageView
            uri={
              profileIcon ? `${ApiConstants.ImageBaseUrl}/${profileIcon}` : ''
            }
            style={styles.profileIconStyle}
            defaultSource={Images.profileImage}
          />
        </Pressable>
      );
    } else if (rightText) {
      return (
        <Text style={styles.rightText} onPress={onRightAction}>
          {rightText}
        </Text>
      );
    } else {
      return <View style={styles.emptyViewStyle} />;
    }
  };
  return (
    <SafeAreaView style={mainContainerStyle}>
      <View style={container}>
        {leftIcon && (
          <Pressable
            onPress={onBackAction ? onBackAction : onBack}
            style={styles.emptyViewStyle}>
            <Image source={leftIcon} style={leftIconStyle} />
          </Pressable>
        )}
        <View style={mainHeadingContainer}>
          <Text numberOfLines={1} style={titleText}>
            {title}
          </Text>
          {headerIcon && (
            <Pressable onPress={onRightAction}>
              <Image source={headerIcon} style={textIcon} />
            </Pressable>
          )}
        </View>
        {renderRightView()}
      </View>
    </SafeAreaView>
  );
};

export default CustomNavbar;
