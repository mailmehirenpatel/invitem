// 3rd Party Imports
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
// Local Imports
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CircleFilledIcon, CustomButton, CustomNavbar} from '../../components';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
// import {ToastInDevelopment} from '../../constants/ToastConstants';
import {infoTabDescription} from '../../constants/mockdata';
import {getInfoChirpsData} from '../../store/actions/InfoChirpsAction';
import {styles} from './styles';
import {scale, verticalScale} from '../../config/metrics';

export default function AdminInfo({navigation, route}) {
  const {isUpdate} = route.params || {};
  const dispatch = useDispatch();

  const {infoChirpsData} = useSelector(state => state.infoChirps);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getInfoChirpsData());
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  const [isToolTip, setIsToolTip] = useState(false);

  const InfochirpsDetails = name => {
    switch (name) {
      case 'create note':
        return {
          navigationScreenName: NavigationRoutes.CreateNote,
          icons: Icons.NoteIcn,
          iconTintColor: '#75CEC4',
          iconBackground: 'rgba(117, 206, 196, 0.2)',
        };

      case 'add document':
        return {
          navigationScreenName: NavigationRoutes.AddDocument,
          icons: Icons.DocIcn,
          iconTintColor: '#E0C213',
          iconBackground: 'rgba(224, 194, 19, 0.2)',
        };

      case 'add image':
        return {
          navigationScreenName: NavigationRoutes.AddImage,
          icons: Icons.GalleryIcn,
          iconTintColor: '#6435F4',
          iconBackground: 'rgba(100, 53, 244, 0.2)',
        };

      case 'add checklist':
        return {
          navigationScreenName: NavigationRoutes.AddChecklist,
          icons: Icons.storeIcn,
          iconTintColor: '#0896A9',
          iconBackground: 'rgba(40, 169, 8, 0.2)',
        };

      case 'add choicelist':
        return {
          navigationScreenName: NavigationRoutes.AddChoiceList,
          icons: Icons.choiceIcon,
          iconTintColor: '#A90825',
          iconBackground: 'rgba(169, 8, 37, 0.2)',
        };

      case 'add location':
        return {
          navigationScreenName: NavigationRoutes.AddLocation,
          icons: Icons.mapPin,
          iconTintColor: '#28A908',
          iconBackground: 'rgba(40, 169, 8, 0.2)',
        };

      case 'add rsvp':
        return {
          navigationScreenName: NavigationRoutes.AddRSVP,
          icons: Icons.inviteUserIcn,
          iconTintColor: '#F26942',
          iconBackground: 'rgba(242, 105, 66, 0.2)',
        };

      case 'add social media':
        return {
          navigationScreenName: NavigationRoutes.AddSocialMedia,
          icons: Icons.shareIcn,
          iconTintColor: '#03816A',
          iconBackground: 'rgba(3, 129, 106, 0.2)',
        };

      case 'add vote or poll':
        return {
          navigationScreenName: NavigationRoutes.AddVoteOrPoll,
          icons: Icons.pieIcn,
          iconTintColor: '#A752C0',
          iconBackground: 'rgba(167, 82, 192, 0.2)',
        };

      case 'add website link':
        return {
          navigationScreenName: NavigationRoutes.AddWebsite,
          icons: Icons.websiteIcn,
          iconTintColor: '#11C782',
          iconBackground: 'rgba(17, 199, 130, 0.2)',
        };

      default:
        break;
    }
  };

  // ToolTip Show and Hide Functionality
  const handleTooltipVisibility = useCallback(() => {
    setIsToolTip(!isToolTip);
  }, [isToolTip]);
  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.InfoTabs}
        headerIcon={Icons.adminInfoIcon}
        onRightAction={handleTooltipVisibility}
        onBackAction={() => {
          isUpdate
            ? navigation.goBack()
            : navigation.reset({
                index: 0,
                routes: [{name: NavigationRoutes.EventScreen}],
              });
        }}
      />
      {isToolTip ? (
        <View style={styles.infoTabDescriptionView}>
          <Image source={Icons.tipIcon} style={styles.tipIconStyle} />
          <Text style={styles.infoTabDescriptionViewText} numberOfLines={5}>
            {infoTabDescription.description}
          </Text>
        </View>
      ) : null}
      <ScrollView>
        <View style={styles.adminInfoMainView}>
          <FlatList
            data={infoChirpsData}
            renderItem={({item}) => (
              <Pressable
                style={styles.adminInfoContainer}
                onPress={() => {
                  navigation.navigate(
                    InfochirpsDetails(item.name).navigationScreenName,
                    {InfoChirpsId: item.id},
                  );
                  // item.screen ? navigation.navigate(item.screen) : ToastInDevelopment();
                }}>
                <View style={styles.adminInfoSubContainer}>
                  <CircleFilledIcon
                    icon={InfochirpsDetails(item.name).icons}
                    containerStyle={[
                      styles.leftIconContainer,
                      {
                        backgroundColor: InfochirpsDetails(item.name)
                          .iconBackground,
                      },
                    ]}
                    iconStyle={[
                      styles.leftIcon,
                      {
                        tintColor: InfochirpsDetails(item.name).iconTintColor,
                      },
                    ]}
                  />
                  <Text style={styles.leftTextStyle}>{item.displayName}</Text>
                </View>
                <Image source={Icons.nextIcon} style={styles.nextIconStyle} />
              </Pressable>
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      {!isUpdate && (
        <CustomButton
          title={Strings.GoToDashBoard}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: NavigationRoutes.EventScreen}],
            });
          }}
          btnStyle={{
            marginBottom: verticalScale(20),
            marginHorizontal: scale(20),
          }}
        />
      )}
    </View>
  );
}
