// 3rd Party Imports
import React, {useCallback} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CustomNavbar, CustomProfileImage} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import styles from './styles';

const GuestList = () => {
  const {eventObjectData} = useSelector(state => state.event); // get event data through id

  // FlatList Render Items
  const RenderGuestList = useCallback(({item, index}) => {
    return (
      <View style={styles.guestListContainer} key={index}>
        <View style={styles.guestListContainerView}>
          <CustomProfileImage
            image={item.participantImage}
            imageStyle={styles.profileImageStyle}
          />
          <Text style={styles.guestListText}>{item.participantName}</Text>
        </View>
        {item.isAdmin && (
          <View style={styles.guestTextContainer}>
            <Text style={styles.guestText}>{Strings.Admin}</Text>
          </View>
        )}
        {item.isGuest && (
          <View style={styles.guestTextContainer}>
            <Text style={styles.guestText}>{Strings.Guest}</Text>
          </View>
        )}
      </View>
    );
  }, []);
  return (
    <View style={styles.guestListMainContainer}>
      <CustomNavbar leftIcon={Icons.backArrowIcon} title={Strings.Guest} />
      <View style={styles.guestListContentContainer}>
        <View style={styles.guestListMainView}>
          {eventObjectData?.eventParticipants?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={eventObjectData?.eventParticipants}
              renderItem={RenderGuestList}
              keyExtractor={item => item.id?.toString()}
            />
          ) : (
            <View style={styles.emptyDataView}>
              <Text style={styles.emptyDataText}>
                {Strings.NoUserFoundError}
              </Text>
            </View>
          )}
        </View>
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default GuestList;
