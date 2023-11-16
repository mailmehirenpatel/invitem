// 3rd Party Imports
import {create} from 'apisauce';

// Local Imports
import APP_CONFIG from '../constants/config';

const apiClient = () => {
  // Base Url for API
  const BaseUrl = APP_CONFIG.API_URL + APP_CONFIG.API_SUFFIX;
  // Default Options for API (BaseUrl + Headers)
  const defaultOptions = {
    baseURL: BaseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'Application/json',
    },
  };

  // Create instance
  const instance = create(defaultOptions);

  // Set the AUTH token for any request
  instance.axiosInstance.interceptors.request.use(
    async function (config) {
      const token = require('../store')?.store?.getState()?.auth?.token;
      // console.log('state token ', token);
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    },
    error => Promise.reject(error),
  );

  return instance;
};

export {apiClient};
