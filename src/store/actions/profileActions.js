import {Platform} from 'react-native';
import ApiConstants from '../../constants/ApiConstants';
import {apiGet, apiPost, apiPut} from '../../services/apiServices';
import {onProfileData} from '../slice/profileSlice';

// Api call for get profile data
export const getUserProfileData = callBack => {
  return async dispatch => {
    await apiGet(ApiConstants.getUserProfileUrl)
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onProfileData(response));
      })
      .catch(err => {
        console.log('profile data Api Err => ', err);
      });
  };
};

// Api call for get user by user_id
export const getUserByIdData = (userId, callBack) => {
  return async () => {
    await apiGet(`${ApiConstants.getUserInfoByIdeUrl}?userId=${userId}`)
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('user info by id Api Err => ', err);
      });
  };
};

//Api call for update profile data
export const putUserProfileData = (data, callBack) => {
  return async () => {
    await apiPut(ApiConstants.updateUserProfileUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message);
      })
      .catch(err => {
        console.log('update profile data Api Err => ', err);
      });
  };
};

//Api call for upload profile media
export const uploadMediaRequest = (selectedFile, driveName, callBack) => {
  return async () => {
    let formData = new FormData();
    const file = {
      name: selectedFile.fileName,
      type: selectedFile.type,
      uri:
        Platform.OS === 'android'
          ? selectedFile.uri
          : selectedFile.uri.replace('file://', ''),
    };
    formData.append('files', file);
    formData.append('fileDriveName', driveName);
    await apiPost(ApiConstants.mediaUploadUrl, formData, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        callBack(response?.ok, response?.data);
      })
      .catch(err => {
        console.log('upload image Api Err => ', err);
      });
  };
};
export const uploadDocumentRequest = (selectedFile, driveName, callBack) => {
  return async () => {
    let formData = new FormData();
    const file = {
      name: selectedFile?.name,
      type: selectedFile?.type,
      uri:
        Platform.OS === 'android'
          ? selectedFile.uri
          : selectedFile.uri.replace('file://', ''),
    };
    formData.append('files', file);
    formData.append('fileDriveName', driveName);
    await apiPost(ApiConstants.mediaUploadUrl, formData, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        callBack(response?.ok, response?.data);
      })
      .catch(err => {
        console.log('upload document Api Err => ', err);
      });
  };
};
