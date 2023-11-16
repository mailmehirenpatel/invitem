// THIRD PARTY IMPORTS
import React from 'react';
import {Image, Modal, Pressable, Text, View} from 'react-native';
// LOCAL IMPORTS
import {Images} from '../../assets';
import {Strings} from '../../config/strings';
import {useStyle} from './styles';

const SuccessPopup = ({isVisible, message = '', handleOk}) => {
  // Add Styling for Success Popup
  const styles = useStyle();

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View>
            <Image
              style={styles.failImageStyle}
              source={Images.image_success}
            />
            <Text style={styles.messageText}>{message}</Text>
          </View>
          <View style={styles.buttonsView}>
            <Pressable style={styles.confirmButton} onPress={handleOk}>
              <Text style={styles.confirmText}>{Strings.Ok}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default SuccessPopup;
