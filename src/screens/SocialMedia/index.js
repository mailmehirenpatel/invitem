// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import {getSocialMediaInfoChirps} from '../../store/actions/InfoChirpsAction';
import styles from './styles';
const SocialMedia = () => {
  const {eventObjectData} = useSelector(state => state.event);
  const [SocialMediaList, setSocialMediaList] = useState(undefined);
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps); // get event data through id

  const dispatch = useDispatch();

  const getIcons = title => {
    switch (title) {
      case 'Facebook':
        return Icons.faceBookSocialIcon;
      case 'Instagram':
        return Icons.instagramSocialIcon;
      case 'Twitter':
        return Icons.twitterSocialIcon;
      case 'LinkedIn':
        return Icons.linkedInSocialIcon;
      default:
        break;
    }
  };

  const socialMediaInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add social media',
  );
  useEffect(() => {
    if (socialMediaInfochirpsId !== undefined) {
      dispatch(
        getSocialMediaInfoChirps(
          eventObjectData.id,
          socialMediaInfochirpsId.id,
          result => {
            result && setSocialMediaList(result);
          },
        ),
      );
    }
  }, [dispatch, eventObjectData.id, socialMediaInfochirpsId]);

  // FlatList Render Items
  const renderItem = useCallback(({item, index}) => {
    return (
      <>
        {item.socialMediaUrl && (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(item.socialMediaUrl);
            }}
            key={index}>
            <View style={styles.renderStyle}>
              <Image
                source={getIcons(item.title)}
                style={styles.socialIconStyle}
              />
              <Text style={styles.platFormText}>{item.socialMediaUrl}</Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }, []);

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.socialMedia}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <View style={styles.mainView}>
          <View style={styles.socialMainView}>
            <FlatList
              style={styles.flatListStyle}
              scrollEnabled={false}
              data={SocialMediaList}
              keyExtractor={item => item?.id}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default SocialMedia;
