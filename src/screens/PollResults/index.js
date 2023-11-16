// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Metrics, verticalScale} from '../../config/metrics';
import {Strings} from '../../config/strings';
import {getPollResult} from '../../store/actions/InfoChirpsAction';
import Colors from '../../theme/Colors';
import styles from './styles';

const PollResults = ({navigation, route}) => {
  const {eventObjectData} = useSelector(state => state.event);
  const [pollResult, setpollResult] = useState([]);
  const {PollId} = route.params || {};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPollResult(PollId, result => {
        result && setpollResult(result);
      }),
    );
  }, [PollId, dispatch]);

  // FlatList Render Items
  const renderItem = useCallback(
    ({item, index}) => (
      <View style={styles.renderMainView}>
        <View style={styles.optionVotesView}>
          <Text style={styles.selectedOptionText}>{item?.options}</Text>
          <Text
            style={
              styles.votesText
            }>{`${item.optionCount} ${Strings.Votes}`}</Text>
        </View>
        <Progress.Bar
          progress={
            item?.optionCount / eventObjectData.eventParticipants.length
          }
          height={verticalScale(10)}
          width={Metrics.screenWidth * 0.81}
          color={Colors.logoBackgroundColor}
          borderWidth={0}
          unfilledColor={`${Colors.DarkGreen}20`}
        />
      </View>
    ),
    [eventObjectData.eventParticipants.length],
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.PollResults}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          contentContainerStyle={styles.contentContainerView}
          scrollEnabled={true}
          data={pollResult.options}
          keyExtractor={item => item?.optionId.toString()}
          renderItem={renderItem}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default PollResults;
