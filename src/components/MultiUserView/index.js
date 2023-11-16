// 3rd Party Imports
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// Local Imports
import {Images} from '../../assets';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import CustomButton from '../CustomButton';
import FastImageView from '../FastImageView';
import styles from './styles';

const MultiUserView = ({listUsers, btnText, onMoreAction, onRightAction}) => {
  // Render More User Functionality
  const renderMoreUserItem = (index, moreCount) => {
    return index === 3 ? (
      <View style={styles.guestMoreView}>
        <Text style={[styles.guestMoreTextStyle]}>{`+${moreCount}`}</Text>
      </View>
    ) : null;
  };

  return (
    <View style={styles.guestRow}>
      <View style={styles.multiGuestRow}>
        {listUsers?.length ? (
          listUsers?.map((e, index) => {
            const imageStyle = StyleSheet.compose(
              styles.guestImageStyle,
              index > 0 ? styles.overlayImageStyle : {},
            );
            const moreCount = listUsers.length - 3;
            return (
              <View key={e.participantId}>
                {index > 2 ? (
                  renderMoreUserItem(index, moreCount)
                ) : (
                  <Pressable onPress={onMoreAction}>
                    <FastImageView
                      uri={
                        e.participantImage
                          ? `${ApiConstants.ImageBaseUrl}/${e.participantImage}`
                          : ''
                      }
                      style={imageStyle}
                      defaultSource={Images.profileImage}
                    />
                  </Pressable>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.EventErrorView}>
            <Text style={styles.EventGuestTextError}>
              {Strings.NoEventGuestFoundError}
            </Text>
          </View>
        )}
      </View>
      <CustomButton
        title={btnText}
        btnStyle={styles.btnViewAll}
        textStyle={styles.viewAllText}
        onPress={onRightAction}
      />
    </View>
  );
};
export default MultiUserView;
