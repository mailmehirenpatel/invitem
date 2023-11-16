// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';

// Local Imports
import {Icons, Images} from '../../assets';
import {CustomNavbar, FastImageView} from '../../components';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';

import {useDispatch, useSelector} from 'react-redux';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import ApiConstants from '../../constants/ApiConstants';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  getPollInfoChirps,
  responseEventPollInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const EventPoll = ({navigation, route}) => {
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);

  const [PollList, setPollList] = useState([]);
  const {eventObjectData} = useSelector(state => state.event);
  const PollInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add vote or poll',
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPollInfoChirps(eventObjectData?.id, PollInfochirpsId.id, result => {
        result && setPollList(result);
      }),
    );
  }, [PollInfochirpsId.id, dispatch, eventObjectData?.id]);

  // Navigate To Other Screen
  const onVotePress = useCallback(
    item => {
      const requestPollanswerData = {
        pollId: item.pollId,
        pollOptionId: item.options.filter(j => j.isSelected)[0]?.optionId,
      };

      item.options.filter(j => j.isSelected).length !== 0
        ? dispatch(
            responseEventPollInfoChirps(
              requestPollanswerData,
              (isSuccess, message) => {
                if (isSuccess) {
                  ToastSuccess(message);
                  navigation.navigate(NavigationRoutes.PollResults, {
                    PollId: item.pollId,
                  });
                } else {
                  ToastError(message);
                }
              },
            ),
          )
        : ToastError(Strings.EmptyPollOption);
    },

    [dispatch, navigation],
  );

  // FlatList Render Items
  const renderItem = useCallback(
    ({item}) => {
      return (
        <View style={styles.renderEventPollMainView}>
          <View style={styles.questionView}>
            <View>
              <Text style={styles.questionText}>{item?.title}</Text>

              <View style={styles.separatorView} />
            </View>
          </View>

          {item?.options?.map((e, i) => {
            return (
              <View key={e.optionId}>
                {e.image && (
                  <FastImageView
                    style={styles.optionImageStyle}
                    defaultSource={Images.EventImagePlaceholder}
                    uri={
                      e.image ? `${ApiConstants.ImageBaseUrl}/${e.image}` : ''
                    }
                  />
                )}
                <Pressable
                  style={styles.optionView}
                  onPress={() => {
                    let selected = item.options.map(itemm => {
                      return itemm.options === e.options
                        ? {...itemm, isSelected: true}
                        : {...itemm, isSelected: false};
                    });

                    let new_item = item;
                    new_item = {...new_item, options: selected};

                    let new_pollList = PollList.map(ii => {
                      return ii.pollId === item.pollId ? new_item : ii;
                    });

                    setPollList(new_pollList);
                  }}>
                  <Image
                    source={
                      e?.isSelected
                        ? Icons.radioBtnSelected
                        : Icons.radioBtnUnSelected
                    }
                    style={styles.radioIconStyle}
                  />
                  <Text style={styles.optionText}>{e.options}</Text>
                </Pressable>
              </View>
            );
          })}
          <View style={styles.voteView}>
            <Pressable
              style={styles.voteBtn}
              onPress={() => {
                onVotePress(item);
              }}>
              <Text style={styles.voteText}>{Strings.Vote}</Text>
            </Pressable>
          </View>
        </View>
      );
    },
    [PollList, onVotePress],
  );
  return (
    <View style={styles.container}>
      <CustomNavbar title={Strings.EventPoll} leftIcon={Icons.backArrowIcon} />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          scrollEnabled={true}
          data={PollList}
          keyExtractor={item => item.pollId.toString()}
          renderItem={renderItem}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventPoll;
