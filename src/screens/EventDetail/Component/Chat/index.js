// 3rd Party Imports
import {HttpTransportType, HubConnectionBuilder} from '@microsoft/signalr';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {
  Actions,
  Avatar,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
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
  readChatMessagesByEventId,
} from '../../../../store/actions/ChatAction';
import {uploadMediaRequest} from '../../../../store/actions/profileActions';
import Colors from '../../../../theme/Colors';
import {imageSelection, isIPhoneX} from '../../../../utils';
import styles from './styles';
import {Metrics} from '../../../../config/metrics';

const EventChat = ({navigation}) => {
  const {eventObjectData} = useSelector(state => state.event);
  const {token} = useSelector(state => state.auth);
  const {userId} = useSelector(state => state.auth);
  const [ChatList, setChatList] = useState([]);
  const [Connection, setConnection] = useState(null);
  const [UploadedImage, setUploadedImage] = useState('');
  const [customText, setCustomText] = useState('');
  //const [composerHeight, setComposerHeight] = useState(44); // Initial height
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImagePreview, setImagePreview] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readChatMessagesByEventId(eventObjectData?.id));
  }, [dispatch, eventObjectData?.id]);

  //const textInputRef = useRef();
  //const onContentSizeChange = (contentWidth, contentHeight) => {
  // Adjust composer height based on contentHeight or any other logic
  //console.log('render inputs ' + contentHeight);
  //setComposerHeight(contentHeight < 44 ? 44 : contentHeight);
  //};
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

  function renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={Platform.OS === 'android' ? '' : styles.toolbar}
      />
    );
  }

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
            backgroundColor: Colors.bubblesGrey,
          },
        }}
        textStyle={{
          right: {
            color: Colors.White,
          },
          left: {
            color: Colors.White,
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
        content: messages.trim(),
        eventName: eventObjectData.eventName,
        eventId: eventObjectData?.id,
        image: UploadedImage,
      };
      // call chat send API
      dispatch(
        SendMessage(ChatRequestData, (isSuccess, result) => {
          setUploadedImage('');
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

  const handleImagePress = imageUrl => {
    //console.log('Open image:', imageUrl);
    setImagePreview(true);
    setSelectedImage(imageUrl);
  };

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
      <TouchableOpacity
        onPress={() => handleImagePress(currentMessage.image)}
        onLongPress={handleDeleteImage}>
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
              //setComposerHeight(44);
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
    <KeyboardAvoidingView
      style={styles.mainChatView}
      backgroundColor={Colors.White}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ImageBackground
        source={Images.InvitemBackgroundImg}
        style={{flex: 1}}
        resizeMode="cover">
        <GiftedChat
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
          renderInputToolbar={renderInputToolbar}
          //minComposerHeight={44} // Minimum height of the composer
          //maxComposerHeight={composerHeight} // Maximum height of the composer
          //onContentSizeChange={onContentSizeChange} // Handle content size change
          renderActions={renderActions}
          bottomOffset={
            Platform.OS === 'ios'
              ? isIPhoneX()
                ? Metrics.screenHeight * 0.16
                : Metrics.screenHeight * 0.19
              : 0
          }
          renderChatFooter={renderChatFooter}
          showUserAvatar
          renderUsernameOnMessage
          imageStyle={styles.chatImageStyle}
          onLongPress={onLongPress}
          renderMessageImage={renderMessageImage}
        />
      </ImageBackground>

      {isImagePreview && (
        <Modal visible={isImagePreview} transparent>
          <SafeAreaView style={styles.modalSafeView}>
            <View style={styles.modalContainer}>
              <Image source={{uri: selectedImage}} style={styles.modalImage} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setImagePreview(false)}>
                <Image source={Icons.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};
export default EventChat;
