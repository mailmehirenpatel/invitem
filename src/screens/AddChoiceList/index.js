// 3rd Party Imports
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
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons, Images} from '../../assets';
import {CustomNavbar, CustomTextInput, FastImageView} from '../../components';
import {Strings} from '../../config/strings';
import ApiConstants from '../../constants/ApiConstants';
import AppConstants from '../../constants/AppConstants';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddChoiceListInfoChirps,
  deleteEventChoiceInfoChirps,
  getChoiceInfoChirps,
  getEventInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import {uploadMediaRequest} from '../../store/actions/profileActions';
import Colors from '../../theme/Colors';
import {imageSelection} from '../../utils';
import styles from './styles';

const AddChoiceList = ({route}) => {
  const [choiceListTitle, setChoiceListTitle] = useState();
  const [choiceListOptions, setChoiceListOptions] = useState([]);
  const [choiceListOptionList, setChoiceListOptionList] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const {InfoChirpsId} = route.params || {};
  const {eventObjectData} = useSelector(state => state.event);
  const [listChoices, setListChoices] = useState([]);

  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);

  const ChoiceListInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add choicelist',
  );
  const dispatch = useDispatch();

  /** Get choice list infotabs data */
  useEffect(() => {
    ChoiceListInfochirpsId &&
      dispatch(
        getChoiceInfoChirps(
          eventObjectData?.id,
          ChoiceListInfochirpsId.id,
          result => {
            result && setListChoices(result);
          },
        ),
      );
  }, [ChoiceListInfochirpsId, dispatch, eventObjectData?.id]);

  // Select Image
  const onBrowse = useCallback(() => {
    imageSelection(false).then(res => {
      dispatch(
        uploadMediaRequest(
          res.assets[0],
          AppConstants.fileDriveName.Profile,
          (isUploaded, data) => {
            isUploaded && setSelectedFile(data[0].fileUrl);
          },
        ),
      );
    });
  }, [dispatch]);

  // Add Choice-List
  const onAddOptionPress = useCallback(() => {
    let optionData = {
      id: Math.floor(Math.random() * 100000),
      optionName: choiceListOptions,
    };
    setChoiceListOptionList(current => [...current, optionData]);
    setChoiceListOptions('');
  }, [choiceListOptions]);

  const onSave = useCallback(() => {
    const AddChoiceListRequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: choiceListTitle,
      image: selectedFile,
      options: choiceListOptionList.map(i => {
        return {optionName: i.optionName};
      }),
    };
    if (choiceListTitle === '') {
      ToastError(Strings.EmptyChoiceListTitleTitle);
    } else if (choiceListOptionList.length < 2) {
      ToastError(Strings.ChoicelistOptionError);
    } else {
      dispatch(
        AddChoiceListInfoChirps(
          AddChoiceListRequestData,
          (isSuccess, message) => {
            if (isSuccess) {
              setChoiceListTitle('');
              setChoiceListOptionList([]);
              setSelectedFile('');
              ToastSuccess(message);
              dispatch(getEventInfoChirps(eventObjectData.id));
              ChoiceListInfochirpsId &&
                dispatch(
                  getChoiceInfoChirps(
                    eventObjectData?.id,
                    ChoiceListInfochirpsId.id,
                    result => {
                      result && setListChoices(result);
                    },
                  ),
                );
            } else {
              ToastError(message);
            }
          },
        ),
      );
    }
  }, [
    ChoiceListInfochirpsId,
    InfoChirpsId,
    choiceListOptionList,
    choiceListTitle,
    dispatch,
    eventObjectData.id,
    selectedFile,
  ]);
  const renderChoiceList = useCallback(
    ({item, index}) => {
      return (
        <View style={styles.renderEventPollMainView} key={index}>
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
                              deleteEventChoiceInfoChirps(
                                item.choiceListId,
                                (isSuccess, message) => {
                                  if (isSuccess) {
                                    ToastSuccess(message);
                                    dispatch(
                                      getEventInfoChirps(eventObjectData.id),
                                    );
                                    ChoiceListInfochirpsId &&
                                      dispatch(
                                        getChoiceInfoChirps(
                                          eventObjectData?.id,
                                          ChoiceListInfochirpsId.id,
                                          result => {
                                            result && setListChoices(result);
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
          {item.image && (
            <FastImageView
              style={styles.optionImageStyle}
              defaultSource={Images.EventImagePlaceholder}
              uri={
                item.image ? `${ApiConstants.ImageBaseUrl}/${item.image}` : ''
              }
            />
          )}

          {item?.options?.map((e, i) => {
            return (
              <Pressable style={styles.optionView}>
                <Text style={styles.optionTitleText}>option {i + 1} : </Text>
                <Text style={styles.optionText}>{e.options}</Text>
              </Pressable>
            );
          })}
        </View>
      );
    },
    [ChoiceListInfochirpsId, dispatch, eventObjectData.id],
  );
  return (
    <ScrollView style={styles.container}>
      <CustomNavbar
        title={Strings.AddChoiceList}
        leftIcon={Icons.backArrowIcon}
        rightText={Strings.Save}
        onRightAction={onSave}
      />
      <View style={styles.contentContainer}>
        <View style={styles.mainView}>
          <View style={styles.choiceOptionView}>
            <View>
              <Text style={styles.titleText}>{Strings.ChoiceTitle}</Text>
              <CustomTextInput
                value={choiceListTitle}
                onChangeText={val => setChoiceListTitle(val)}
                placeholder={Strings.choiceListTitle}
                inputStyle={styles.textInputStyle}
                containerStyle={styles.textInputContainerStyle}
                autoCapitalize={'words'}
              />
            </View>
            <View>
              <View style={styles.choiceOptionContainer}>
                <Text style={styles.titleText}>
                  {Strings.choiceListOptions}
                </Text>
                {choiceListOptions.length > 0 && (
                  <Pressable onPress={onAddOptionPress}>
                    <Text style={styles.addMorePollOption}>
                      {Strings.AddMoreOption} +
                    </Text>
                  </Pressable>
                )}
              </View>
              {choiceListOptionList && (
                <FlatList
                  style={styles.optionFlatListStyle}
                  scrollEnabled={false}
                  data={choiceListOptionList}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.optionListContainer} key={index}>
                        <Text style={{color: Colors.logoBackgroundColor}}>
                          {item.optionName}
                        </Text>
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
                                    let NewOptionsList =
                                      choiceListOptionList.filter(i => {
                                        return i.id !== item.id;
                                      });
                                    setChoiceListOptionList(NewOptionsList);
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
                    );
                  }}
                />
              )}
              <CustomTextInput
                value={choiceListOptions}
                onChangeText={val => setChoiceListOptions(val)}
                placeholder={Strings.ChoiceOptionHere}
                inputStyle={styles.textInputStyle}
                containerStyle={styles.textInputContainerStyle}
                autoCapitalize={'words'}
              />
            </View>
          </View>
          <View>
            {selectedFile && (
              <FastImageView
                style={styles.selectedPollImage}
                defaultSource={Images.EventImagePlaceholder}
                uri={
                  choiceListOptionList
                    ? `${ApiConstants.ImageBaseUrl}/${selectedFile}`
                    : ''
                }
              />
            )}
            <Pressable
              style={styles.multiImagesBrowseContainer}
              onPress={onBrowse}>
              <Image style={styles.uploadIcon} source={Icons.uploadFile} />
              <Text style={styles.uploadFilesText}>
                {Strings.UploadYourFilesHere}
              </Text>
              <Text style={styles.browseText}>{Strings.Browse}</Text>
            </Pressable>
          </View>
        </View>

        {listChoices.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={listChoices}
            keyExtractor={(item, index) => item + index}
            renderItem={renderChoiceList}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default AddChoiceList;
