// 3rd Party imports
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Local imports
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import {getCheckListInfoChirps} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const EventCheckList = () => {
  const [CheckLists, setCheckLists] = useState([]);
  const {eventObjectData} = useSelector(state => state.event);
  const dispatch = useDispatch();
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);

  const CheckListInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add checklist',
  );
  // get checklist infochirps data
  useEffect(() => {
    if (CheckListInfochirpsId !== undefined) {
      dispatch(
        getCheckListInfoChirps(
          eventObjectData?.id,
          CheckListInfochirpsId.id,
          result => {
            result && setCheckLists(result);
          },
        ),
      );
    }
  }, [CheckListInfochirpsId, dispatch, eventObjectData?.id]);
  /** render the checklist data */
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.renderEventPollMainView} key={index}>
        <View style={styles.questionView}>
          <View>
            <Text style={styles.questionText}>{item?.title}</Text>
            <View style={styles.separatorView} />
            {item?.items?.map((e, indexx) => (
              <View style={styles.checkListOptions}>
                <View style={styles.checkIconContainer}>
                  <Image
                    source={Icons.checkIcon}
                    style={styles.checkIconStyle}
                  />
                </View>
                <Text style={styles.optionText} key={indexx}>
                  {e}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }, []);
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.EventCheckList}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          scrollEnabled={true}
          data={CheckLists}
          keyExtractor={item => item.checkListId.toString()}
          renderItem={renderItem}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventCheckList;
