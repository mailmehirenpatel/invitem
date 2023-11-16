// 3rd Party Imports
import React, {createRef, useCallback, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';

// Local Imports
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar, CustomTextInput} from '../../components';
import {Strings} from '../../config/strings';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {socialMediaRegex} from '../../services/validationServices';
import {
  AddSocialMediaInfoChirps,
  getEventInfoChirps,
  getSocialMediaInfoChirps,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const AddSocialMedia = ({route, navigation}) => {
  // Global Add Social Media Field References.
  const inputRef = {
    facebookLink: createRef(),
    instagramLink: createRef(),
    twitterLink: createRef(),
    linkedInLink: createRef(),
  };

  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [linkedInLink, setLinkedInLink] = useState('');
  const {InfoChirpsId} = route.params || {};
  const {eventObjectData} = useSelector(state => state.event);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps); // get event data through id

  const dispatch = useDispatch();

  const socialMediaInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add social media',
  );
  const get_SM_Url = (list, title) => {
    return list.filter(i => {
      return i.title === title;
    })[0]?.socialMediaUrl;
  };

  useEffect(() => {
    socialMediaInfochirpsId &&
      dispatch(
        getSocialMediaInfoChirps(
          eventObjectData.id,
          socialMediaInfochirpsId.id,
          result => {
            result && setFacebookLink(get_SM_Url(result, 'Facebook'));
            result && setInstagramLink(get_SM_Url(result, 'Instagram'));
            result && setTwitterLink(get_SM_Url(result, 'Twitter'));
            result && setLinkedInLink(get_SM_Url(result, 'LinkedIn'));
          },
        ),
      );
  }, [dispatch, eventObjectData.id, socialMediaInfochirpsId]);

  // OnSave Action
  const onSave = useCallback(() => {
    let LinksArray = [
      {
        title: 'Facebook',
        socialMediaUrl: facebookLink,
      },
      {
        title: 'Instagram',
        socialMediaUrl: instagramLink,
      },
      {
        title: 'Twitter',
        socialMediaUrl: twitterLink,
      },
      {
        title: 'LinkedIn',
        socialMediaUrl: linkedInLink,
      },
    ];
    const RequestData = {
      id: 0,
      eventId: eventObjectData.id,
      infoChirpId: InfoChirpsId,
      socialMedia: LinksArray,
    };
    if (facebookLink && !socialMediaRegex.exec(facebookLink)) {
      ToastError(Strings.invalidFacebookLink);
    } else if (instagramLink && !socialMediaRegex.exec(instagramLink)) {
      ToastError(Strings.invalidInstaLink);
    } else if (twitterLink && !socialMediaRegex.exec(twitterLink)) {
      ToastError(Strings.invalidTwitterLink);
    } else if (linkedInLink && !socialMediaRegex.exec(linkedInLink)) {
      ToastError(Strings.invalidLinkedInLink);
    } else if (RequestData.socialMedia.length === 0) {
      ToastError(Strings.EmptySocialLinks);
    } else {
      dispatch(
        AddSocialMediaInfoChirps(RequestData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
            dispatch(getEventInfoChirps(eventObjectData.id));
            socialMediaInfochirpsId &&
              dispatch(
                getSocialMediaInfoChirps(
                  eventObjectData.id,
                  socialMediaInfochirpsId.id,
                  result => {
                    result && setFacebookLink(get_SM_Url(result, 'Facebook'));
                    result && setInstagramLink(get_SM_Url(result, 'Instagram'));
                    result && setTwitterLink(get_SM_Url(result, 'Twitter'));
                    result && setLinkedInLink(get_SM_Url(result, 'LinkedIn'));
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
    dispatch,
    eventObjectData.id,
    facebookLink,
    instagramLink,
    linkedInLink,
    socialMediaInfochirpsId,
    twitterLink,
  ]);

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.AddSocialMedia}
        leftIcon={Icons.backArrowIcon}
        rightText={Strings.Save}
        onRightAction={onSave}
      />
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.linkOptionView}>
              <View style={styles.linkOptionUpperView}>
                <Text style={styles.titleText}>{Strings.SocialMediaLink}</Text>
              </View>

              <View>
                <CustomTextInput
                  ref={inputRef.facebookLink}
                  leftIcon={Icons.faceBookSocialIcon}
                  leftIconStyle={styles.socialIconStyle}
                  value={facebookLink}
                  onChangeText={val => {
                    facebookLink?.length === 0
                      ? setFacebookLink(`https://${val}`)
                      : setFacebookLink(val);
                  }}
                  placeholder={Strings.FacebookLinkHere}
                  inputStyle={styles.textInputStyle}
                  containerStyle={styles.textInputContainerStyle}
                />
                <CustomTextInput
                  ref={inputRef.instagramLink}
                  leftIcon={Icons.instagramSocialIcon}
                  leftIconStyle={styles.socialIconStyle}
                  value={instagramLink}
                  onChangeText={val => {
                    instagramLink?.length === 0
                      ? setInstagramLink(`https://${val}`)
                      : setInstagramLink(val);
                  }}
                  placeholder={Strings.InstagramLinkHere}
                  inputStyle={styles.textInputStyle}
                  containerStyle={styles.textInputContainerStyle}
                />
                <CustomTextInput
                  ref={inputRef.twitterLink}
                  leftIcon={Icons.twitterSocialIcon}
                  leftIconStyle={styles.socialIconStyle}
                  value={twitterLink}
                  onChangeText={val => {
                    twitterLink?.length === 0
                      ? setTwitterLink(`https://${val}`)
                      : setTwitterLink(val);
                  }}
                  placeholder={Strings.TwitterLinkHere}
                  inputStyle={styles.textInputStyle}
                  containerStyle={styles.textInputContainerStyle}
                />
                <CustomTextInput
                  ref={inputRef.linkedInLink}
                  leftIcon={Icons.linkedInSocialIcon}
                  leftIconStyle={styles.socialIconStyle}
                  value={linkedInLink}
                  onChangeText={val => {
                    linkedInLink?.length === 0
                      ? setLinkedInLink(`https://${val}`)
                      : setLinkedInLink(val);
                  }}
                  placeholder={Strings.LinkedInLinkHere}
                  inputStyle={styles.textInputStyle}
                  containerStyle={styles.textInputContainerStyle}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddSocialMedia;
