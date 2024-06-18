import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const sensores = {
  "2° Andar (Bloco A) - Layra e Marcela": [
    {
      "id": 1,
      "Sala": "A210",
      "Latitude": -22.9141786,
      "Longitude": -47.0684443,
    },
    {
      "id": 2,
      "Sala": "A208",
      "Latitude": -22.9142780,
      "Longitude": -47.0685967,
    },
    {
      "id": 3,
      "Sala": "A206",
      "Latitude": -22.9142033,
      "Longitude": -47.0684418,
    },
    {
      "id": 4,
      "Sala": "A204",
      "Latitude": -22.9141931,
      "Longitude": -47.0684307,
    },
    {
      "id": 5,
      "Sala": "A202",
      "Latitude": -22.9141792,
      "Longitude": -47.0683707,
    }
  ]
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('usuario');
        if (storedUser !== null) {
          setUser(storedUser);
          console.log("Usuario ", user, " encontrado");
        }
      } catch (error) {
        console.error('Erro ao buscar usuário do AsyncStorage:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      }, (newLocation) => {
        setLocation(newLocation.coords);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo, {user}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.9141396,
          longitude: -47.0681575,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        {Object.keys(sensores).map((key) =>
          sensores[key].map((sensor) => (
            <Marker
              key={sensor.id}
              coordinate={{ latitude: sensor.Latitude, longitude: sensor.Longitude }}
              title={sensor.Sala}
              pinColor="blue"
            />
          ))
        )}
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Você está aqui"
            pinColor="red"
          />
        )}
      </MapView>
      {location && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Latitude: {location.latitude.toFixed(6)}</Text>
          <Text style={styles.text}>Longitude: {location.longitude.toFixed(6)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '95%',
    height: '50%',
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});