// 3rd Party Imports
import {HttpTransportType, HubConnectionBuilder} from '@microsoft/signalr';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions, Avatar, Bubble, GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons, Images} from '../../../../assets';
import {CircleFilledIcon, FastImageView} from '../../../../components';
import {Strings} from '../../../../config/strings';
import ApiConstants from '../../../../constants/ApiConstants';
import AppConstants from '../../../../constants/AppConstants';
import NavigationRoutes from '../../../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../../../constants/ToastConstants';
import {
  SendMessage,
  deleteChat,
  getChat,
} from '../../../../store/actions/ChatAction';
import {uploadMediaRequest} from '../../../../store/actions/profileActions';
import Colors from '../../../../theme/Colors';
import {imageSelection} from '../../../../utils';
import styles from './styles';

const EventChat = ({navigation}) => {
  const {eventObjectData} = useSelector(state => state.event);
  const {token} = useSelector(state => state.auth);
  const {userId} = useSelector(state => state.auth);
  const [ChatList, setChatList] = useState([]);
  const [Connection, setConnection] = useState(null);
  const [UploadedImage, setUploadedImage] = useState('');
  const [customText, setCustomText] = useState('');

  const dispatch = useDispatch();

  const textInputRef = useRef();

  // connection for SignalR hub
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('https://dev.mobmaxime.com/InvitemAPI/chatHub', {
        transport: HttpTransportType.WebSockets, // Use WebSocket transport (can be changed to other transport types)
        skipNegotiation: true, // Skip negotiation step for custom headers
        headers: {
          Authorization: `Bearer ${token}`, // Pass the access token in the Authorization header
        },
      })
      .build();

    setConnection(connect);

    connect.on('onError', err => {
      console.log('On Error: ', JSON.stringify(err));
    });

    // below code for stop connection
    // return () => {
    //   connect.stop();
    // };
  }, [dispatch, eventObjectData?.eventName, eventObjectData?.id, token]);

  useEffect(() => {
    if (Connection) {
      Connection.start()
        .then(function () {
          console.log('Connected to SignalR hub');
          Connection.invoke(
            'Join',
            `${eventObjectData.eventName}_${eventObjectData.id}`,
          ).then(function () {
            console.log('Invoke taskCancelled...');
            dispatch(
              getChat(eventObjectData.id, result => {
                result && setChatList(result);
              }),
            );
          });
        })
        .catch(function (error) {
          console.error('Error connecting to SignalR hub: ' + error);
        });
    }
  }, [Connection, dispatch, eventObjectData?.eventName, eventObjectData?.id]);

  useEffect(() => {
    return () => {
      if (Connection) {
        Connection.stop();
      }
    };
  }, [Connection]);

  useEffect(() => {
    if (Connection) {
      Connection.on('newMessage', data => {
        setChatList(oldChatList => [...oldChatList, data]);
        console.log('New Message Received: ', JSON.stringify(data));
      });
    }
  }, [Connection]);

  const renderBubble = props => {
    return (
      <Bubble
        renderUsernameOnMessage
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.BTNLiteGreen,
          },
          left: {
            backgroundColor: Colors.White,
          },
        }}
        textStyle={{
          right: {
            color: Colors.White,
          },
          left: {
            color: Colors.Black,
          },
        }}
      />
    );
  };

  const IconAttachment = useCallback(
    () => <Image style={styles.rightIcon} source={Icons.attachment} />,
    [],
  );

  function renderActions(props) {
    return (
      <Actions
        {...props}
        options={{
          ['Image']: () => {
            imageSelection(false).then(res => {
              dispatch(
                uploadMediaRequest(
                  res.assets[0],
                  `${AppConstants.fileDriveName.ChatImage}/${eventObjectData?.id}/${userId}`,
                  (isUploaded, data) => {
                    if (isUploaded && data[0].isSuccess) {
                      setUploadedImage(data[0].fileUrl);
                    }
                  },
                ),
              );
            });
          },
          ['Camera']: () => {
            imageSelection(true).then(res => {
              dispatch(
                uploadMediaRequest(
                  res.assets[0],
                  `${AppConstants.fileDriveName.ChatImage}/${eventObjectData?.id}/${userId}`,
                  (isUploaded, data) => {
                    if (isUploaded && data[0].isSuccess) {
                      setUploadedImage(data[0].fileUrl);
                    }
                  },
                ),
              );
            });
          },
          Cancel: () => {},
        }}
        icon={IconAttachment}
        onSend={args => console.log(args)}
      />
    );
  }

  const onSend = useCallback(
    (messages = '') => {
      // const [messageToSend] = messages;

      let ChatRequestData = {
        id: eventObjectData.id,
        // content: messageToSend?.text,
        content: messages,
        eventName: eventObjectData.eventName,
        eventId: eventObjectData?.id,
        image: UploadedImage,
      };
      // call chat send API
      dispatch(
        SendMessage(ChatRequestData, (isSuccess, result) => {
          setUploadedImage('');
          textInputRef.current.clear();
        }),
      );
    },
    [UploadedImage, dispatch, eventObjectData?.eventName, eventObjectData?.id],
  );

  const onLongPress = useCallback(
    (context, message) => {
      Alert.alert(
        Strings.DeleteMessageConfirmation,
        '',
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
                deleteChat(message._id, (isSuccess, message) => {
                  if (isSuccess) {
                    ToastSuccess(message);
                    dispatch(
                      getChat(eventObjectData.id, result => {
                        result && setChatList(result);
                      }),
                    );
                  } else {
                    ToastError(message);
                  }
                }),
              );
            },
          },
        ],
        {cancelable: false},
      );
    },
    [dispatch, eventObjectData.id],
  );

  const renderMessageImage = props => {
    const {currentMessage} = props;
    const handleDeleteImage = () => {
      Alert.alert(
        Strings.DeleteChatImageConfirmation,
        '',
        [
          {
            text: Strings.No,
            onPress: () => console.log('No Pressed'),
            style: Strings.cancel,
          },
          {
            text: Strings.Yes,
            onPress: () => {
              // Dispatch the action to delete the image.
              dispatch(
                deleteChat(currentMessage._id, (isSuccess, message) => {
                  if (isSuccess) {
                    ToastSuccess(message);
                    dispatch(
                      getChat(eventObjectData.id, result => {
                        result && setChatList(result);
                      }),
                    );
                  } else {
                    ToastError(message);
                  }
                }),
              );
            },
          },
        ],
        {cancelable: false},
      );
    };

    return (
      <TouchableOpacity onLongPress={handleDeleteImage}>
        <Image
          source={{uri: currentMessage.image}}
          style={styles.chatImageStyle}
        />
      </TouchableOpacity>
    );
  };

  const renderSend = props => {
    return (
      <View style={styles.renderSendView}>
        <View style={styles.sendContainer}>
          <CircleFilledIcon
            onPress={() => {
              onSend(props?.text);
              setCustomText('');
            }}
            icon={Icons.sendArrow}
            iconStyle={styles.iconSend}
            containerStyle={styles.sendBtnContainer}
          />
        </View>
      </View>
    );
  };

  const renderChatFooter = useCallback(() => {
    if (UploadedImage) {
      return (
        <View style={styles.renderChatFooterView}>
          <FastImageView
            uri={`${ApiConstants.ImageBaseUrl}/${UploadedImage}`}
            style={styles.renderChatFooterImage}
            defaultSource={Images.EventImagePlaceholder}
          />
          <TouchableOpacity
            onPress={() => setUploadedImage('')}
            style={styles.CloseIcon}>
            <Text style={styles.txtX}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    //below code for document selection display
    // if (filePath) {
    //   return (
    //     <View style={styles.chatFooter}>
    //       <InChatFileTransfer filePath={filePath} />
    //       <TouchableOpacity
    //         onPress={() => setFilePath('')}
    //         style={styles.buttonFooterChat}>
    //         <Text style={styles.textFooterChat}>X</Text>
    //       </TouchableOpacity>
    //     </View>
    //   );
    // }
    return null;
  }, [UploadedImage]);

  return (
    <SafeAreaView style={styles.mainChatView}>
      <GiftedChat
        textInputRef={textInputRef}
        text={customText}
        onInputTextChanged={text => setCustomText(text)}
        renderAvatar={data => {
          return (
            <Avatar
              {...data}
              renderAvatar={d => (
                <TouchableOpacity
                  onPress={() => {
                    // console.log('user id -> ', data.currentMessage.user._id);
                    navigation.navigate(NavigationRoutes.UserInfo, {
                      USERid: data.currentMessage.user._id,
                    });
                  }}>
                  <FastImageView
                    uri={
                      d.currentMessage.user.avatar
                        ? `${ApiConstants.ImageBaseUrl}/${d.currentMessage.user.avatar}`
                        : ''
                    }
                    style={styles.avatarStyle}
                    defaultSource={Images.profileImage}
                  />
                </TouchableOpacity>
              )}
            />
          );
        }}
        messages={ChatList.map(i => {
          return {
            ...i,
            user: {
              ...i.user,
              avatar: i.user.avatar !== null ? i.user.avatar : '',
            },
            image: i.image && `${ApiConstants.ImageBaseUrl}/${i.image}`,
          };
        }).reverse()}
        // onSend={messages => {
        //   onSend(messages);
        // }}
        user={{
          _id: userId,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        renderActions={renderActions}
        renderChatFooter={renderChatFooter}
        showUserAvatar
        renderUsernameOnMessage
        imageStyle={styles.chatImageStyle}
        onLongPress={onLongPress}
        renderMessageImage={renderMessageImage}
      />
    </SafeAreaView>
  );
};
export default EventChat;
