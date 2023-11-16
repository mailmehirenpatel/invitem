// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {Alert, FlatList, Pressable, Share, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CircleFilledIcon, CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastInDevelopment} from '../../constants/ToastConstants';
import {ListProfileSettings} from '../../constants/mockdata';
import {onLogout} from '../../store/slice/AuthSlice';
import styles from './styles';

// Render Profile Setting Component
const RenderProfileSetting = ({item, navigation, handleLogout}) => {
  return (
    <Pressable
      style={styles.profileSettingItemView}
      onPress={onSettingPress(item.title, navigation, handleLogout)}>
      <View style={styles.itemLeftView}>
        <CircleFilledIcon
          icon={item.icon}
          containerStyle={[
            styles.leftIconContainer,
            {backgroundColor: item.iconBackground},
          ]}
          iconStyle={[styles.leftIcon, {tintColor: item.iconTintColor}]}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      <SettingRightView settingType={item.title} />
    </Pressable>
  );
};

const SettingRightView = ({settingType}) => {
  const [isThemeEnable, setTheme] = useState(false);
  const [isNotificationEnable, setNotification] = useState(false);
  const [isStorage, setStorage] = useState(false);

  // Set Theme Color
  const toggleTheme = useCallback(() => setTheme(prev => !prev), []);

  // Set Notification able and disable
  const toggleNotification = useCallback(
    () => setNotification(prev => !prev),
    [],
  );

  // Set Storage for Future use.
  //   const toggleStorage = useCallback(() => setStorage(prev => !prev), []);
  //   if (settingType === Strings.ThemeMode) {
  //     return (
  //       <SwitchWithIcons
  //         value={isThemeEnable}
  //         icon={{
  //           true: Icons.themeIcon,
  //           false: Icons.themeIcon,
  //         }}
  //         iconColor={{true: '#2C3333', false: '#FFCC33'}}
  //         trackColor={{true: '#2C3333', false: '#FFCC33'}}
  //         thumbColor={{true: Colors.White, false: Colors.White}}
  //         disabledThumbColor={'red'}
  //         onValueChange={toggleTheme}
  //       />
  //     );
  //   } else if (settingType === Strings.Notification) {
  //     return (
  //       <Switch
  //         trackColor={{
  //           false: Colors.borderColor,
  //           true: Colors.switchActiveColor,
  //         }}
  //         thumbColor={Colors.White}
  //         ios_backgroundColor={Colors.BorderColor}
  //         onValueChange={toggleNotification}
  //         value={isNotificationEnable}
  //         style={{transform: [{scaleX: 0.7}, {scaleY: 0.65}]}}
  //       />
  //     );
  //   } else if (settingType === Strings.StorageAndData) {
  //     return (
  //       <Switch
  //         trackColor={{
  //           false: Colors.borderColor,
  //           true: Colors.switchActiveColor,
  //         }}
  //         thumbColor={Colors.White}
  //         ios_backgroundColor={Colors.BorderColor}
  //         onValueChange={toggleStorage}
  //         value={isStorage}
  //         style={{transform: [{scaleX: 0.7}, {scaleY: 0.65}]}}
  //       />
  //     );
  //   } else {
  //     return (
  //       <View>
  //         <Image source={Icons.rightArrow} style={styles.rightIcon} />
  //       </View>
  //     );
  //   }
};

const onSettingPress = (settingType, navigation, handleLogout) => () => {
  // Switch Case Condition
  switch (settingType) {
    case Strings.InviteFriends:
      Share.share({
        message:
          'PlayStore Link: \n\n https://play.google.com/store/apps/details?id=com.whereismytrain.android&hl=en-IN   \n\n\n App Store Link: \n\n https://play.google.com/store/apps/details?id=com.whereismytrain.android&hl=en-IN',
      });
      break;
    case Strings.Password:
      return ToastInDevelopment();
    case Strings.Mpin:
      navigation.navigate(NavigationRoutes.ConfirmPin);
      break;
    case Strings.TermsAndCondition:
      navigation.navigate(NavigationRoutes.TermsCondition);
      break;
    case Strings.PrivacyPolicy:
      navigation.navigate(NavigationRoutes.PrivacyPolicy);
      break;
    case Strings.AboutUs:
      navigation.navigate(NavigationRoutes.AboutUs);
      break;
    case Strings.ReportToAdmin:
      navigation.navigate(NavigationRoutes.ReportToAdmin);
      break;

    case Strings.Help:
      navigation.navigate(NavigationRoutes.Help);
      break;

    case Strings.Logout:
      handleLogout();
      break;
    default:
      return false;
  }
};

const SettingList = ({navigation, handleLogout}) => {
  // FlatList Render Items
  const renderItem = useCallback(
    ({item}) => (
      <RenderProfileSetting
        item={item}
        {...{
          navigation,
          handleLogout,
        }}
      />
    ),
    [handleLogout, navigation],
  );
  return (
    <FlatList
      data={ListProfileSettings}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const ProfileSetting = ({navigation}) => {
  const {profileData} = useSelector(state => state.profile);

  const dispatch = useDispatch();
  // LogOut Functionality
  const handleLogout = useCallback(() => {
    Alert.alert(
      Strings.Logout,
      Strings.LogoutConfirmation,
      [
        {
          text: Strings.No,
          onPress: () => console.log('No Pressed'),
          style: Strings.cancel,
        },
        {text: Strings.Yes, onPress: () => dispatch(onLogout())},
      ],
      {cancelable: false},
    );
  }, [dispatch]);
  return (
    <View style={styles.mainContainer}>
      <CustomNavbar leftIcon={Icons.backArrowIcon} title={Strings.Settings} />
      <View style={styles.contentContainer}>
        <View style={styles.profileMainContainer}>
          <View style={styles.profileDetailContainer}>
            <SettingList {...{navigation, handleLogout}} />
          </View>
        </View>
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default ProfileSetting;
