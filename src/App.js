/**
 * React Native App
 * Everything starts from the Entry-point
 */

// 3rd Party Imports
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Navigator from './navigation';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
// Local Imports
import Loader from './components/Loader';
import NoInternet from './components/NoInternet';
import {persistor, store} from './store';

PushNotification.configure({
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  onNotification: function (notification) {
    const {data} = notification;
    //console.log(data?.data?.RefId);
    //NavigationService.navigate('Screen', {notificationData: data});
  },
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'invitem-channel', // required
    channelName: 'invitem-channel', // required
    channelDescription: 'A channel to display notifications',
    playSound: true,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log('createChannel returned ', created),
);

const App = () => {
  // Splash Screen Hide Functionality
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background ', remoteMessage);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      displayLocalNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const displayLocalNotification = data => {
    try {
      PushNotification.localNotification({
        channelId: 'invitem-channel',
        title: data?.notification?.title,
        message: data?.notification?.body,
        bigPictureUrl: data?.android?.imageUrl ? data?.android?.imageUrl : '',
        smallIcon: data?.android?.imageUrl ? data?.android?.imageUrl : '',
        vibrate: true,
        data: data,
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
          <Loader />
          <NoInternet />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};
export default App;
