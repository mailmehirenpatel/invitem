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

const AboutUs = () => {
  return (
    <View style={styles.ContentContainer}>
      <CustomNavbar leftIcon={Icons.backArrowIcon} title={Strings.AboutUs} />
      <WebView
        scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        style={styles.webViewStyle}
        source={{uri: ApiConstants.AboutUsURL}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
    </View>
  );
};

export default AboutUs;
