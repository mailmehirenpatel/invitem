// 3rd Party Imports
import React from 'react';
import {Text, View} from 'react-native';

// Local Imports
import styles from './styles';

const ErrorView = ({error, errorStyle}) => (
  <View style={[styles.errorView, errorStyle]}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);

export default ErrorView;
