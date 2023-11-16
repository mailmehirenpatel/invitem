// 3rd Party Imports
import React, {createRef, useCallback, useRef} from 'react';
import {Image, Linking, Pressable, ScrollView, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';

// Local Imports
import {FlatGrid} from 'react-native-super-grid';
import {Icons} from '../../../../assets';
import GoogleAdsComponent from '../../../../components/CustomGoogleAdd/GoogleAdsComponent';
import MultiUserView from '../../../../components/MultiUserView';
import {Strings} from '../../../../config/strings';
import NavigationRoutes from '../../../../constants/NavigationRoutes';
import Colors from '../../../../theme/Colors';
import EventSetting from '../EventSetting';
import styles from './styles';

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
      {eventObjectData?.isMultipleEvent === false ? (
        <>
          <View style={styles.dateLabelView}>
            <Text style={styles.dateLabelText}>{Strings.startDate}</Text>
            <View style={styles.dateRightView}>
              <Text style={styles.dateLabelText}>{Strings.EventStartTime}</Text>
            </View>
          </View>
          <View style={styles.dateValueView}>
            <Text style={styles.dateValueText}>
              {new Date(eventObjectData?.startDate).toDateString()}
            </Text>

            <View style={styles.dateRightView}>
              <Text style={styles.dateValueText}>
                {eventObjectData?.eventDateSchedule[0]?.startTime}
              </Text>
            </View>
          </View>
          <View style={styles.dateLabelView}>
            <Text style={styles.dateLabelText}>{Strings.endDate}</Text>
            <View style={styles.dateRightView}>
              <Text style={styles.dateLabelText}>{Strings.endTime}</Text>
            </View>
          </View>
          <View style={styles.dateValueView}>
            <Text style={styles.dateValueText}>
              {new Date(eventObjectData?.endDate).toDateString()}
            </Text>

            <View style={styles.dateRightView}>
              <Text style={styles.dateValueText}>
                {eventObjectData?.eventDateSchedule[0]?.endTime}
              </Text>
            </View>
          </View>
        </>
      ) : (
        ''
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Event Schedule</Text>
        <Text
          onPress={() => {
            navigation.navigate(NavigationRoutes.EventScheduleList, {
              ScheduleList: eventObjectData?.eventDateSchedule,
            });
          }}
          style={styles.viewAllTxtStyle}>
          View All
        </Text>
      </View>
    </View>
  );
};

// Render Event Detail View
const EventDetailView = ({eventObjectData, userId}) => (
  <View style={styles.eventDetailView}>
    {/* <View style={styles.detailRow}>
      <Text style={styles.detailLabelText}>{`${Strings.Website} : `}</Text>
      <Text style={styles.detailValueText}>{'www.chirpem.com'}</Text>
    </View> */}
    <View style={styles.detailRow}>
      {userId === eventObjectData?.userId && (
        <>
          <Text
            style={styles.detailLabelText}>{`${Strings.EventType} : `}</Text>
          <Text style={styles.detailValueText}>
            {eventObjectData?.categoryName}
          </Text>
        </>
      )}
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabelText}>{`${Strings.EventInfo} : `}</Text>
    </View>
    <Text style={styles.detailText}>{eventObjectData?.description}</Text>
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
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.optionView}
            onPress={() => {
              InfochirpsDetailsForUser(item.name).navigateTo &&
                navigation.navigate(
                  InfochirpsDetailsForUser(item.name).navigateTo,
                  {InfoChirpsDetails: item},
                );
            }}>
            <Image
              source={InfochirpsDetailsForUser(item.name).icon}
              style={styles.optionIcn}
            />

            <Text
              style={[
                styles.optionText,
                {color: InfochirpsDetailsForUser(item.name).color},
              ]}>
              {InfochirpsDetailsForUser(item.name).Name}
            </Text>
          </Pressable>
        )}
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
          Name: 'Add CheckList',
          color: '#0896A9',
          icon: Icons.checkListIcn,
          navigateTo: NavigationRoutes.EventCheckList,
        };

      case 'add choicelist':
        return {
          Name: 'Choice List',
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
  return (
    <View style={styles.mainContentContainer}>
      <View style={styles.mainContentContainer}>
        <ScrollView style={styles.contentContainer}>
          <FeatureOption
            {...{EventInfoChirpsData, InfochirpsDetailsForUser, navigation}}
          />
          <EventDate {...{eventObjectData, options, navigation}} />
          <EventGuests {...{navigation, eventObjectData}} />
          <EventDetailView {...{eventObjectData, userId}} />

          <EventSetting {...{refRBSheet}} />
          <EventMap {...{eventObjectData}} />
        </ScrollView>
        {/* <Pressable style={styles.btnSettingView} onPress={onOpenSetting}>
          <Image style={styles.btnSettingIcon} source={Icons.settingIcn} />
        </Pressable> */}
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventInfo;
