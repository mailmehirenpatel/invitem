// 3rd Party Imports
import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

// Local Imports
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import styles from './styles';

const PrivacyPolicy = () => {
  return (
    <View style={styles.ContentContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.PrivacyPolicy}
      />
      <WebView
        scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        style={styles.webViewStyle}
        source={{uri: ApiConstants.PrivacyPolicyURL}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
    </View>
  );
};

export default PrivacyPolicy;
