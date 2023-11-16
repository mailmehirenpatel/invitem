// 3rd Party Imports
import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

// Local Imports
import styles from './styles';

const MapViewComponent = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}) => {
  return (
    <View>
      <MapView
        focusable
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        style={styles.mapStyle}>
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          focusable
        />
      </MapView>
    </View>
  );
};

export default MapViewComponent;
