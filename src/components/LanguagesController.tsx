import React from 'react';
import {View, StyleSheet} from 'react-native';

const LanguagesController: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 12,
  },
  icon: {marginLeft: 4},
});

export default LanguagesController;
