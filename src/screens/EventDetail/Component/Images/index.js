// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// Local Imports
import {Images} from '../../../../assets';
import {FastImageView} from '../../../../components';
import GoogleAdsComponent from '../../../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../../../config/strings';
import ApiConstants from '../../../../constants/ApiConstants';
import EventImagePopup from './../EventImagePopup';
import styles from './styles';
import {getImageByEventId} from '../../../../store/actions/ChatAction';

const EventImage = ({eventObjectData}) => {
  const {imageData} = useSelector(state => state.chat);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setEvent] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false); // Pull to refresh.
  const dispatch = useDispatch();

  // Image Selection Functionality
  const onImageSelection = useCallback(
    event => () => {
      setModalVisible(prev => !prev);
      setEvent(event);
    },
    [],
  );

  // Pull to Refresh functionality
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([dispatch(getImageByEventId(eventObjectData?.id))]).then(() => {
      setRefreshing(false);
    });
  }, [dispatch, eventObjectData?.id]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={Images.InvitemBackgroundImg}
        style={{flex: 1}}
        resizeMode="cover">
        {imageData?.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.gridContainer}
            numColumns={2}
            data={imageData}
            keyExtractor={item => item?.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => (
              <Pressable
                key={index}
                style={styles.eventImageView}
                onPress={onImageSelection(item)}>
                <FastImageView
                  style={styles.eventImage}
                  defaultSource={Images.EventImagePlaceholder}
                  uri={
                    item.image
                      ? `${ApiConstants.ImageBaseUrl}/${item.image}`
                      : ''
                  }
                />
              </Pressable>
            )}
          />
        ) : (
          <View style={styles.NoImgFoundView}>
            <Text style={styles.NoImgFoundTxt}>{Strings.NOImgFound}</Text>
          </View>
        )}
      </ImageBackground>
      <EventImagePopup {...{isModalVisible, setModalVisible, selectedEvent}} />
      <GoogleAdsComponent />
    </View>
  );
};
export default EventImage;
