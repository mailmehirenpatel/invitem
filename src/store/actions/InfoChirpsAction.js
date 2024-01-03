import ApiConstants from '../../constants/ApiConstants';
import {apiDelete, apiGet, apiPost, apiPut} from '../../services/apiServices';
import {
  onEventInfoChirpsData,
  onInfoChirpsData,
} from '../slice/infoChirpsSlice';

// Api call for get Info Chirps data
export const getInfoChirpsData = () => {
  return async dispatch => {
    await apiGet(ApiConstants.infoChirpsUrl)
      .then(response => {
        response?.result && dispatch(onInfoChirpsData(response));
      })
      .catch(err => {
        console.log('InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for add Note infoChirps
export const AddNoteInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.AddNoteInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('add note InfoChirps data Api Err => ', err);
      });
  };
};
// Api call for Update Note infoChirps
export const UpdateNoteInfoChirps = (data, callBack) => {
  return async () => {
    await apiPut(ApiConstants.AddNoteInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('Update Note InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for Delete Note infoChirps
export const DeleteNoteInfoChirps = (id, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.AddNoteInfoChirpsUrl}/${id}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for get Event InfoChirps
export const getEventInfoChirps = (EventId, callBack) => {
  return async dispatch => {
    await apiGet(`${ApiConstants.getEventInfoChirpsUrl}/${EventId}`)
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onEventInfoChirpsData(response));
      })
      .catch(err => {
        console.log('InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for get Event Note InfoChirps
export const getEventNoteInfoChirps = (EventId, infoChirpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/note/${infoChirpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('get eventNote data Api Err => ', err);
      });
  };
};

// Api call for Add website Link infoChirps
export const addWebLinkInfoChirps = (data, callBack) => {
  return dispatch => {
    apiPost(ApiConstants.addWebLinksInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(error => {
        console.log('Add Web Link Post API Error', error);
      });
  };
};

// Api call for Get website Link infoChirps
export const getWebLinkInfoChirps = (eventId, infoChirpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${eventId}/web-links/${infoChirpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(error => {
        console.log('get Web Link API Error', error);
      });
  };
};

// Api call for get Images InfoChirps
export const getImageInfoChirps = (EventId, infoChirpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/images/${infoChirpsId}`,
    )
      .then(response => {
        callBack(response?.result && response?.result[0]);
      })
      .catch(err => {
        console.log('Get Image InfoChirps data Api Err => ', err);
      });
  };
};
// Api call for Delete website InfoChirps
export const DeleteWebsiteInfoChirps = (id, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.deleteWebLinksInfoChirpUrl}?id=${id}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for Add Images InfoChirps
export const AddImageInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.addImageInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('Add Image InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for get Documents InfoChirps
export const getDocumentsInfoChirps = (EventId, infoChirpsId, callBack) => {
  return dispatch => {
    apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/document/${infoChirpsId}`,
    )
      .then(response => {
        callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('get Documents InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for Add Documents InfoChirps
export const AddDocumentInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.addDocumentInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data);
      })
      .catch(err => {
        console.log('Add Documents InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for Delete Documents InfoChirps
export const DeleteDocumentInfoChirps = (id, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.addDocumentInfoChirpsUrl}?ids=${id}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for add SocialMedia infoChirps
export const AddSocialMediaInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.AddSocialMediaInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.ok, response?.data?.message);
      })
      .catch(err => {
        console.log('add social media InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for get Social Media InfoChirps
export const getSocialMediaInfoChirps = (EventId, infoChorpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/social-media-urls/${infoChorpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for add RSVP infoChirps
export const AddRSVPInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.AddRsvpInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('add RSVP InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for get Event RSVP InfoChirps
export const getEventRSVPInfoChirps = (EventId, infoChorpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/event-rsvp/${infoChorpsId}?OrderByColumn=Date&OrderByDirection=DESC`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('get InfoChirps RSVP Api Err => ', err);
      });
  };
};

// Api call for get Event RSVP InfoChirps
export const responseEventRSVPInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(
      `${ApiConstants.getEventInfoChirpsUrl}${ApiConstants.responseRSVPInfochirpsUrl}`,
      data,
    )
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('get InfoChirps RSVP Api Err => ', err);
      });
  };
};

// Api call for get Event RSVP InfoChirps
export const getRSVPDetails = (rsvpId, infoChorpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}${ApiConstants.getEventRSVPDetailsUrl}/${rsvpId}and/${infoChorpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(err => {
        console.log('get InfoChirps RSVP Api Err => ', err);
      });
  };
};

// Api call for get Event RSVP InfoChirps
export const DeleteRSVP = (rsvpId, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.getEventInfoChirpsUrl}/rsvp/${rsvpId}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('Delete RSVP Api Err => ', err);
      });
  };
};

// Api call for Add Vote or Poll infoChirps
export const AddPollInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.AddPollInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('Add Poll InfoChirps data  Api Err => ', err);
      });
  };
};

// Api call for Get Vote or Poll infoChirps
export const getPollInfoChirps = (EventId, infoChirpsId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/poll-option/${infoChirpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(error => {
        console.log('get vote or poll API Error', error);
      });
  };
};

// Api call for add Vote or Poll response infoChirps
export const responseEventPollInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(
      `${ApiConstants.getEventInfoChirpsUrl}${ApiConstants.responsePollInfochirpsUrl}`,
      data,
    )
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('response Poll InfoChirps data  Api Err => ', err);
      });
  };
};

// Api call for Get Vote or Poll infoChirps details
export const getPollResult = (pollId, callBack) => {
  return async () => {
    await apiGet(`${ApiConstants.getEventInfoChirpsUrl}/poll-detail/${pollId}`)
      .then(response => {
        callBack && callBack(response?.result && response?.result[0]);
      })
      .catch(error => {
        console.log('get vote or poll API Error', error);
      });
  };
};

// Api call for Delete Event Poll InfoChirps
export const deleteEventPollInfoChirps = (pollId, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.getEventInfoChirpsUrl}/poll/${pollId}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('get eventNote data Api Err => ', err);
      });
  };
};

// Api call for add Checklist InfoChirps

export const AddChoiceListInfoChirps = (data, callBack) => {
  return () => {
    apiPost(ApiConstants.AddChoiceListInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('Add choice InfoChirps data  Api Err => ', err);
      });
  };
};
// Api call for add Vote or Poll response infoChirps
export const responseEventChoiceInfoChirps = (data, callBack) => {
  return async () => {
    await apiPost(
      `${ApiConstants.getEventInfoChirpsUrl}${ApiConstants.responseChoiceListInfoChirpsUrl}`,
      data,
    )
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('response Poll InfoChirps data  Api Err => ', err);
      });
  };
};

// Api call for Get  choice list infoChirps details
export const getChoiceListResult = (choiceListId, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/choicelist-detail/${choiceListId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result[0]);
      })
      .catch(error => {
        console.log('get vote or poll API Error', error);
      });
  };
};

// Api call for Delete Choicelist InfoChirps
export const deleteEventChoiceInfoChirps = (choiceListId, callBack) => {
  return async () => {
    await apiDelete(
      `${ApiConstants.getEventInfoChirpsUrl}/choicelist/${choiceListId}`,
    )
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('get event choice list data Api Err => ', err);
      });
  };
};

// Api call for get Checklist InfoChirps
export const getChoiceInfoChirps = (EventId, infoChirpsId, callBack) => {
  return () => {
    apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/choicelist-option/${infoChirpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(error => {
        console.log('get choice list API Error', error);
      });
  };
};

// Test Chat send API
export const Chat = data => {
  return async () => {
    await apiPost(ApiConstants.ChatSend, data)
      .then(response => {
        // callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('get InfoChirps RSVP Api Err => ', err);
      });
  };
};

// Api call for add Checklist infoChirps
export const AddCheckListInfoChirps = (data, callBack) => {
  return () => {
    apiPost(ApiConstants.AddCheckListInfoChirpsUrl, data)
      .then(response => {
        callBack && callBack(response?.ok, response?.data?.message);
      })
      .catch(err => {
        console.log('add checklist InfoChirps data Api Err => ', err);
      });
  };
};

// Api call for Get checklist infochirps details
export const getCheckListInfoChirps = (EventId, InfoChirpsId, callBack) => {
  return () => {
    apiGet(
      `${ApiConstants.getEventInfoChirpsUrl}/${EventId}/checklist/${InfoChirpsId}`,
    )
      .then(response => {
        callBack && callBack(response?.result && response?.result);
      })
      .catch(error => {
        console.log('get Checklist InfoChirps API Error', error);
      });
  };
};

// Api call for delete checklist infochirps details
export const deleteCheckListInfoChirps = (CheckListId, callBack) => {
  return () => {
    apiDelete(`${ApiConstants.getEventInfoChirpsUrl}/checklist/${CheckListId}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(error => {
        console.log('delete Checklist InfoChirps API Error', error);
      });
  };
};

// api call for update CheckList option
export const updateCheckListOption = (data, callBack) => {
  return async () => {
    await apiPut(ApiConstants.updateChecklistOptionUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log('update checkList option data Api Err => ', err);
      });
  };
};
