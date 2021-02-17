import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function App() {
  const [position, setPosition] = useState({});

  useEffect(() => {
    async function askPermissions() {
      var { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        // var location = await Location.getCurrentPositionAsync({}); // relève coordonnées 1 fois
        Location.watchPositionAsync({ distanceInterval: 10 }, // mises à jour tous les 10 mètres
          (location) => {
            console.log(location);
            setPosition({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })
          }
        );
      }
    }
    askPermissions();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1, width: '100%' }}
        initialRegion={{
          latitude: 48.858370,
          longitude: 2.294481,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 48.858370, longitude: 2.294481 }} />
        <Marker coordinate={{ latitude: position.latitude, longitude: position.longitude }} title="Hello"
          description="I am here" />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
