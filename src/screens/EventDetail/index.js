// 3rd Party Imports
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

//Local Imports
import {Icons, Images} from '../../assets';
import {CustomNavbar} from '../../components';
import fonts from '../../config/fonts';
import NavigationRoutes from '../../constants/NavigationRoutes';
import Colors from '../../theme/Colors';
import EventChat from './Component/Chat';
import EventImage from './Component/Images';
import EventInfo from './Component/Info';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();

const EventDetail = ({navigation, route}) => {
  const {eventObjectData} = useSelector(state => state.event);

  //Get user role
  const {userId} = useSelector(state => state.auth);

  // Navigate To Other Screen and Pass Data through navigation params
  const onRightAction = useCallback(() => {
    navigation.navigate(NavigationRoutes.UpdateEvent);
  }, [navigation]);

  // Navigate To Guest Event Profile Screen
  const onEventProfile = useCallback(() => {
    navigation.navigate(NavigationRoutes.GuestEventProfile);
  }, [navigation]);

  // Common Options for lable text
  const commonOptions = {
    tabBarLabelStyle: {
      textTransform: 'none',
      fontWeight: fonts.weight.w600,
      fontFamily: fonts.type.RobotoSerifRegular,
    },
  };

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        title={eventObjectData?.eventName || ''}
        leftIcon={Icons.backArrowIcon}
        profileIcon={
          eventObjectData?.image
            ? eventObjectData.image
            : Images.EventImagePlaceholder // Render Event Image
        }
        onRightAction={onRightAction}
        onProfileAction={onEventProfile}
        rightIcon={userId === eventObjectData?.userId && [Icons.editIcon]}
      />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.logoBackgroundColor,
          tabBarInactiveTintColor: Colors.Gray,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.logoBackgroundColor,
          },
        }}>
        <Tab.Screen name="Chat" component={EventChat} options={commonOptions} />
        <Tab.Screen name="Info" options={commonOptions}>
          {props => <EventInfo {...{navigation, route, eventObjectData}} />}
        </Tab.Screen>
        <Tab.Screen
          name="Images"
          //component={EventImage}
          options={commonOptions}>
          {props => <EventImage {...{eventObjectData}} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default EventDetail;
