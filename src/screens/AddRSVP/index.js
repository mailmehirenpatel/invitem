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

// Local Imports
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavbar,
  CustomTextInput,
} from '../../components';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {
  AddRSVPInfoChirps,
  DeleteRSVP,
  getEventInfoChirps,
  getEventRSVPInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const AddRSVP = ({route}) => {
  const {InfoChirpsId} = route.params || {};
  const {eventObjectData} = useSelector(state => state.event);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps); // get event data through id
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [SelectedDate, setDate] = useState(
    moment().format(AppConstants.DateFormats.Default),
  );
  const [SelectedTime, setTime] = useState(moment().format('HH:mm:ss'));
  const [RsvpList, setRsvpList] = useState([]);

  const rsvpInfochirpsId = EventInfoChirpsData?.find(
    i => i?.name === 'add rsvp',
  );

  useEffect(() => {
    rsvpInfochirpsId &&
      dispatch(
        getEventRSVPInfoChirps(
          eventObjectData?.id,
          rsvpInfochirpsId.id,
          result => {
            result && setRsvpList(result);
          },
        ),
      );
  }, [dispatch, eventObjectData.id, rsvpInfochirpsId]);

  // Save Form Data
  const onSave = useCallback(() => {
    const RequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: title,
      description: description,
      date:
        moment(SelectedDate).format(AppConstants.DateFormats.Default) +
        'T' +
        SelectedTime,
    };

    if (title === '') {
      ToastError("Title can't be blank..");
    } else if (description === '') {
      ToastError("Description can't be blank..");
    } else {
      dispatch(
        AddRSVPInfoChirps(RequestData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            // setIsEdit(false);
            dispatch(getEventInfoChirps(eventObjectData.id));
            setTitle('');
            setDescription('');
            setDate(moment().format(AppConstants.DateFormats.Default));
            setTime(moment().format('HH:mm:ss'));
            rsvpInfochirpsId &&
              dispatch(
                getEventRSVPInfoChirps(
                  eventObjectData?.id,
                  rsvpInfochirpsId.id,
                  result => {
                    result && setRsvpList(result);
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
    SelectedDate,
    SelectedTime,
    description,
    dispatch,
    eventObjectData.id,
    rsvpInfochirpsId,
    title,
  ]);

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.AddRSVP}
        leftIcon={Icons.backArrowIcon}
        rightText={Strings.Save}
        onRightAction={onSave}
      />
      <MenuProvider style={styles.contentContainer}>
        <View style={styles.mainView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{Strings.title}</Text>
            <CustomTextInput
              value={title}
              onChangeText={val => setTitle(val)}
              placeholder={Strings.TitleHere}
              inputStyle={styles.textInputStyle}
              containerStyle={styles.textInputContainerStyle}
              autoCapitalize={'words'}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{Strings.Description}</Text>
            <CustomTextInput
              multiline
              value={description}
              onChangeText={val => setDescription(val)}
              placeholder={Strings.Description}
              inputStyle={styles.descriptionTextInputStyle}
              containerStyle={styles.textInputContainerStyle}
              autoCapitalize={'sentences'}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{Strings.Date}</Text>
            <View style={styles.mainViewSubContainer}>
              <Text style={styles.mainViewTimeWithDescription}>
                {moment(SelectedDate).format(AppConstants.DateFormats.Default)}
              </Text>
              <CustomDatePicker
                Mode="date"
                minDate={moment().format(AppConstants.DateFormats.Default)}
                selectedDate={SelectedDate}
                setDate={date => {
                  setDate(date);
                }}
              />
            </View>
            <View style={styles.mainViewSubContainer}>
              <Text style={styles.mainViewTimeWithDescription}>
                {SelectedTime}
              </Text>
              <CustomDatePicker
                isClock
                Mode="time"
                selectedDate={SelectedTime}
                setDate={time => {
                  setTime(moment(time).format('HH:mm:ss'));
                }}
              />
            </View>
          </View>
        </View>
        <FlatList
          style={styles.flatListContainer}
          data={RsvpList ? RsvpList : []}
          renderItem={({item, index}) => {
            return (
              <View style={styles.rsvpDataContainer}>
                <View style={styles.txttitleview}>
                  <Text style={styles.rsvpDataTitle}>
                    {Strings.title} :{' '}
                    <Text style={styles.RSVPDataDescription}>{item.title}</Text>
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
                            Alert.alert(
                              Strings.DeleteRSVPConfirmation,
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
                                      DeleteRSVP(
                                        item.rsvpId,
                                        (isSuccess, message) => {
                                          if (isSuccess) {
                                            ToastSuccess(message);
                                            dispatch(
                                              getEventInfoChirps(
                                                eventObjectData.id,
                                              ),
                                            );
                                            rsvpInfochirpsId &&
                                              dispatch(
                                                getEventRSVPInfoChirps(
                                                  eventObjectData?.id,
                                                  rsvpInfochirpsId.id,
                                                  result => {
                                                    result &&
                                                      setRsvpList(result);
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
                <Text style={styles.rsvpDataTitle}>
                  {Strings.Description} :
                </Text>
                <Text style={styles.RSVPDataDescription}>
                  {item.description}
                </Text>
                <Text style={styles.rsvpDataTitle}>
                  {Strings.RSVPDate}{' '}
                  <Text style={styles.RSVPDataDescription}>
                    {new Date(item.rsvpDate).toDateString()}
                  </Text>{' '}
                </Text>
                <Text style={styles.rsvpDataTitle}>
                  {Strings.RSVPTime}{' '}
                  <Text style={styles.RSVPDataDescription}>
                    {moment(item.rsvpDate).format(
                      AppConstants.TimeFormats.HourMinutesSecond,
                    )}
                  </Text>{' '}
                </Text>
              </View>
            );
          }}
          keyExtractor={item => item.rsvpId.toString()}
        />
      </MenuProvider>
    </View>
  );
};

export default AddRSVP;
