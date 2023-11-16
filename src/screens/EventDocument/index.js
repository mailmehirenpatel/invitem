import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {getDocumentsInfoChirps} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const EventDocument = ({route, navigation}) => {
  const {InfoChirpsDetails} = route.params;
  const [openDocuments, setOpenDocuments] = useState(false);
  const [documentData, setDocumentData] = useState([]);

  const toggleOpenDocuments = useCallback(
    item => {
      // setOpenDocuments(!openDocuments);
      navigation.navigate(NavigationRoutes.DocumentViewer, {
        documentData: item, // data pass through navigation params
      });
    },
    [navigation],
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDocumentsInfoChirps(
        InfoChirpsDetails.eventId,
        InfoChirpsDetails.id,
        result => {
          setDocumentData(result);
        },
      ),
    );
  }, [InfoChirpsDetails.eventId, InfoChirpsDetails.id, dispatch]);

  return (
    <View style={styles.mainDocumentContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.EventDocumentTitle}
      />

      <FlatGrid
        data={documentData}
        style={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        maxItemsPerRow={3}
        itemDimension={100}
        keyExtractor={item => item?.id}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                toggleOpenDocuments(item);
              }}>
              <View style={styles.documentContainer}>
                <Image
                  source={Icons.documentUploadLogo}
                  style={styles.documentIcon}
                />
                <Text style={styles.documentCreatorName}>{item.fileName}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default EventDocument;
