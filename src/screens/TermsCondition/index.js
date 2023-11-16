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

const TermsCondition = () => {
  return (
    <View style={styles.ContentContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.TermsAndCondition}
      />
      <WebView
        showsVerticalScrollIndicator={false}
        style={styles.webViewStyle}
        source={{uri: ApiConstants.TermsConditionURL}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default TermsCondition;
