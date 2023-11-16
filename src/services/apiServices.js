// Local Imports
import {loaderRef} from '../components/Loader';
import {apiClient} from './client';

// Get Api Calling
const apiGet = (endPoint, data = {}) => {
  loaderRef.current.show(); // Loader Show Functionality
  return apiClient()
    .get(endPoint, data)
    .then(res => {
      //console.log(res?.status);
      if (res?.status === 401) {
        //refresh auth Token
      }
      loaderRef.current.hide(); // Loader Hide Functionality
      return res.data;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

const apiPost = (endPoint, data, headers = {}) => {
  loaderRef.current.show();
  return apiClient()
    .post(endPoint, data, {
      headers: headers,
    })
    .then(res => {
      //console.log(res?.status);
      if (res?.status === 401) {
        //refresh auth Token
      }
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

// Put and Update Api Calling
const apiPut = (endPoint, data) => {
  loaderRef.current.show(); // Loader Show Functionality
  return apiClient()
    .put(endPoint, data)
    .then(res => {
      //console.log(res?.status);
      if (res?.status === 401) {
        //refresh auth Token
      }
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

// Delete Api Calling
const apiDelete = (endPoint, data) => {
  loaderRef.current.show(); // Loader Show Functionality
  return apiClient()
    .delete(
      endPoint,
      {},
      {
        data: data,
      },
    )
    .then(res => {
      //console.log(res?.status);
      if (res?.status === 401) {
        //refresh auth Token
      }
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

export {apiDelete, apiGet, apiPost, apiPut};
