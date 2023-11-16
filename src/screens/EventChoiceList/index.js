import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Icons, Images} from '../../assets';
import {CustomNavbar, FastImageView} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  getChoiceInfoChirps,
  responseEventChoiceInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const EventChoiceList = ({navigation, route}) => {
  const [choiceList, setChoiceList] = useState([]);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);
  const {eventObjectData} = useSelector(state => state.event);
  const ChoiceListInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add choicelist',
  );

  const dispatch = useDispatch();
  useEffect(() => {
    ChoiceListInfochirpsId &&
      dispatch(
        getChoiceInfoChirps(
          eventObjectData?.id,
          ChoiceListInfochirpsId.id,
          result => {
            result && setChoiceList(result);
          },
        ),
      );
  }, [ChoiceListInfochirpsId, dispatch, eventObjectData?.id]);

  const onChoicePress = useCallback(
    item => {
      const requestChoiceanswerData = {
        choiceListId: item.choiceListId,
        choiceListOptionId: item.options.filter(j => j.isSelected)[0]?.optionId,
      };

      item.options.filter(j => j.isSelected).length !== 0
        ? dispatch(
            responseEventChoiceInfoChirps(
              requestChoiceanswerData,
              (isSuccess, message) => {
                if (isSuccess) {
                  ToastSuccess(message);
                  navigation.navigate(NavigationRoutes.ChoiceResults, {
                    choiceListId: item.choiceListId,
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

  // get choice list data
  const renderItem = useCallback(
    ({item}) => {
      return (
        <ScrollView>
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

                      let new_choiceList = choiceList.map(ii => {
                        return ii.choiceListId === item.choiceListId
                          ? new_item
                          : ii;
                      });

                      setChoiceList(new_choiceList);
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
            {item.image && (
              <FastImageView
                style={styles.optionImageStyle}
                defaultSource={Images.EventImagePlaceholder}
                uri={
                  item.image ? `${ApiConstants.ImageBaseUrl}/${item.image}` : ''
                }
              />
            )}
            <View style={styles.voteView}>
              <Pressable
                style={styles.voteBtn}
                onPress={() => {
                  onChoicePress(item);
                }}>
                <Text style={styles.voteText}>{Strings.Vote}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      );
    },
    [choiceList, onChoicePress],
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.EventChoiceList}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          scrollEnabled={true}
          data={choiceList}
          keyExtractor={item => item?.choiceListId.toString()}
          renderItem={renderItem}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventChoiceList;
