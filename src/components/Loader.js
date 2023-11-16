// 3rd Party Imports
import React, {createRef, useImperativeHandle, useState} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
// Local Imports
import styles from './styles/LoaderStyle';
import Colors from '../theme/Colors';
// Global Loader Field References
export const loaderRef = createRef();

const Loader = () => {
  const [isVisible, setVisible] = useState(false);
  // Loader Show and Hide Functionality
  useImperativeHandle(
    loaderRef,
    () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }),
    [],
  );
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalSubView}>
          <ActivityIndicator size={'large'} color={Colors.White} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
