// 3rd Party Imports
import React, {useCallback} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
// Local Imports
import {Icons, Images} from '../../../../assets';
import {FastImageView} from '../../../../components';
import ApiConstants from '../../../../constants/ApiConstants';
import {onDownload} from '../../../../utils';
import styles from './styles';

const EventImagePopup = ({isModalVisible, setModalVisible, selectedEvent}) => {
  // Close Image Functionality
  const onClose = useCallback(() => setModalVisible(false), [setModalVisible]);

  return isModalVisible ? (
    <Modal visible={isModalVisible} animationType="none" transparent={true}>
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
          <FastImageView
            style={styles.image}
            defaultSource={Images.EventImagePlaceholder}
            uri={
              selectedEvent.image
                ? `${ApiConstants.ImageBaseUrl}/${selectedEvent.image}`
                : ''
            }
          />
          {/* <Image source={selectedEvent.image} style={styles.image} /> */}
          <View style={styles.bottomRow}>
            <View style={styles.leftView}>
              <Text style={styles.eventTitleText}>
                {selectedEvent.eventName}
              </Text>
              <Text style={styles.eventDescText}>
                {moment(selectedEvent.timestamp).format('MMMM D, h:mma')}
              </Text>
            </View>
            <View style={styles.rightView}>
              {/* <TouchableOpacity onPress={() => ToastInDevelopment()}>
                <Image source={Icons.copy} style={styles.rightIcon} />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={onDownload(
                  `${ApiConstants.ImageBaseUrl}/${selectedEvent.image}`,
                )}>
                <Image source={Icons.download} style={styles.rightIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  ) : null;
};

export default EventImagePopup;
