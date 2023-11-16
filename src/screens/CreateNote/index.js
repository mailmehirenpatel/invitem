// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CustomNavbar, CustomTextInput} from '../../components';
import {Strings} from '../../config/strings';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddNoteInfoChirps,
  DeleteNoteInfoChirps,
  UpdateNoteInfoChirps,
  getEventInfoChirps,
  getEventNoteInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const CreateNote = ({navigation, route}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [EdtibleObject, setEdtibleObject] = useState({});

  const {InfoChirpsId} = route.params || {};
  const {eventObjectData} = useSelector(state => state.event);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps); // get event data through id
  const dispatch = useDispatch();

  const noteInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'create note',
  );

  useEffect(() => {
    noteInfochirpsId &&
      dispatch(
        getEventNoteInfoChirps(
          eventObjectData.id,
          noteInfochirpsId.id,
          result => {
            result && setNoteList(result);
          },
        ),
      );
  }, [dispatch, eventObjectData.id, noteInfochirpsId]);

  const [NoteText, setNoteText] = useState('');
  const [NoteDescription, setNoteDescription] = useState('');
  const [NoteList, setNoteList] = useState([]);

  const onSaveAction = useCallback(() => {
    const RequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: NoteText,
      description: NoteDescription,
    };

    const UpdateRequestData = {
      id: EdtibleObject.id,
      eventId: eventObjectData.id,
      infoChirpId: EdtibleObject.eventInfoChirpId,
      title: NoteText,
      description: NoteDescription,
    };

    if (NoteText.length === 0) {
      ToastError(Strings.BlankNoteTitleError);
    } else if (NoteDescription.length === 0) {
      ToastError(Strings.BlankNoteDescriptionError);
    } else {
      isEdit
        ? dispatch(
            UpdateNoteInfoChirps(UpdateRequestData, (isSuccess, message) => {
              if (isSuccess) {
                ToastSuccess(message);
                setIsEdit(false);
                dispatch(getEventInfoChirps(eventObjectData.id));
                setNoteText('');
                setNoteDescription('');
                noteInfochirpsId &&
                  dispatch(
                    getEventNoteInfoChirps(
                      eventObjectData.id,
                      noteInfochirpsId.id,
                      result => {
                        result && setNoteList(result);
                      },
                    ),
                  );
              } else {
                ToastError(message);
              }
            }),
          )
        : dispatch(
            AddNoteInfoChirps(RequestData, (isSuccess, message) => {
              if (isSuccess) {
                ToastSuccess(message);
                dispatch(getEventInfoChirps(eventObjectData.id));
                setNoteText('');
                setNoteDescription('');
                noteInfochirpsId &&
                  dispatch(
                    getEventNoteInfoChirps(
                      eventObjectData.id,
                      noteInfochirpsId.id,
                      result => {
                        result && setNoteList(result);
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
    EdtibleObject.eventInfoChirpId,
    EdtibleObject.id,
    InfoChirpsId,
    NoteDescription,
    NoteText,
    dispatch,
    eventObjectData.id,
    isEdit,
    noteInfochirpsId,
  ]);

  return (
    <MenuProvider>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.CreateNote}
        rightText={isEdit ? Strings.update : Strings.Save}
        onRightAction={onSaveAction}
      />
      <View style={styles.mainEventContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.mainViewContainer}>
            <Text style={styles.mainViewTitle}>{Strings.title}</Text>
            <CustomTextInput
              placeholder={Strings.EnterNoteTitle}
              inputStyle={styles.textInputStyle}
              containerStyle={styles.textInputContainerStyle}
              value={NoteText}
              onChangeText={txt => setNoteText(txt)}
              returnKeyType={'next'}
              autoCapitalize={'words'}
            />
            <View style={styles.seperator} />

            <Text style={styles.mainViewTitle}>{Strings.Description}</Text>
            <CustomTextInput
              placeholder={Strings.AddNoteText}
              inputStyle={styles.textInputDescriptionStyle}
              containerStyle={styles.textInputContainerDescriptionStyle}
              multiline={true}
              numberOfLines={6}
              value={NoteDescription}
              onChangeText={txt => setNoteDescription(txt)}
              returnKeyType={'done'}
              autoCapitalize={'words'}
            />
          </View>

          <FlatList
            scrollEnabled={true}
            style={styles.flatListContainer}
            data={NoteList ? NoteList : []}
            renderItem={({item, index}) => (
              <View style={styles.eventNoteDataContainer}>
                <View style={styles.txttitleview}>
                  <Text style={styles.eventNoteDataTitle}>
                    {Strings.title} :
                  </Text>
                  <View style={styles.detailsview}>
                    <Menu>
                      <MenuTrigger>
                        <Image
                          style={styles.iconThreeDots}
                          source={Icons.threeDots}
                        />
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption
                          onSelect={() => {
                            setIsEdit(true);
                            setNoteText(item.title);
                            setNoteDescription(item.description);
                            setEdtibleObject(item);
                          }}>
                          <Text style={styles.txtEdit}>{Strings.Edit}</Text>
                        </MenuOption>
                        <MenuOption
                          onSelect={() => {
                            Alert.alert(
                              Strings.DeleteNoteConfirmation,
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
                                      DeleteNoteInfoChirps(
                                        item.id,
                                        (isSuccess, message) => {
                                          if (isSuccess) {
                                            ToastSuccess(message);
                                            setIsEdit(false);
                                            dispatch(
                                              getEventInfoChirps(
                                                eventObjectData.id,
                                              ),
                                            );
                                            noteInfochirpsId &&
                                              dispatch(
                                                getEventNoteInfoChirps(
                                                  eventObjectData.id,
                                                  noteInfochirpsId.id,
                                                  result => {
                                                    result &&
                                                      setNoteList(result);
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
                          <Text style={styles.txtDelete}>{Strings.Delete}</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
                <Text style={styles.eventNoteDataDescription}>
                  {item.title}
                </Text>

                <Text style={styles.eventNoteDataTitle}>
                  {Strings.Description} :
                </Text>
                <Text style={styles.eventNoteDataDescription}>
                  {item.description}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </MenuProvider>
  );
};

export default CreateNote;
