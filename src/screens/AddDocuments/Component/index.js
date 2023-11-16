// 3rd Party Imports
import React, {useState} from 'react';
import {View} from 'react-native';
import Pdf from 'react-native-pdf';

// Local Imports
import {CustomNavbar} from '../../../components';
import {Icons} from '../../../assets';
import ApiConstants from '../../../constants/ApiConstants';
import styles from '../styles';
import {loaderRef} from '../../../components/Loader';

const DocumentViewer = ({route}) => {
  const documentData = route.params; // value through navigation params
  const [pdfLoading, setPdfLoading] = useState(true);
  return (
    <View style={styles.openDocumentView}>
      <View style={styles.mainEventDocModalContainer}>
        <CustomNavbar
          leftIcon={Icons.crossIcn}
          leftIconStyles={styles.crossIconStyle}
          title={documentData?.documentData?.fileName}
        />
        <Pdf
          source={{
            uri: `${ApiConstants.ImageBaseUrl}/${documentData.documentData.path}`,
          }}
          trustAllCerts={false}
          style={styles.pdfStyle}
          onLoadComplete={() => {
            setPdfLoading(false);
            loaderRef.current.hide();
          }}
          onPageChanged={() => {
            setPdfLoading(false);
            loaderRef.current.hide();
          }}
          onError={error => {
            console.log('error', error);
          }}
          renderActivityIndicator={() => {
            if (pdfLoading) {
              loaderRef.current.show();
            } else {
              loaderRef.current.hide();
            }
          }}
        />
      </View>
    </View>
  );
};

export default DocumentViewer;
