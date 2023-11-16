// 3rd Party Imports
import React from 'react';
import {StyleSheet, View} from 'react-native';

// Local Imports
import {Images} from '../../assets';
import ApiConstants from '../../constants/ApiConstants';
import FastImageView from '../FastImageView';
import styles from './styles';

const CustomProfileImage = ({image, containerStyle, imageStyle}) => {
  const imageCompleteStyle = StyleSheet.compose(
    styles.imageCompleteStyle,
    imageStyle,
  );
  return (
    <View style={styles.imageProfileContainer}>
      <FastImageView
        style={imageCompleteStyle}
        defaultSource={Images.profileImage}
        uri={image ? `${ApiConstants.ImageBaseUrl}/${image}` : ''}
      />
    </View>
  );
};

export default CustomProfileImage;
