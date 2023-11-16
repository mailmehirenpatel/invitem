import ApiConstants from '../../constants/ApiConstants';
import {apiDelete, apiGet, apiPost} from '../../services/apiServices';
import {onImageData} from '../slice/chatSlice';

// get Chat send API
export const getChat = (EventId, callBack) => {
  return async () => {
    await apiGet(`${ApiConstants.getChat}?eventId=${EventId}&Take=100000`)
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('get chat Err => ', err);
      });
  };
};

export const deleteChat = (messageId, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.deleteChat}/${messageId}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('delete chat Err => ', err);
      });
  };
};

// send Chat send API
export const SendMessage = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.ChatSend, data)
      .then(response => {
        callBack && callBack(response?.ok, response?.data?.result);
      })
      .catch(err => {
        console.log('send chat Err => ', err);
      });
  };
};

// get Chat send API
export const getImageByEventId = (EventId, callBack) => {
  return async dispatch => {
    await apiGet(`${ApiConstants.getImageByEventId}/${EventId}`)
      .then(response => {
        response?.result && dispatch(onImageData(response?.result));
        callBack && callBack(response?.result ? true : false);
      })
      .catch(err => {
        console.log('get image by eventId Err => ', err);
      });
  };
};
