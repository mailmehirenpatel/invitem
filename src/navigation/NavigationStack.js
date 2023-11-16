// 3rd Party Imports
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// Local Imports
import NavigationRoutes from '../constants/NavigationRoutes';
import Colors from '../theme/Colors';
import {authScreens, dashboardScreens} from './appRoutes';
import {connectionRef} from '../components/NoInternet';
import NetInfo from '@react-native-community/netinfo';
import {requestRefreshToken} from '../store/actions/AuthAction';

// Global Navigation Stack Field References
const AuthStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();

// Common Stack Screen Option
const stackScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.White,
  },
  headerTintColor: Colors.Primary,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};

// Call Auth Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={stackScreenOptions}>
      {Object.entries({...authScreens}).map(([name, screen]) => (
        <AuthStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </AuthStack.Navigator>
  );
};

// Call DashBoard Navigator
const DashboardNavigator = ({userMpin}) => {
  return (
    <DashboardStack.Navigator
      screenOptions={stackScreenOptions}
      initialRouteName={
        userMpin == null
          ? NavigationRoutes.EventScreen
          : NavigationRoutes.MpinCode
      }>
      {Object.entries({...dashboardScreens}).map(([name, screen]) => (
        <DashboardStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </DashboardStack.Navigator>
  );
};
const App = () => {
  // Value Get Through Use Selector
  const isLogin = useSelector(state => state.auth.isLogin);
  const isDark = useSelector(state => state.theme.isDark);
  const {userMpin} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // App Theme Conditions
  const currentTheme = isDark ? Colors.darkTheme : Colors.lightTheme;
  React.useEffect(() => {
    if (new Date(isLogin?.validTo) < new Date()) {
      let requestData = {
        token: isLogin?.token,
        refreshToken: isLogin?.refreshToken,
      };
      dispatch(requestRefreshToken(requestData));
    }

    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected && state.isInternetReachable;
      if (isConnected != null && !isConnected) {
        connectionRef.current.show();
      } else {
        connectionRef.current.hide();
      }
    });
    return () => removeNetInfoSubscription();
  }, [
    dispatch,
    isLogin?.refreshToken,
    isLogin.refreshTokenExpiryTime,
    isLogin?.token,
    isLogin?.validTo,
  ]);
  return (
    <NavigationContainer theme={currentTheme}>
      <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
      {!isLogin ? (
        <AuthNavigator />
      ) : (
        <DashboardNavigator userMpin={userMpin} />
      )}
    </NavigationContainer>
  );
};

export default App;
