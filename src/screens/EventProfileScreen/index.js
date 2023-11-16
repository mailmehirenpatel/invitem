// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';

// Local Imports
import {Icons} from '../../assets';
import {
  CustomNavbar,
  CustomProfileImage,
  CustomSwitch,
  CircleFilledIcon,
} from '../../components';
import {Strings} from '../../config/strings';
import mockImages from '../../constants/MockImages/images';
import {AddUserData, EventProfileNotifications} from '../../constants/mockdata';
import styles from './styles';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';

const EventProfile = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Render Event Profile Data
  const RenderEventProfileData = useCallback(
    ({item, index}) => {
      const handleSwitchChange = () => {
        setSelectedItems(prevSelectedItems => {
          const updatedSelectedItems = [...prevSelectedItems];
          updatedSelectedItems[index] = !updatedSelectedItems[index];
          return updatedSelectedItems;
        });
      };
      return (
        <View style={styles.eventProfileNotificationContainer} key={index}>
          <View style={styles.eventProfileNotificationView}>
            <View
              style={[
                styles.eventProfileNotification,
                {
                  backgroundColor: item.color,
                },
              ]}>
              <Image source={item.image} style={styles.eventProfileImage} />
            </View>
            <Text style={styles.eventProfileText}>{item.name}</Text>
          </View>
          <CustomSwitch
            onValueChange={handleSwitchChange}
            isEnabled={selectedItems[index]}
          />
        </View>
      );
    },
    [selectedItems],
  );

  // FlatList Render Items
  const RenderItem = useCallback(({item, index}) => {
    return (
      <View key={index}>
        <View style={styles.eventProfileParticipateContainer}>
          <View style={styles.eventProfileContainer}>
            <CustomProfileImage image={item.image} />
            <Text style={styles.eventProfileParticipateName}>{item.name}</Text>
          </View>
          <View
            style={[
              styles.eventProfileParticipateView,
              {
                backgroundColor: item.color,
              },
            ]}>
            <CircleFilledIcon
              icon={Icons.micIcon}
              iconStyle={styles.micIconStyle}
            />
          </View>
        </View>
      </View>
    );
  }, []);

  // Render FlatList Header Data
  const RenderHeaderData = useCallback(() => {
    return (
      <View style={styles.headerListComponent}>
        <Text style={styles.participantTextStyle}>
          {Strings.participantNumber}
        </Text>
        <Image source={Icons.searchIcon} style={styles.searchIconStyle} />
      </View>
    );
  }, []);

  return (
    <View style={styles.eventProfileMainContainer}>
      <CustomNavbar leftIcon={Icons.backArrowIcon} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <View style={styles.eventProfileTopContainer}>
          <Image source={mockImages.Hockey} style={styles.eventProfileLogo} />

          <Text style={styles.mainHeading}>{Strings.JuniorLeague}</Text>
        </View>

        <View style={styles.eventProfileNotificationMainContainer}>
          <View style={styles.scrollViewNotificationStyle}>
            <FlatList
              scrollEnabled={false}
              data={EventProfileNotifications}
              renderItem={RenderEventProfileData}
              keyExtractor={item => item.id?.toString()}
            />
          </View>
        </View>

        <View style={styles.eventProfileParticipantMainContainer}>
          <FlatList
            data={AddUserData}
            scrollEnabled={false}
            renderItem={RenderItem}
            keyExtractor={item => item?.id.toString()}
            ListHeaderComponent={RenderHeaderData}
          />
        </View>
      </ScrollView>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventProfile;
