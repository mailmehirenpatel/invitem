// 3rd Party Imports
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Keyboard, Linking, Text, View} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';

// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CircleFilledIcon,
  CustomNavbar,
  CustomTextInput,
} from '../../components';
import {Strings} from '../../config/strings';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {WEBSITELINK_REGEX} from '../../services/validationServices';
import {
  DeleteWebsiteInfoChirps,
  addWebLinkInfoChirps,
  getEventInfoChirps,
  getWebLinkInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const AddWebsite = ({navigation, route}) => {
  const {InfoChirpsId} = route?.params;
  const dispatch = useDispatch();
  // for future use.
  // const [isEdit, setIsEdit] = useState(false);
  // const [EdtibleObject, setEdtibleObject] = useState({});
  const [webLink, setWebLink] = useState('');
  const [webTitle, setWebTitle] = useState('');
  const [webSiteLink, setWebsiteLink] = useState('');
  const {eventObjectData} = useSelector(state => state.event);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);

  const websiteLinkInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add website link',
  );

  const inputRef = {
    webTitle: createRef(),
    webLink: createRef(),
  };

  useEffect(() => {
    websiteLinkInfochirpsId &&
      dispatch(
        getWebLinkInfoChirps(
          eventObjectData.id,
          websiteLinkInfochirpsId.id,
          result => {
            result && setWebsiteLink(result);
          },
        ),
      );
  }, [dispatch, eventObjectData.id, websiteLinkInfochirpsId]);

  const onSave = useCallback(() => {
    const addWebLinkData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      title: webTitle,
      webUrl: webLink,
    };
    if (webTitle === '') {
      ToastError(Strings.EmptyWebLinkTitle);
    } else if (webLink === '') {
      ToastError(Strings.EmptyWebsiteLink);
    } else if (!WEBSITELINK_REGEX.exec(webLink)) {
      ToastError(Strings.ValidWebsiteLink);
    } else {
      dispatch(
        addWebLinkInfoChirps(addWebLinkData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            dispatch(getEventInfoChirps(eventObjectData.id));
          } else {
            ToastError(message);
          }
        }),
      );
      setWebTitle('');
      setWebLink('');
    }
  }, [InfoChirpsId, dispatch, eventObjectData.id, webLink, webTitle]);

  // for future use.
  // const onSelectUpdate = useCallback(item => {
  //   setUpdateWebTitle(item?.title);
  //   setUpdateWebLink(item?.webUrl);
  // }, []);

  const RenderWebSite = useCallback(
    ({item}) => {
      return (
        <MenuProvider skipInstanceCheck>
          <View style={styles.webLinkDataContainer}>
            <View style={styles.txtTitleView}>
              <Text style={styles.webLinkDataTitle}>
                {Strings.title} :{' '}
                <Text style={styles.webLinkTitleStringStyle}>{item.title}</Text>
              </Text>
              <CircleFilledIcon
                icon={Icons.deleteIcon}
                iconStyle={styles.deleteIconStyle}
                onPress={() => {
                  Alert.alert(
                    Strings.DeleteWebLinkConfirmation,
                    item.webUrl,
                    [
                      {
                        text: Strings.No,
                        onPress: () => console.log('No Pressed'),
                        style: Strings.cancel,
                      },
                      {
                        text: Strings.Yes,
                        onPress: () => {
                          // Api call for delete website link InfoChirps
                          dispatch(
                            DeleteWebsiteInfoChirps(
                              item?.id,
                              (isSuccess, message) => {
                                if (isSuccess) {
                                  ToastSuccess(message);
                                  dispatch(
                                    getEventInfoChirps(eventObjectData.id),
                                  );
                                  websiteLinkInfochirpsId &&
                                    dispatch(
                                      getWebLinkInfoChirps(
                                        eventObjectData.id,
                                        websiteLinkInfochirpsId.id,
                                        result => {
                                          result && setWebsiteLink(result);
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
                }}
              />
            </View>
            <Text style={styles.webLinkStringStyle}>
              {Strings.WebsiteLink} :{' '}
              <Text
                style={styles.websiteLinksStyle}
                onPress={() => {
                  Linking.openURL(item.webUrl);
                }}>
                {item.webUrl}
              </Text>
            </Text>
          </View>
        </MenuProvider>
      );
    },
    [dispatch, eventObjectData.id, websiteLinkInfochirpsId],
  );

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.AddWebsite}
        rightText={Strings.Save}
        onRightAction={onSave}
      />
      <View style={styles.contentContainer}>
        <View style={styles.mainViewContainer}>
          <Text style={styles.mainViewTitle}>{Strings.WebsiteLink}</Text>
          <CustomTextInput
            ref={inputRef.webTitle}
            keyboardType={'default'}
            placeholder={Strings.AddWebsiteLinkTitlePlaceholder}
            inputStyle={styles.textInputStyle}
            containerStyle={styles.textInputContainerStyle}
            returnKeyType={'next'}
            value={webTitle}
            onChangeText={val => setWebTitle(val)}
            onSubmitEditing={() => inputRef.webLink.current.focus()}
            autoCapitalize={'words'}
          />
          <CustomTextInput
            ref={inputRef.webLink}
            keyboardType={'default'}
            placeholder={Strings.AddWebsiteLinkPlaceholder}
            inputStyle={styles.textInputStyle}
            containerStyle={styles.textInputContainerStyle}
            returnKeyType={'done'}
            value={webLink}
            onChangeText={val => {
              webLink.length === 0
                ? setWebLink(`https://${val}`)
                : setWebLink(val);
            }}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          data={webSiteLink ? webSiteLink : []}
          renderItem={RenderWebSite}
        />
      </View>
    </View>
  );
};

export default AddWebsite;
