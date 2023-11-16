// THIRD PARTY IMPORTS
import React from 'react';
import {Image, Modal, Pressable, Text, View} from 'react-native';
// LOCAL IMPORTS
import {Images} from '../../assets';
import {Strings} from '../../config/strings';
import {useStyle} from './styles';
const ErrorPopup = ({isError, message = '', handleError}) => {
  // Add Styling for Error Popup
  const styles = useStyle();
  return (
    <Modal animationType="fade" transparent={true} visible={isError}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View>
            <Image
              style={styles.failImageStyle}
              source={Images.image_warning}
            />
            <Text style={styles.messageText}>{message}</Text>
          </View>
          <View style={styles.buttonsView}>
            <Pressable style={styles.confirmButton} onPress={handleError}>
              <Text style={styles.confirmText}>{Strings.Ok}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ErrorPopup;
