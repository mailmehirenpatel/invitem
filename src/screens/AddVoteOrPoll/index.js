// 3rd party imports
import React, {useCallback, useEffect, useState} from 'react';

import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Local Imports
import {Icons, Images} from '../../assets';
import {
  CustomDatePicker,
  CustomNavbar,
  CustomTextInput,
  FastImageView,
} from '../../components';

import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import AppConstants from '../../constants/AppConstants';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddPollInfoChirps,
  deleteEventPollInfoChirps,
  getEventInfoChirps,
  getPollInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import {uploadMediaRequest} from '../../store/actions/profileActions';
import Colors from '../../theme/Colors';
import {imageSelection} from '../../utils';
import styles from './styles';

const AddVoteOrPoll = ({route}) => {
  const {eventObjectData} = useSelector(state => state.event);

  const [voteTitle, setVoteTitle] = useState('');
  const [startDate, setStartDate] = useState(
    moment(eventObjectData?.endDate).format(AppConstants.DateFormats.Default),
  );
  const [VoteOptionsList, setVoteOptionsList] = useState([]);
  const [VoteSelectedImage, setVoteSelectedImage] = useState('');
  const [voteOption, setVoteOption] = useState('');

  const {InfoChirpsId} = route.params || {};
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);
  const [listPolls, setlistPolls] = useState([]);

  const PollInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add vote or poll',
  );
  const dispatch = useDispatch();
  useEffect(() => {
    PollInfochirpsId &&
      dispatch(
        getPollInfoChirps(eventObjectData?.id, PollInfochirpsId?.id, result => {
          result && setlistPolls(result);
        }),
      );
  }, [PollInfochirpsId, dispatch, eventObjectData?.id]);

  // Add Button Polls
  const onAddOptionPress = useCallback(() => {
    let optionData = {
      id: Math.floor(Math.random() * 100000),
      optionName: voteOption,
      image: VoteSelectedImage,
    };
    setVoteOptionsList(current => [...current, optionData]);
    setVoteOption('');
    setVoteSelectedImage('');
  }, [VoteSelectedImage, voteOption]);

  const onAddImage = useCallback(() => {
    imageSelection(false).then(res => {
      dispatch(
        uploadMediaRequest(
          res.assets[0],
          AppConstants.fileDriveName.Profile,
          (isUploaded, data) => {
            isUploaded && setVoteSelectedImage(data[0].fileUrl);
          },
        ),
      );
    });
  }, [dispatch]);

  const onSave = useCallback(() => {
    const AddPollRequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: voteTitle,
      expireOn: startDate,
      options: VoteOptionsList.map(i => {
        return {optionName: i.optionName, image: i.image};
      }),
    };
    if (voteTitle === '') {
      ToastError(Strings.EmptyVoteTitle);
    } else if (VoteOptionsList.length < 2) {
      ToastError(Strings.VoteOptionError);
    } else {
      dispatch(
        AddPollInfoChirps(AddPollRequestData, (isSuccess, message) => {
          if (isSuccess) {
            setVoteTitle('');
            setVoteOptionsList([]);
            setVoteSelectedImage('');
            ToastSuccess(message);
            dispatch(getEventInfoChirps(eventObjectData.id));
            PollInfochirpsId &&
              dispatch(
                getPollInfoChirps(
                  eventObjectData?.id,
                  PollInfochirpsId?.id,
                  result => {
                    result && setlistPolls(result);
                  },
                ),
              );
          } else {
            ToastError(message);
          }
        }),
      );
    }
  }, [
    InfoChirpsId,
    PollInfochirpsId,
    VoteOptionsList,
    dispatch,
    eventObjectData.id,
    startDate,
    voteTitle,
  ]);

  const renderListPoll = useCallback(
    ({item}) => {
      return (
        <View style={styles.renderEventPollMainView}>
          <View style={styles.questionView}>
            <View>
              <View style={styles.votePollListContainer}>
                <Text style={styles.questionText}>{item?.title}</Text>
                <Pressable
                  onPress={() => {
                    Alert.alert(
                      Strings.DeletePollOptionConfirmationPoll,
                      item.title,
                      [
                        {
                          text: Strings.No,
                          onPress: () => console.log('No Pressed'),
                          style: Strings.cancel,
                        },
                        {
                          text: Strings.Yes,
                          onPress: () => {
                            dispatch(
                              deleteEventPollInfoChirps(
                                item.pollId,
                                (isSuccess, message) => {
                                  if (isSuccess) {
                                    ToastSuccess(message);
                                    dispatch(
                                      getEventInfoChirps(eventObjectData.id),
                                    );
                                    PollInfochirpsId &&
                                      dispatch(
                                        getPollInfoChirps(
                                          eventObjectData?.id,
                                          PollInfochirpsId?.id,
                                          result => {
                                            result && setlistPolls(result);
                                          },
                                        ),
                                      );
                                  } else {
                                    ToastError(message);
                                  }
                                },
                              ),
                            );
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Image
                    source={Icons.deleteIcon}
                    style={styles.deleteIconStyle}
                  />
                </Pressable>
              </View>
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
                <Pressable style={styles.optionView}>
                  <Text style={styles.optionTitleText}>option {i + 1} : </Text>
                  <Text style={styles.optionText}>{e.options}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      );
    },
    [PollInfochirpsId, dispatch, eventObjectData.id],
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.AddVoteOrPoll}
        leftIcon={Icons.backArrowIcon}
        rightText={Strings.Save}
        onRightAction={onSave}
      />

      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.voteTitleView}>
            <Text style={styles.titleText}>{Strings.VoteTitle}</Text>

            <CustomTextInput
              value={voteTitle}
              onChangeText={val => setVoteTitle(val)}
              placeholder={Strings.TitleHere}
              inputStyle={styles.textInputStyle}
              containerStyle={styles.textInputContainerStyle}
              autoCapitalize={'words'}
            />
          </View>

          <View style={styles.titleView}>
            <Text style={styles.titleText}>{Strings.Date}</Text>
            <View style={styles.mainViewSubContainer}>
              <Text style={styles.mainViewTimeWithDescription}>
                {moment(startDate).format(AppConstants.DateFormats.TimeDate)}
              </Text>

              <CustomDatePicker
                maxDate={moment(eventObjectData?.endDate).format(
                  AppConstants.DateFormats.Default,
                )}
                selectedDate={startDate}
                setDate={date => {
                  setStartDate(date);
                }}
                containerStyle={styles.datePickerStyle}
              />
            </View>
            <View style={styles.separatorView} />
          </View>
          <View style={styles.voteOptionView}>
            <View style={styles.voteOptionUpperView}>
              <Text style={styles.titleText}>{Strings.VoteOption}</Text>

              {voteOption.length > 0 && (
                <Pressable onPress={onAddOptionPress}>
                  <Text style={styles.addMorePollOption}>
                    {Strings.AddMoreOption} +
                  </Text>
                </Pressable>
              )}
            </View>

            {VoteOptionsList && (
              <FlatList
                style={styles.optionFlatListStyle}
                scrollEnabled={false}
                data={VoteOptionsList}
                keyExtractor={item => item?.id.toString()}
                renderItem={({item}) => (
                  <View style={styles.optionListContainer}>
                    <Text style={{color: Colors.logoBackgroundColor}}>
                      {item.optionName}
                    </Text>
                    <View style={styles.deleteOptionList}>
                      {item.image && (
                        <FastImageView
                          style={styles.optionImageStyle}
                          defaultSource={Images.EventImagePlaceholder}
                          uri={
                            item.image
                              ? `${ApiConstants.ImageBaseUrl}/${item.image}`
                              : ''
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            Strings.DeletePollOptionConfirmationPoll,
                            item.optionName,
                            [
                              {
                                text: Strings.No,
                                onPress: () => console.log('No Pressed'),
                                style: Strings.cancel,
                              },
                              {
                                text: Strings.Yes,
                                onPress: () => {
                                  let NewOptionsList = VoteOptionsList.filter(
                                    i => {
                                      return i.id !== item.id;
                                    },
                                  );
                                  setVoteOptionsList(NewOptionsList);
                                },
                              },
                            ],
                            {cancelable: false},
                          );
                        }}>
                        <Image
                          source={Icons.deleteIcon}
                          style={styles.deleteIconStyle}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
            <View style={styles.addPollOptionContainer}>
              <CustomTextInput
                value={voteOption}
                onChangeText={val => setVoteOption(val)}
                placeholder={Strings.VoteOptionHere}
                inputStyle={styles.textInputStyle}
                containerStyle={styles.textInputContainerStyle}
                autoCapitalize={'words'}
              />
              <View style={styles.selectPollOptionImageContainer}>
                {VoteSelectedImage && (
                  <FastImageView
                    style={styles.selectedPollImage}
                    defaultSource={Images.EventImagePlaceholder}
                    uri={
                      VoteOptionsList
                        ? `${ApiConstants.ImageBaseUrl}/${VoteSelectedImage}`
                        : ''
                    }
                  />
                )}
                <TouchableOpacity onPress={onAddImage}>
                  <Image
                    source={Icons.addImageIcn}
                    style={styles.addImageStyle}
                  />
                </TouchableOpacity>
              </View>

              <View />
            </View>
          </View>
        </View>

        {listPolls.length > 0 ? (
          <FlatList
            style={styles.flatListContainer}
            scrollEnabled={false}
            data={listPolls}
            keyExtractor={(item, index) => item + index}
            renderItem={renderListPoll}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default AddVoteOrPoll;
