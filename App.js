import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function App() {
  useEffect(() => {
    async function askPermissions() {
      var { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        var location = await Location.getCurrentPositionAsync({});
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
        <Marker coordinate={{latitude: 48.858370, longitude: 2.294481}} />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
