// Local Imports
import ApiConstants from '../../constants/ApiConstants';
import {apiGet, apiPost} from '../../services/apiServices';
import {onSignIn} from '../slice/AuthSlice';

//Api call for login
export const requestSignIn = (data, callBack) => {
  return async dispatch => {
    await apiPost(ApiConstants.loginUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message, response?.data?.result); // CallBack Function Call
        response?.data?.result && dispatch(onSignIn(response));
      })
      .catch(err => {
        console.log('SignIn Api Err => ', err);
      });
  };
};

//Api call for send email verification link
export const requestVerifyEmail = (data, callBack) => {
  return async () => {
    await apiPost(`${ApiConstants.verifyEmailUrl}?email=${data}`)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('Verify Email Api Err => ', err);
      });
  };
};
//Api call for SignUp
export const requestSignUp = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.registerUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('SignUp Api Err => ', err);
      });
  };
};

//Api call for ForgotPassword
export const requestForgotPass = (data, callBack) => {
  return async () => {
    await apiPost(`${ApiConstants.sendOtpUrl}?email=${data}`)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('ForgotPassword Api Err => ', err);
      });
  };
};

// Api call for VerifyOtp
export const requestVerifyOtp = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.verifyOtpUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('Verify Otp Api Err => ', err);
      });
  };
};

// Api call for resetPassword
export const requestResetPassword = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.resetPasswordUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('reset password Api Err => ', err);
      });
  };
};

// Api call for m-pin authenticate
export const requestMPinAuthenticate = (data, callBack) => {
  return async dispatch => {
    await apiPost(`${ApiConstants.mPinAuthenticateUrl}?mpin=${data.otp}`)
      .then(response => {
        console.log('Mpin responses => ', response);
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
        response?.ok && dispatch(onSignIn(response));
      })
      .catch(err => {
        console.log('M- Pin Auth Api Err => ', err);
      });
  };
};

// Api call for create m-pin
export const createMPinApi = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.createMPinUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('create mpin Err => ', err);
      });
  };
};

// Api call for Report to admin
export const SendReportToAdmin = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.SendReportToAdmin, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('Send Report To Admin Err => ', err);
      });
  };
};

// Api call for Help
export const requestHelp = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.HelpUrl, data)
      .then(response => {
        callBack(response?.ok, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('request Help Err => ', err);
      });
  };
};

// Api call for m-pin authenticate
export const requestVerifyMpinUrl = (mPin, callBack) => {
  return async () => {
    await apiGet(`${ApiConstants.verifyMpinUrl}?mpin=${mPin}`)
      .then(response => {
        callBack(response?.result); // CallBack Function Call
      })
      .catch(err => {
        console.log('M- Pin verify Api Err => ', err);
      });
  };
};

// Api call for refresh - token
export const requestRefreshToken = (data, callBack) => {
  return async dispatch => {
    await apiPost(ApiConstants.refeshTokenUrl, data)
      .then(response => {
        response?.data?.result && dispatch(onSignIn(response));
      })
      .catch(err => {
        console.log('M- Pin verify Api Err => ', err);
      });
  };
};
// Api call for reset M-pin
export const requestResetMpin = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.ResetMpinUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('reset Mpin Api Err => ', err);
      });
  };
};

// Api call for reset M-pin
export const requestRegisterDevice = (data, callBack) => {
  return async () => {
    await apiPost(ApiConstants.RegisterDevideUrl, data)
      .then(response => {
        callBack(response?.data?.result, response?.data?.message); // CallBack Function Call
      })
      .catch(err => {
        console.log('Register device Api Err => ', err);
      });
  };
};
