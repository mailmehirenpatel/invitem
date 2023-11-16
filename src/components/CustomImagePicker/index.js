// 3rd Party Imports
import React, {useCallback} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
// Local Imports
import {Strings} from '../../config/strings';
import {imageSelection} from '../../utils';
import styles from './styles';

const CustomImagePicker = ({
  isPickerVisible,
  setPickerVisible,
  setImageSource,
}) => {
  // Close Custom Image Picker Functionality
  const onCloseModal = useCallback(
    () => setPickerVisible(false),
    [setPickerVisible],
  );

  // Image Selection Functionality
  const onImageSelection = useCallback(
    isCamera => () => {
      imageSelection(isCamera)
        .then(res => {
          setImageSource(res.assets[0]);
          setPickerVisible(false);
        })
        .catch(err => {
          console.log('image error ', err);
          setPickerVisible(false);
        });
    },
    [setImageSource, setPickerVisible],
  );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}>
        <Pressable style={styles.modalContainer} onPress={onCloseModal}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.btnContainer}
              onPress={onImageSelection(true)}>
              <Text style={styles.btnText}>{Strings.camera}</Text>
            </Pressable>
            <View style={styles.seperator} />
            <Pressable
              style={styles.btnContainer}
              onPress={onImageSelection(false)}>
              <Text style={styles.btnText}>{Strings.gallery}</Text>
            </Pressable>
            <View style={styles.seperator} />
            <Pressable style={styles.btnContainer} onPress={onCloseModal}>
              <Text style={styles.btnText}>{Strings.cancel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomImagePicker;
