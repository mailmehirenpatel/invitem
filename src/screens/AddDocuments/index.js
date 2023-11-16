// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Image, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CustomNavbar, CircleFilledIcon} from '../../components';
import {Strings} from '../../config/strings';
import {documentSelection} from '../../utils';
import styles from './styles';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddDocumentInfoChirps,
  DeleteDocumentInfoChirps,
  getDocumentsInfoChirps,
  getEventInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import {uploadDocumentRequest} from '../../store/actions/profileActions';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';

const AddDocument = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [selectedDocument, setSelectedDocument] = useState('');
  const {eventObjectData} = useSelector(state => state.event); // Value Get Through UseSelector
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps); // get event data through id
  const {InfoChirpsId} = route.params || {}; // Data get through navigation params

  const DocumentData = EventInfoChirpsData.find(
    i => i.name === 'add document', // find through display name
  );

  // Api call for get Documents InfoChirps
  useEffect(() => {
    DocumentData &&
      dispatch(
        getDocumentsInfoChirps(eventObjectData.id, DocumentData?.id, result => {
          result && setDocumentList(result);
        }),
      );
  }, [DocumentData, dispatch, eventObjectData?.id]);

  const [documentList, setDocumentList] = useState([]);

  // Document Selection Functionality and set value State
  const onBrowse = useCallback(() => {
    documentSelection(false).then(res => {
      setSelectedDocument([...res]);
    });
  }, []);

  // Remove Documents one by one
  const onRemoveDocuments = useCallback(
    Document => () => {
      const index = selectedDocument.indexOf(Document);
      if (index !== -1) {
        selectedDocument.splice(index, 1);
        setSelectedDocument([...selectedDocument]);
      }
    },
    [selectedDocument],
  );

  // Api call for add documents InfoChirps
  const onAddDocuments = useCallback(() => {
    let UploadedDocUrl = '';
    let DocumentRequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      documentModel: [
        {
          fileName: selectedDocument[0]?.name,
          path: UploadedDocUrl,
        },
      ],
    };

    dispatch(
      uploadDocumentRequest(
        selectedDocument[0], // Selected Document through index
        AppConstants.fileDriveName.EventDocumentInfoChirps,
        (isUploaded, data) => {
          if (isUploaded) {
            console.log('data[0].fileUrl  --> ', data);
            UploadedDocUrl = data[0].fileUrl;

            dispatch(
              AddDocumentInfoChirps(
                {
                  ...DocumentRequestData,
                  documentModel: DocumentRequestData.documentModel.map(i => {
                    return {...i, path: data[0].fileUrl};
                  }),
                },
                (isSuccess, {message}) => {
                  if (isSuccess) {
                    DocumentData &&
                      dispatch(
                        getDocumentsInfoChirps(
                          eventObjectData.id,
                          DocumentData?.id,
                          result => {
                            result && setDocumentList(result);
                          },
                        ),
                      );

                    setSelectedDocument('');
                    ToastSuccess(message);
                    dispatch(getEventInfoChirps(eventObjectData.id));
                  } else {
                    ToastError(message);
                  }
                },
              ),
            );
          }
        },
      ),
    );
  }, [
    DocumentData,
    InfoChirpsId,
    dispatch,
    eventObjectData.id,
    selectedDocument,
  ]);

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.AddDocument}
        rightText={Strings.Save}
        onRightAction={onAddDocuments}
      />
      <View style={styles.contentContainer}>
        <Pressable style={styles.multiImagesBrowseContainer} onPress={onBrowse}>
          <Image style={styles.uploadIcon} source={Icons.documentUploadIcon} />
          <Text style={styles.uploadFilesText}>
            {Strings.UploadYourFilesHere}
          </Text>
          <Text style={styles.browseText}>{Strings.Browse}</Text>
        </Pressable>
        {selectedDocument?.length > 0 && (
          <View style={styles.multiImagesContainer}>
            <Text style={styles.uploadedCountText}>
              {`${Strings.Upload} ${selectedDocument.length} ${Strings.Files}`}
            </Text>
            <View style={styles.imageRowContainer}>
              {selectedDocument.map((e, index) => {
                return (
                  <View key={index} style={styles.imageView}>
                    <View style={styles.documentContainer}>
                      <Image
                        source={Icons.documentUploadLogo}
                        style={styles.documentUploadLogo}
                      />
                      <Text style={styles.documentHeading}>{e.name}</Text>
                    </View>
                    <CircleFilledIcon
                      icon={Icons.crossIcn}
                      containerStyle={styles.crossIconContainer}
                      iconStyle={styles.crossIcn}
                      onPress={onRemoveDocuments(e)}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <FlatList
          style={styles.mainViewContainer}
          scrollEnabled={true}
          data={documentList}
          renderItem={({item, index}) => {
            return (
              <View>
                <View key={index} style={styles.documentListContainer}>
                  <View style={styles.documentListData}>
                    <View style={styles.documentListLeftView}>
                      <Image
                        source={Icons.docIcon}
                        style={styles.documentUploadLogoStyle}
                      />
                      <Text
                        style={styles.documentHeadingStyle}
                        numberOfLines={2}>
                        {item.fileName === ''
                          ? Strings.Document
                          : item.fileName}
                      </Text>
                    </View>

                    <View style={styles.docIconView}>
                      <CircleFilledIcon
                        icon={Icons.eyeShowIcon}
                        containerStyle={styles.docIconContainer}
                        iconStyle={styles.docIcon}
                        onPress={() => {
                          navigation.navigate(NavigationRoutes.DocumentViewer, {
                            documentData: item, // data pass through navigation params
                          });
                        }}
                      />

                      <CircleFilledIcon
                        icon={Icons.deleteIcon}
                        containerStyle={styles.DeleteIconContainer}
                        iconStyle={styles.DeleteIcon}
                        onPress={() => {
                          Alert.alert(
                            Strings.DeleteDocument,
                            Strings.DeleteDocumentConfirmation,
                            [
                              {
                                text: Strings.No,
                                onPress: () => console.log('No Pressed'),
                                style: Strings.cancel,
                              },
                              {
                                text: Strings.Yes,
                                onPress: () => {
                                  // Api call for delete document InfoChirps
                                  dispatch(
                                    DeleteDocumentInfoChirps(
                                      item?.id,
                                      (isSuccess, message) => {
                                        if (isSuccess) {
                                          ToastSuccess(message);
                                          dispatch(
                                            getEventInfoChirps(
                                              eventObjectData.id,
                                            ),
                                          );
                                          DocumentData &&
                                            dispatch(
                                              getDocumentsInfoChirps(
                                                eventObjectData.id,
                                                DocumentData?.id,
                                                result => {
                                                  result &&
                                                    setDocumentList(result);
                                                },
                                              ),
                                            );
                                        } else {
                                          ToastError(message);
                                        }
                                      },
                                    ),
                                  );
                                },
                              },
                            ],
                            {cancelable: false},
                          );
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default AddDocument;
