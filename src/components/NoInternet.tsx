// 3rd Party Imports
import React, {createRef, useImperativeHandle, useState} from 'react';
import {Modal, Text, View} from 'react-native';
// Local Imports
import styles from './styles/NoInternetStyles';
// Global No Internet Field References
export const connectionRef: any = createRef();

const NoInternet: React.FC = () => {
  const [isVisible, setVisible] = useState(false);
  // Loader Show and Hide Functionality
  useImperativeHandle(
    connectionRef,
    () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }),
    [],
  );
  return (
    <Modal
      transparent
      animated
      visible={isVisible}
      style={styles.connectionModalView}
      onRequestClose={() => {}}>
      <View style={styles.mainView}>
        <View style={styles.opacityContainer} />
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>No Internet Connection</Text>
        </View>
      </View>
    </Modal>
  );
};
export default NoInternet;
