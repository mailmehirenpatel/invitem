import ApiConstants from '../../constants/ApiConstants';
import {apiDelete, apiGet, apiPost, apiPut} from '../../services/apiServices';
import {
  onCategoryData,
  onEventData,
  onEventObjectData,
  onEventScheduleList,
  onJoinEventData,
  onLocationData,
  onUpcomingEventData,
} from '../slice/eventSlice';

// Api call for get Event data
export const getEventData = callBack => {
  return async dispatch => {
    await apiGet(
      `${ApiConstants.eventUrl}?Take=1000&OrderByColumn=createdBy&OrderByDirection=ASC`,
    )
      .then(response => {
        callBack && callBack(response?.result ? true : false, response?.result);
        response?.result && dispatch(onEventData(response));
      })
      .catch(err => {
        console.log('Event data Api Err => ', err);
      });
  };
};
// delete event Api call
export const deleteEvent = (EventId, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.DeleteEventUrl}/${EventId}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message);
      })
      .catch(err => {
        console.log(' delete event Api Err => ', err);
      });
  };
};

export const getEventObjectData = (EventId, callBack) => {
  return async dispatch => {
    await apiGet(`${ApiConstants.AllEventUrl}?id=${EventId}`)
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onEventObjectData(response));
      })
      .catch(err => {
        console.log('Event Object data Api Err => ', err);
      });
  };
};

// Api call for upcoming events
export const getUpComingEvents = callBack => {
  return async dispatch => {
    await apiGet(
      `${ApiConstants.upcomingEventUrl}?OrderByColumn=eventDate&OrderByDirection=asc`,
    )
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onUpcomingEventData(response));
      })
      .catch(err => {
        console.log('Upcoming Event Api Err => ', err);
      });
  };
};

// Api call for add Location
export const AddLocationData = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.LocationUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message, response?.data?.result); // CallBack Function Call
      })
      .catch(err => {
        console.log('add location Api Err => ', err);
      });
  };
};

// Api call for add Location
export const getLocationData = callBack => {
  return async dispatch => {
    await apiGet(`${ApiConstants.LocationUrl}`)
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onLocationData(response));
      })
      .catch(err => {
        console.log('get location data Api Err => ', err);
      });
  };
};

// Api call for get Event category
export const getEventCategoryData = callBack => {
  return async dispatch => {
    await apiGet(`${ApiConstants.EventCategoryUrl}?TakeAll=true`)
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onCategoryData(response));
      })
      .catch(err => {
        console.log('get category data Api Err => ', err);
      });
  };
};

// Add Event api call
export const addEventData = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.AddEventUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.result); // CallBack Function Call
      })
      .catch(err => {
        console.log('Add Event data Api Err => ', err);
      });
  };
};

//// Api call for update Event data
export const putEventData = (data, callBack) => {
  return async () => {
    await apiPut(ApiConstants.UpdateEventUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message); // CallBack Function Call
        response?.ok && getEventData();
      })
      .catch(err => {
        console.log('Update Event Api Err => ', err);
      });
  };
};

// Invite user api call
export const requestInviteUser = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.inviteUser, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('Invite User Err => ', err);
      });
  };
};

// get Registered user api call
export const getRegisterUser = (id, callBack) => {
  return async () => {
    await apiGet(
      `${ApiConstants.registerUserUrl}?OrderByColumn=isSelected&OrderByDirection=DESC&eventId=${id}&Take=1000`,
    )
      .then(response => {
        callBack(response?.result);
      })
      .catch(err => {
        console.log('Register user Api Err => ', err);
      });
  };
};

//event-participants API call
export const requestEventParticipants = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.eventParticipantsUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
        response?.ok && getEventData();
      })
      .catch(err => {
        console.log('Event Participant Api Err => ', err);
      });
  };
};

// join event code Api call.
export const requestJoinEventCode = (data, callBack) => {
  return async dispatch => {
    await apiPost(
      `${ApiConstants.joinEventUrl}?invitationCode=${data.invitationCode}`,
    )
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
        response?.ok && dispatch(onJoinEventData(response));
      })
      .catch(err => {
        console.log('Join Event Api Err => ', err);
      });
  };
};

// multipal event
export const requestMultipalEvent = (data, callBack) => {
  return async dispatch => {
    await apiPost(ApiConstants.AddMultipalEventUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
        response?.ok && dispatch(onJoinEventData(response));
      })
      .catch(err => {
        console.log('Join Event Api Err => ', err);
      });
  };
};

// Api call for update schedule list
export const requestUpdateSchedule = (data, callBack) => {
  return async () => {
    await apiPut(ApiConstants.AddMultipalEventUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('Join Event Api Err => ', err);
      });
  };
};
// Api call for get schedule list
export const getEventScheduleList = (eventId, callBack) => {
  return async dispatch => {
    await apiGet(
      `${ApiConstants.getEventSchedule}/${eventId}?OrderByColumn=eventDate&OrderByDirection=desc`,
    )
      .then(response => {
        callBack && callBack(response?.result ? true : false);
        response?.result && dispatch(onEventScheduleList(response));
      })
      .catch(err => {
        console.log('get schedule list Api Err => ', err);
      });
  };
};

// Api call for Push notification
export const putMuteChat = (data, callBack) => {
  return async () => {
    await apiPut(ApiConstants.pushNotificationUrl, data)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log(' push notification Api Err => ', err);
      });
  };
};
// Api call for Push notification
export const deleteEventSchedule = (scheduleId, callBack) => {
  return async () => {
    await apiDelete(`${ApiConstants.AddMultipalEventUrl}/${scheduleId}`)
      .then(response => {
        callBack && callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log(' delete schedule Api Err => ', err);
      });
  };
};

// Api call for send-notification-event-participants
export const sendNotificationEventParticipantsByEventId = (
  eventId,
  callBack,
) => {
  return async () => {
    await apiPost(
      `${ApiConstants.sendNotificationEventParticipantsUrl}?eventId=${eventId}`,
      eventId,
    )
      .then(response => {
        callBack(response?.ok, response?.data?.message, response?.data?.result); // CallBack Function Call
      })
      .catch(err => {
        console.log('send-notification-event-participants Api Err => ', err);
      });
  };
};
