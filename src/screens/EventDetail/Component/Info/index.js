// 3rd Party Imports
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

// Local Imports
import {FlatGrid} from 'react-native-super-grid';
import {Icons, Images} from '../../../../assets';
import GoogleAdsComponent from '../../../../components/CustomGoogleAdd/GoogleAdsComponent';
import MultiUserView from '../../../../components/MultiUserView';
import {Strings} from '../../../../config/strings';
import NavigationRoutes from '../../../../constants/NavigationRoutes';
import EventSetting from '../EventSetting';
import styles from './styles';
import {RSVPPopup} from '../../../../components';
import {getEventRSVPInfoChirps} from '../../../../store/actions/InfoChirpsAction';

// Render Event Map View
const EventMap = ({eventObjectData}) => {
  const markerRef = createRef(null);
  const {locationData} = useSelector(state => state.event); // location data through redux useSelector
  const SelectedLocation = locationData.find(
    location => location.id === eventObjectData?.locationId, // Select Location Location id through navigation params
  );
  if (!SelectedLocation) {
    return null; // if Selected Location doesn't exist return null
  }
  const handleMarkerPress = (latitude, longitude) => {
    const url = `geo:${latitude},${longitude}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.eventMap}>
      <View style={styles.mapHeader}>
        <Image style={styles.mapIcon} source={Icons.mapPin} />
        <Text style={styles.dateValueText}>
          {eventObjectData?.locationName}
        </Text>
      </View>
      <MapView
        focusable
        initialRegion={{
          latitude: SelectedLocation.latitude,
          longitude: SelectedLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        zoomControlEnabled={false}
        zoomTapEnabled={false}
        provider="google"
        style={styles.mapStyle}>
        <Marker
          ref={markerRef}
          coordinate={{
            latitude: SelectedLocation.latitude,
            longitude: SelectedLocation.longitude,
          }}
          focusable
          title={SelectedLocation.address}
          onCalloutPress={() =>
            handleMarkerPress(
              SelectedLocation.latitude,
              SelectedLocation.longitude,
            )
          }
        />
      </MapView>
    </View>
  );
};

// Render Event Date View
const EventDate = ({eventObjectData, options, navigation}) => {
  return (
    <View style={styles.eventDateView}>
      <View style={styles.eventScheduleViewAllStyle}>
        <Text>Event Schedule</Text>
        <Text
          onPress={() => {
            navigation.navigate(NavigationRoutes.EventScheduleList, {
              ScheduleList: eventObjectData?.eventDateSchedule,
            });
          }}
          style={styles.viewAllTxtStyle}>
          Event RSVP Schedule
        </Text>
      </View>
    </View>
  );
};

// Render Event Detail View
const EventDetailView = ({eventObjectData, userId}) => (
  <View style={styles.eventDetailView}>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabelText}>{`${Strings.EventType} : `}</Text>
      <Text style={styles.detailValueText}>
        {eventObjectData?.categoryName}
      </Text>
    </View>
    {Object?.keys(eventObjectData?.description)?.length > 0 && (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabelText}>{`${Strings.EventInfo} : `}</Text>
        <Text style={styles.detailText}>
          {eventObjectData?.description?.trim()}
        </Text>
      </View>
    )}
  </View>
);

// Render Event Guests
const EventGuests = ({navigation, eventObjectData}) => {
  const onGuestList = useCallback(
    () =>
      navigation.navigate(NavigationRoutes.GuestList, {
        eventId: eventObjectData?.id,
      }),
    [eventObjectData?.id, navigation],
  );
  return (
    <View style={styles.eventGuestView}>
      {eventObjectData?.isMultipleEvent === false ? (
        <Text style={styles.eventGuestTitle}>{Strings.Guests}</Text>
      ) : (
        <Text style={styles.eventGuestTitle}>{Strings.Team}</Text>
      )}
      {eventObjectData?.eventParticipants?.length > 0 ? (
        <MultiUserView
          listUsers={eventObjectData?.eventParticipants}
          btnText={Strings.ViewAll}
          onRightAction={onGuestList}
        />
      ) : (
        <View style={styles.emptyDataView}>
          <Text style={styles.emptyDataText}>
            {Strings.NoEventGuestFoundError}
          </Text>
        </View>
      )}
    </View>
  );
};

// Render Feature Option
const FeatureOption = ({
  EventInfoChirpsData,
  InfochirpsDetailsForUser,
  navigation,
  setViewRSVPPopup,
  setRsvpData,
  rsvpList,
}) => (
  <View style={styles.optionRowContainer}>
    {EventInfoChirpsData?.length !== 0 ? (
      <FlatGrid
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        maxItemsPerRow={3}
        itemDimension={0}
        data={EventInfoChirpsData ? EventInfoChirpsData : []}
        keyExtractor={item => item?.infoChirpId.toString()}
        renderItem={({item, index}) => {
          item?.displayName === Strings.RSVP && setRsvpData(item);
          return (
            <Pressable
              key={index}
              style={styles.optionView}
              onPress={() => {
                item?.displayName === Strings.RSVP
                  ? setViewRSVPPopup(true)
                  : InfochirpsDetailsForUser(item.name).navigateTo &&
                    navigation.navigate(
                      InfochirpsDetailsForUser(item.name).navigateTo,
                      {InfoChirpsDetails: item},
                    );
              }}>
              <Image
                source={InfochirpsDetailsForUser(item.name).icon}
                style={styles.optionIcn}
              />
              {item?.displayName === Strings.RSVP &&
                item?.unAttendedRsvpCount > 0 && (
                  <View style={styles.notificationCountView}>
                    <Text style={styles.notificationCountText}>
                      {item?.unAttendedRsvpCount}
                    </Text>
                  </View>
                )}
              <Text
                style={[
                  styles.optionText,
                  {color: InfochirpsDetailsForUser(item.name).color},
                ]}>
                {InfochirpsDetailsForUser(item.name).Name}
              </Text>
            </Pressable>
          );
        }}
      />
    ) : (
      <Text style={styles.emptyDataText}>{Strings.NoInfoChirpsAdded}</Text>
    )}
  </View>
);
const EventInfo = ({navigation, route, eventObjectData}) => {
  // Global Bottom Sheet Field References
  const refRBSheet = useRef();
  const {userId} = useSelector(state => state.auth);
  // const {eventObjectData} = useSelector(state => state.event); // get event data through id
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps); // get event data through id
  const options = {hour: 'numeric', minute: 'numeric'};
  const [isViewRSVPPopup, setViewRSVPPopup] = useState();
  const [rsvpData, setRsvpData] = useState();
  const [rsvpList, setRSVPList] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getEventRSVPInfoChirps(rsvpData?.eventId, rsvpData?.id, result => {
        result && setRSVPList(result);
      }),
    );
  }, [dispatch, rsvpData]);
  const InfochirpsDetailsForUser = name => {
    switch (name) {
      case 'create note':
        return {
          icon: Icons.NoteIcn,
          Name: Strings.Note,
          color: '#75CEC4',
          navigateTo: NavigationRoutes.EventNote,
        };

      case 'add document':
        return {
          icon: Icons.DocIcn,
          Name: Strings.Document,
          color: '#E0C213',
          navigateTo: NavigationRoutes.EventDocument,
        };

      case 'add image':
        return {
          icon: Icons.GalleryIcn,
          Name: Strings.Photo,
          color: '#6435F4',
          navigateTo: NavigationRoutes.AddImage,
        };

      case 'add checklist':
        return {
          Name: Strings.CheckList,
          color: '#0896A9',
          icon: Icons.checkListIcn,
          navigateTo: NavigationRoutes.EventCheckList,
        };

      case 'add choicelist':
        return {
          Name: Strings.ChoiceList,
          color: '#A90825',
          icon: Icons.choiceListIcn,
          navigateTo: NavigationRoutes.EventChoiceList,
        };

      case 'add location':
        return {
          icon: Icons.mapPin,
          Name: Strings.Location,
          color: '#28A908',
          navigateTo: NavigationRoutes.EventLocation,
        };

      case 'add rsvp':
        return {
          icon: Icons.RsvpIcn,
          Name: Strings.RSVP,
          color: '#11C782',
          navigateTo: NavigationRoutes.RsvpForm,
        };

      case 'add social media':
        return {
          icon: Icons.shareIcn,
          Name: Strings.socialMedia,
          color: '#03816A',
          navigateTo: NavigationRoutes.SocialMedia,
        };

      case 'add vote or poll':
        return {
          icon: Icons.PollIcn,
          Name: Strings.Poll,
          color: '#F26942',
          navigateTo: NavigationRoutes.EventPoll,
        };

      case 'add website link':
        return {
          icon: Icons.websiteIcn,
          Name: Strings.WebsiteLink,
          color: '#11C782',
          navigateTo: NavigationRoutes.WebsiteLink,
        };

      default:
        // ToastInDevelopment();
        break;
    }
  };

  const onOpenSetting = useCallback(() => refRBSheet.current.open(), []); // BottomSheet Open Functionality
  const onViewPress = useCallback(
    id => {
      setViewRSVPPopup(false);
      InfochirpsDetailsForUser(rsvpData?.name).navigateTo &&
        navigation.navigate(
          InfochirpsDetailsForUser(rsvpData?.name).navigateTo,
          {
            InfoChirpsDetails: rsvpList?.filter(e => e?.rsvpId === id),
          },
        );
    },
    [navigation, rsvpData?.name, rsvpList],
  );
  return (
    <View style={styles.mainContentContainer}>
      <View style={styles.mainContentContainer}>
        <ScrollView style={styles.contentContainer}>
          <ImageBackground
            source={Images.InvitemBackgroundImg}
            style={{flex: 1}}
            resizeMode="cover">
            <FeatureOption
              {...{
                EventInfoChirpsData,
                InfochirpsDetailsForUser,
                navigation,
                setViewRSVPPopup,
                setRsvpData,
                rsvpList,
              }}
            />
            <EventDate {...{eventObjectData, options, navigation}} />
            <EventGuests {...{navigation, eventObjectData}} />
            <EventDetailView {...{eventObjectData, userId}} />

            <EventSetting {...{refRBSheet}} />
            <EventMap {...{eventObjectData}} />
          </ImageBackground>
        </ScrollView>
        {isViewRSVPPopup && (
          <RSVPPopup
            isVisible={isViewRSVPPopup}
            data={rsvpList}
            onView={onViewPress}
          />
        )}
        {/* <Pressable style={styles.btnSettingView} onPress={onOpenSetting}>
          <Image style={styles.btnSettingIcon} source={Icons.settingIcn} />
        </Pressable> */}
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventInfo;
