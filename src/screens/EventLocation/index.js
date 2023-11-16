// 3rd Party Imports
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, ScrollView, Image, ImageBackground} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

// Local Imports
import {CustomButton, CustomNavbar, SearchTextInput} from '../../components';
import {Icons} from '../../assets';
import styles from './styles';
import {Strings} from '../../config/strings';
import Colors from '../../theme/Colors';
import {MarkerData} from '../../constants/mockdata';
import mockImages from '../../constants/MockImages/images';
import {getGooglePlaceLocation} from '../../utils';

const EventLocation = () => {
  // Global Event Location Field References
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [searchText, setSearchText] = useState();

  // initial Marker Location
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 23.061955,
    longitude: 72.5713337,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onCancel = useCallback(() => {}, []);
  // Search Location Functionality
  const onSearch = useCallback(val => {
    setSearchText(val);
  }, []);

  // UseEffect For Marker Location
  useEffect(() => {
    if (mapRef.current && markerRef.current && markerLocation) {
      const region = {
        latitude: markerLocation?.latitude,
        longitude: markerLocation?.longitude,
        latitudeDelta: markerLocation?.latitudeDelta,
        longitudeDelta: markerLocation?.longitudeDelta,
      };

      mapRef.current.animateToRegion(region, 500);
    }
  }, [markerLocation]);

  // Submit Location Input
  const onSubmitInput = useCallback(() => {
    getGooglePlaceLocation(searchText)
      .then(addressData => {
        const {lat, lng} = addressData?.results?.[0]?.geometry?.location;
        const {northeast, southwest} =
          addressData?.results?.[0]?.geometry?.viewport;
        const latitudeDelta = northeast?.lat - southwest?.lat;
        const longitudeDelta = northeast?.lng - southwest?.lng;
        setMarkerLocation({
          ...{
            latitude: lat,
            longitude: lng,
            latitudeDelta,
            longitudeDelta,
          },
        });
      })
      .catch(err => err);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.EventLocation}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.mainView}>
            <MapView
              ref={mapRef}
              focusable
              zoomEnabled
              zoomControlEnabled
              provider={'google'}
              initialRegion={markerLocation}
              region={markerLocation}
              style={styles.mapStyle}>
              {MarkerData.map((data, i) => {
                return (
                  <Marker
                    ref={markerRef}
                    title={searchText ? searchText : data?.title}
                    coordinate={searchText ? markerLocation : data?.coordinates}
                    key={i}>
                    <ImageBackground
                      source={Icons.pinMarkerIcon}
                      style={styles.imgBgStyle}
                      imageStyle={styles.imageBgImgStyle}>
                      <Image
                        source={searchText ? mockImages.Hockey : data?.image}
                        style={styles.eventPinIcon}
                      />
                    </ImageBackground>
                  </Marker>
                );
              })}
            </MapView>
          </View>
        </ScrollView>
        <View style={styles.bottomSearchView}>
          <SearchTextInput
            iconStyle={styles.searchIcon}
            containerStyle={styles.searchContainerStyle}
            textInputStyle={styles.textInput}
            placeholder={Strings.SearchEvent}
            placeholderTextColor={Colors.searchPlaceholder}
            value={searchText}
            onChangeText={onSearch}
            onSubmitEditing={onSubmitInput}
          />
          <CustomButton
            title={Strings.cancel}
            onPress={onCancel}
            btnStyle={styles.cancelBtn}
            textStyle={styles.btnText}
          />
        </View>
      </View>
    </View>
  );
};

export default EventLocation;
