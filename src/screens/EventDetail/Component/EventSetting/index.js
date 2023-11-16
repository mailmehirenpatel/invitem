// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {View, Pressable, Text, FlatList, Image, Switch} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SwitchWithIcons from 'react-native-switch-with-icons';
import {useDispatch} from 'react-redux';

// Local Imports
import {ListEventSettings} from '../../../../constants/mockdata';
import styles from './styles';
import CircleFilledIcon from '../../../../components/CircleFilledIcon';
import {Icons} from '../../../../assets';
import {Strings} from '../../../../config/strings';
import Colors from '../../../../theme/Colors';
import {Metrics, verticalScale} from '../../../../config/metrics';
import {ToastInDevelopment} from '../../../../constants/ToastConstants';
import {onLogout} from '../../../../store/slice/AuthSlice';

// Render EventSetting Header
const EventSettingHeader = ({onClose}) => (
  <View style={styles.settingHeaderView}>
    <Pressable onPress={onClose}>
      <Image source={Icons.backArrowIcon} style={styles.backIcon} />
    </Pressable>
    <Text style={styles.headerText}>{Strings.Settings}</Text>
    <View />
  </View>
);
const SettingRightView = ({settingType}) => {
  const [isThemeEnable, setTheme] = useState(false);
  const [isNotificationEnable, setNotification] = useState(false);
  const [isStorage, setStorage] = useState(false);

  // Set theme Colors
  const toggleTheme = useCallback(() => setTheme(prev => !prev), []);

  // Set Notification Value
  const toggleNotification = useCallback(
    () => setNotification(prev => !prev),
    [],
  );

  // Set Storage Functionality
  const toggleStorage = useCallback(() => setStorage(prev => !prev), []);
  if (settingType === Strings.ThemeMode) {
    return (
      <SwitchWithIcons
        value={isThemeEnable}
        icon={{
          true: Icons.themeIcon,
          false: Icons.themeIcon,
        }}
        iconColor={{true: '#2C3333', false: '#FFCC33'}}
        trackColor={{true: '#2C3333', false: '#FFCC33'}}
        thumbColor={{true: Colors.White, false: Colors.White}}
        disabledThumbColor={'red'}
        onValueChange={toggleTheme}
      />
    );
  } else if (settingType === Strings.Notification) {
    return (
      <Switch
        trackColor={{
          false: Colors.borderColor,
          true: Colors.switchActiveColor,
        }}
        thumbColor={Colors.White}
        ios_backgroundColor={Colors.BorderColor}
        onValueChange={toggleNotification}
        value={isNotificationEnable}
        style={{transform: [{scaleX: 0.7}, {scaleY: 0.65}]}}
      />
    );
  } else if (settingType === Strings.StorageAndData) {
    return (
      <Switch
        trackColor={{
          false: Colors.borderColor,
          true: Colors.switchActiveColor,
        }}
        thumbColor={Colors.White}
        ios_backgroundColor={Colors.BorderColor}
        onValueChange={toggleStorage}
        value={isStorage}
        style={{transform: [{scaleX: 0.7}, {scaleY: 0.65}]}}
      />
    );
  } else {
    return (
      <View>
        <Image source={Icons.rightArrow} style={styles.rightIcon} />
      </View>
    );
  }
};
const RenderEventSetting = ({
  item,
  onSettingPress,
  handleLogout,
  refRBSheet,
}) => {
  return (
    <Pressable
      style={styles.eventSettingItemView}
      onPress={onSettingPress(item.title, handleLogout, refRBSheet)}>
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
// Switch case Condition
const onSettingPress = (settingType, handleLogout, refRBSheet) => () => {
  switch (settingType) {
    case Strings.AccountSetting:
      return ToastInDevelopment();
    case Strings.Help:
      return ToastInDevelopment();
    case Strings.InviteFriends:
      return ToastInDevelopment();
    case Strings.ReportToAdmin:
      return ToastInDevelopment();
    case Strings.Logout:
      refRBSheet.current.close();
      handleLogout();
      break;
    default:
      return false;
  }
};
// Render Setting List
const SettingList = ({handleLogout, refRBSheet}) => {
  const renderItem = useCallback(
    item => (
      <RenderEventSetting
        item={item.item}
        {...{
          onSettingPress,
          handleLogout,
          refRBSheet,
        }}
      />
    ),
    [handleLogout, refRBSheet],
  );
  return (
    <FlatList
      data={ListEventSettings}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};
const EventSetting = ({refRBSheet}) => {
  const onClose = useCallback(() => refRBSheet.current.close(), [refRBSheet]);
  const dispatch = useDispatch();
  // LogOut Functionality
  const handleLogout = useCallback(() => dispatch(onLogout()), [dispatch]);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={Metrics.screenHeight * 0.7}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: verticalScale(20),
        },
        wrapper: {
          backgroundColor: Colors.TransparentBlack,
        },
        draggableIcon: {
          height: verticalScale(4),
          width: Metrics.screenWidth * 0.15,
          backgroundColor: Colors.DarkGreen,
        },
      }}>
      <View style={styles.contentContainer}>
        <EventSettingHeader {...{onClose}} />
        <SettingList {...{handleLogout, refRBSheet}} />
      </View>
    </RBSheet>
  );
};

export default EventSetting;
