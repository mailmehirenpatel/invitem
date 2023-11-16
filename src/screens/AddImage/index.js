// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {Image, Pressable, Text, View, ScrollView} from 'react-native';

// Local Imports
import {CustomNavbar} from '../../components';
import {Icons} from '../../assets';
import {Strings} from '../../config/strings';
import styles from './styles';
import {imageSelection} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {uploadMediaRequest} from '../../store/actions/profileActions';
import AppConstants from '../../constants/AppConstants';
import {AddImageInfoChirps} from '../../store/actions/InfoChirpsAction';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';

const AddImage = ({navigation, route}) => {
  const [selectedFile, setSelectedFile] = useState(undefined);

  // Select Image
  const onBrowse = useCallback(() => {
    imageSelection(false).then(res => {
      setSelectedFile(res.assets[0]);
    });
  }, []);

  const dispatch = useDispatch();

  const {eventObjectData} = useSelector(state => state.event);
  const {InfoChirpsId} = route.params || {};

  // Remove Image
  // const onRemoveImage = useCallback(() => setSelectedFile(undefined), []);

  const onSave = useCallback(() => {
    const ImageSelectionData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      imagePath: [selectedFile.uri],
    };
    dispatch(
      uploadMediaRequest(
        selectedFile,
        AppConstants.fileDriveName.Profile,
        (isUploaded, data) => {
          if (isUploaded && data.isSuccess) {
            dispatch(
              AddImageInfoChirps(ImageSelectionData, (isSuccess, message) => {
                if (isSuccess) {
                  ToastSuccess(message);
                }
              }),
            );
          }
        },
      ),
    );
  }, [InfoChirpsId, dispatch, eventObjectData.id, selectedFile]);

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.AddImage}
        rightText={Strings.Save}
        onRightAction={onSave}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Pressable style={styles.multiImagesBrowseContainer} onPress={onBrowse}>
          <Image style={styles.uploadIcon} source={Icons.uploadFile} />
          <Text style={styles.uploadFilesText}>
            {Strings.UploadYourFilesHere}
          </Text>
          <Text style={styles.browseText}>{Strings.Browse}</Text>
        </Pressable>
        {selectedFile && (
          <View style={styles.eventImagesContainer}>
            <View style={styles.imageView}>
              <Image source={{uri: selectedFile.uri}} style={styles.imgStyle} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AddImage;
