// 3rd Part Imports
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';

// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar, CustomTextInput} from '../../components';
import {Strings} from '../../config/strings';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddCheckListInfoChirps,
  deleteCheckListInfoChirps,
  getCheckListInfoChirps,
  getEventInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import Colors from '../../theme/Colors';
import styles from './styles';

const AddCheckList = ({navigation, route}) => {
  const [checkListTitle, setCheckListTitle] = useState('');
  const [checkListOption, setCheckListOption] = useState('');
  const [checkOptionList, setCheckOptionList] = useState([0]);
  const [checkLists, setCheckLists] = useState([]);
  const dispatch = useDispatch();
  const {InfoChirpsId} = route.params || {};
  const {eventObjectData} = useSelector(state => state.event);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);

  const CheckListInfochirpsId = EventInfoChirpsData?.find(
    i => i.name === 'add checklist',
  );

  const setInputValue = (index, value) => {
    const newArray = [...checkOptionList];
    newArray[index] = value;
    setCheckOptionList(newArray);
    setCheckListOption('');
  };

  /**get checklist infochirps data */
  useEffect(() => {
    CheckListInfochirpsId &&
      dispatch(
        getCheckListInfoChirps(
          eventObjectData?.id,
          CheckListInfochirpsId.id,
          result => {
            result && setCheckLists(result);
          },
        ),
      );
  }, [CheckListInfochirpsId, dispatch, eventObjectData.id]);

  // Add More checklist options functionality.
  const onAddOptionPress = useCallback(() => {
    setCheckOptionList(current => [...current, checkListOption]);
    setCheckListOption('');
  }, [checkListOption]);

  const onSave = useCallback(() => {
    const resCheckOptionList = checkOptionList.filter(element => {
      return element !== null && element !== '' && element !== undefined;
    });

    const AddCheckListRequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: checkListTitle,
      itemJson: resCheckOptionList,
    };

    if (checkListTitle === '') {
      ToastError(Strings.EmptyChecklistTitle);
    } else if (checkOptionList.length < 1) {
      ToastError(Strings.ChecklistOptionError);
    } else {
      dispatch(
        // Add Checklist Api Call
        AddCheckListInfoChirps(
          AddCheckListRequestData,
          (isSuccess, message) => {
            if (isSuccess) {
              setCheckListTitle('');
              setCheckOptionList([0]);
              ToastSuccess(message);
              dispatch(getEventInfoChirps(eventObjectData.id));
              CheckListInfochirpsId &&
                dispatch(
                  getCheckListInfoChirps(
                    eventObjectData?.id,
                    CheckListInfochirpsId.id,
                    result => {
                      result && setCheckLists(result);
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
    CheckListInfochirpsId,
    InfoChirpsId,
    checkListTitle,
    checkOptionList,
    dispatch,
    eventObjectData.id,
  ]);

  /** Get All checklist details View with delete functionality */
  const renderCheckLists = useCallback(
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
                      Strings.DeleteCheckListOptionConfirmationPoll,
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
                              deleteCheckListInfoChirps(
                                item.checkListId,
                                (isSuccess, message) => {
                                  if (isSuccess) {
                                    ToastSuccess(message);
                                    dispatch(
                                      getEventInfoChirps(eventObjectData.id),
                                    );
                                    CheckListInfochirpsId &&
                                      dispatch(
                                        getCheckListInfoChirps(
                                          eventObjectData?.id,
                                          CheckListInfochirpsId.id,
                                          result => {
                                            result && setCheckLists(result);
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
            {item?.items?.map((e, indexx) => {
              return (
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
              );
            })}
          </View>
        </View>
      );
    },
    [CheckListInfochirpsId, dispatch, eventObjectData.id],
  );

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.AddCheckList}
        rightText={Strings.Save}
        onRightAction={onSave}
      />

      <View style={styles.contentContainer}>
        <View style={styles.mainView}>
          <View style={styles.voteTitleView}>
            <Text style={styles.titleText}>{Strings.CheckListTitle}</Text>

            <CustomTextInput
              value={checkListTitle}
              onChangeText={val => setCheckListTitle(val)}
              placeholder={Strings.TitleHere}
              inputStyle={styles.textInputStyle}
              containerStyle={styles.textInputContainerStyle}
              autoCapitalize={'words'}
            />
            <View style={styles.seperator} />
          </View>

          <View style={styles.voteOptionView}>
            <View style={styles.voteOptionUpperView}>
              <Text style={styles.titleText}>{Strings.AddCheckList}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
              {checkOptionList &&
                checkOptionList.map((val, index) => (
                  <View style={styles.optionListContainer} key={index}>
                    <TextInput
                      value={val}
                      placeholder={Strings.AddListHere}
                      autoCapitalize={'words'}
                      returnKeyType={'done'}
                      style={{color: Colors.logoBackgroundColor}}
                      onChangeText={value => setInputValue(index, value)}
                      onSubmitEditing={onAddOptionPress}
                    />
                    <View style={styles.deleteOptionList}>
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            Strings.DeletePollOptionConfirmationPoll,
                            '' + val,
                            [
                              {
                                text: Strings.No,
                                onPress: () => console.log('No Pressed'),
                                style: Strings.cancel,
                              },
                              {
                                text: Strings.Yes,
                                onPress: () => {
                                  let NewOptionsList = checkOptionList.filter(
                                    i => {
                                      return i !== val;
                                    },
                                  );
                                  setCheckOptionList(NewOptionsList);
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
                ))}
            </ScrollView>
          </View>
        </View>
        {checkLists.length > 0 ? (
          <FlatList
            style={styles.flatListContainer}
            scrollEnabled={true}
            data={checkLists}
            keyExtractor={item => item?.checkListId.toString()}
            renderItem={renderCheckLists}
          />
        ) : null}
      </View>
    </View>
  );
};

export default AddCheckList;
