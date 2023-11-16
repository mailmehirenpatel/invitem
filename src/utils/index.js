// 3rd Party Imports
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import DocumentPicker, {types} from 'react-native-document-picker';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Local Imports
import {Icons} from '../assets';
import {Strings} from '../config/strings';
import ApiConstants from '../constants/ApiConstants';
import APP_CONFIG from '../constants/config';
import Colors from '../theme/Colors';

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();

  console.log('fcmToken ', fcmToken);

  if (fcmToken) {
    return fcmToken;
  } else {
    return '';
  }
};

export const requestFcmToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return getFcmToken();
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
};

// Camera Access Functionality
export const cameraAccess = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: Strings.cameraPermission,
          message: Strings.appNeedCameraPermission,
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  } else {
    return true;
  }
};

// Storage Access Functionality
export const storageAccess = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: Strings.externalStoragePermission,
          message: Strings.appNeedStoragePermission,
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
    }
    return false;
  } else {
    return true;
  }
};

// Image Selection Functionality
export const imageSelection = async (isCamera, options = {}) => {
  const imageOptions = {
    ...options,
  };
  const isCameraPermissionGranted = await cameraAccess();
  const isStoragePermissionGranted = await storageAccess();
  if (isCamera && isCameraPermissionGranted) {
    return new Promise((resolve, reject) => {
      launchCamera(imageOptions)
        .then(image => resolve(image))
        .catch(err => reject(err.message));
    });
  } else if (isStoragePermissionGranted) {
    return new Promise((resolve, reject) => {
      launchImageLibrary(imageOptions)
        .then(image => resolve(image))
        .catch(err => reject(err.message));
    });
  }
};

// Document Selection Functionality
export const documentSelection = () => {
  const documentPickerOption = {
    allowMultiSelection: true,
    type: [types.pdf],
    presentationStyle: 'fullScreen',
  };
  try {
    return new Promise((resolve, reject) => {
      DocumentPicker.pick(documentPickerOption)
        .then(documents => {
          if (documents.length <= 5) {
            resolve(documents);
          } else {
            reject(Strings.documentPickerError);
          }
        })
        .catch(err => reject(err.message));
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
    } else {
      console.error(err);
    }
  }
};

// Get Google Location Functionality
export const getGooglePlaceLocation = location => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(location);
    const url = `${ApiConstants.GeoLocationUrl}?address=${encodedAddress}&key=${APP_CONFIG.GOOGLE_API_KEY}`;

    fetch(url)
      .then(responseJson => {
        if (responseJson?.status === 200) {
          responseJson
            .json()
            .then(e => resolve(e))
            .catch(err => console.log('Lat/Long response Error', err));
        } else {
          reject('Geocoding API request failed');
        }
      })
      .catch(error => reject(error));
  });
};

async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
        },
      );
      console.log(
        'permission status ',
        granted === PermissionsAndroid.RESULTS.GRANTED,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await Geolocation.requestAuthorization('whenInUse');
      return result === 'granted';
    }
  } catch (err) {
    console.warn('Error while requesting location permission:', err);
    return false;
  }
}
export async function getCurrentLocation() {
  return new Promise(async (resolve, reject) => {
    requestLocationPermission().then(() => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => reject(error.message),
        {timeout: 20000},
      );
    });
  });
}

// Get Lat and Long Functionality
export const getLatLongFromAddress = address => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `${ApiConstants.GeoLocationUrl}?address=${encodedAddress}&key=${APP_CONFIG.GOOGLE_API_KEY}`;

    fetch(url)
      .then(responseJson => {
        if (responseJson.status === 200) {
          responseJson
            .json()
            .then(e => resolve(e))
            .catch(err => console.log('Lat/Long response Error', err));
        } else {
          reject('Geocoding API request failed');
        }
      })
      .catch(error => reject(error));
  });
};

// get address from lat long
export const getAddressFromCoordinates = (lat, long) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${ApiConstants.GeoLocationUrl}?latlng=${lat},${long}&key=${APP_CONFIG.GOOGLE_API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          resolve(data?.results);
        }
      })
      .catch(error => {
        console.log('Error fetching address:', error);
        reject('Geocoding API request failed');
      });
  });
};

// Download file Functionality
export const onDownload = url => async () => {
  // To get the file extension
  const getExtension = filename => {
    return `.${/[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined}`;
  };

  // Main function to download the image
  const downloadImage = () => {
    // To add the time suffix in filename
    let date = new Date();

    // Getting the extension of the file
    let ext = getExtension(url);

    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      IOSBackgroundTask: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: Strings.Image,
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        try {
          // Showing alert after successful downloading
          CameraRoll.save(res.data, 'photo')
            .then(response => console.log('CameraRoll response', response))
            .catch(err => console.log(err));
          Alert.alert(Strings.ImageDownloadedSuccessfully);
        } catch (error) {
          Alert.alert(error);
        }
      });
  };

  if (Platform.OS === 'ios') {
    downloadImage();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: Strings.StoragePermissionRequired,
          message: Strings.AppNeedsAccessToYourStorageToDownloadPhotos,
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        downloadImage();
      } else {
        // If permission denied then show alert
        Alert.alert(Strings.StoragePermissionNotGranted);
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }
};

//for floating action button item list
export const actionsList = [
  {
    text: 'Upcoming',
    icon: Icons.CalendarIcn,
    name: 'Upcoming Events',
    position: 1,
    textColor: Colors.White,
    textBackground: Colors.Transparent,
    textElevation: 0,
  },
  {
    text: 'Create',
    icon: Icons.addIcon,
    name: 'add',
    position: 2,
    textColor: Colors.White,
    textBackground: Colors.Transparent,
    textElevation: 0,
  },
  {
    text: 'Join',
    icon: Icons.linkAdd,
    name: 'join',
    position: 3,
    textColor: Colors.White,
    textBackground: Colors.Transparent,
    textElevation: 0,
  },
];
