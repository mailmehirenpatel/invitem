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
import {getChoiceListResult} from '../../store/actions/InfoChirpsAction';
import Colors from '../../theme/Colors';
import styles from './styles';

const ChoiceResult = ({navigation, route}) => {
  const {eventObjectData} = useSelector(state => state.event);
  const [choiceResult, setChoiceResult] = useState([]);
  const {choiceListId} = route.params || {};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getChoiceListResult(choiceListId, result => {
        result && setChoiceResult(result);
      }),
    );
  }, [choiceListId, dispatch]);

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
        title={Strings.ChoiceResult}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          contentContainerStyle={styles.contentContainerView}
          scrollEnabled={true}
          data={choiceResult.options}
          keyExtractor={item => item?.optionId.toString()}
          renderItem={renderItem}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default ChoiceResult;
