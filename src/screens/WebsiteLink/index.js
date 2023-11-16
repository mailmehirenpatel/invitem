// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Linking, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import {getWebLinkInfoChirps} from '../../store/actions/InfoChirpsAction';
import styles from './styles';

const WebsiteLink = () => {
  const {eventObjectData} = useSelector(state => state.event);
  const [webSiteLink, setWebsiteLink] = useState('');
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);
  const websiteLinkInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add website link',
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (websiteLinkInfochirpsId !== undefined) {
      dispatch(
        getWebLinkInfoChirps(
          eventObjectData.id,
          websiteLinkInfochirpsId.id,
          result => {
            result && setWebsiteLink(result);
          },
        ),
      );
    }
  }, [dispatch, eventObjectData.id, websiteLinkInfochirpsId]);

  const RenderWebSite = useCallback(({item}) => {
    return (
      <View style={styles.webLinkDataContainer}>
        <View style={styles.txtTitleView}>
          <Text style={styles.webLinkDataTitle}>
            {Strings.title} :{' '}
            <Text style={styles.webLinkTitleStringStyle}>{item.title}</Text>
          </Text>
        </View>
        <Text style={styles.webLinkStyle}>
          {Strings.WebsiteLink} :{' '}
          <Text
            style={styles.websiteLinksStyle}
            onPress={() => {
              Linking.openURL(`https://${item.webUrl}`);
            }}>
            {item.webUrl}
          </Text>
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.websiteLinkMainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.WebsiteLink}
        containerStyle={styles.navContainerStyle}
      />
      <View style={styles.contentContainer}>
        <FlatList
          data={webSiteLink ? webSiteLink : []}
          renderItem={RenderWebSite}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default WebsiteLink;
