import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 55, 
    longitude: 12, 
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  const MapViewRef = useRef(null);
  const locationSubscription = useRef(null);

  useEffect(() => {
    async function startListening() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("No access to location");
      } else {
        locationSubscription.current = await Location.watchPositionAsync(
          {
            distanceInterval: 100,
            accuracy: Location.Accuracy.High,
          },
          (location) => {
            const newRegion = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.028,
              longitudeDelta: 0.02,
            };
            setRegion(newRegion);
            if (MapViewRef.current) {
              MapViewRef.current.animateToRegion(newRegion);
            }
          }
        );
      }
    }

    startListening();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  function addMarker(data) {
    const { latitude, longitude } = data.nativeEvent.coordinate;
    const newMarker = {
      coordinate: { latitude, longitude },
      key: data.timeStamp.toString(),
      title: "Great place",
    };
    setMarkers([...markers, newMarker]);
  }

  function onMarkerPressed(text) {
    alert("You pressed " + text);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onLongPress={addMarker}
        ref={MapViewRef}
      >
        {markers.map((marker) => (
          <Marker
            coordinate={marker.coordinate}
            key={marker.key}
            title={marker.title}
            onPress={() => onMarkerPressed(marker.title)}
          />
        ))}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

