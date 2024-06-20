import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const sensores = {
  "2° Andar (Bloco A) - Layra e Marcela": [
    {
      "id": 1,
      "Sala": "A210",
      "Latitude": -22.9141786,
      "Longitude": -47.0684443,
      "Temperatura": "34,6°"
    },
    {
      "id": 2,
      "Sala": "A208",
      "Latitude": -22.9142780,
      "Longitude": -47.0685967,
      "Temperatura": "26,7°"
    },
    {
      "id": 3,
      "Sala": "A206",
      "Latitude": -22.9142033,
      "Longitude": -47.0684418,
      "Temperatura": "30,1°"
    },
    {
      "id": 4,
      "Sala": "A204",
      "Latitude": -22.9141931,
      "Longitude": -47.0684307,
      "Temperatura": "29,2°"
    },
    {
      "id": 5,
      "Sala": "A202",
      "Latitude": -22.9141792,
      "Longitude": -47.0683707,
      "Temperatura": "22,9°"
    }
  ]
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);
  const [nearestSensor, setNearestSensor] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Busca o token no AsyncStorage
        if (token) {
          setIsLoggedIn(true);
          console.log('usuario logado')

        } else {
          setIsLoggedIn(false);
          console.log('usuario nao logado')
        }
      } catch (error) {
        console.error('Erro ao verificar o status de login:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

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

  useEffect(() => {
    if (location) {
      const distances = Object.keys(sensores).flatMap(key =>
        sensores[key].map(sensor => ({
          ...sensor,
          distance: haversine(location.latitude, location.longitude, sensor.Latitude, sensor.Longitude)
        }))
      );

      const closestSensor = distances.reduce((min, sensor) => sensor.distance < min.distance ? sensor : min, distances[0]);
      setNearestSensor(closestSensor);
    }
  }, [location]);

  const handleMarkerPress = (sensor) => {
    setSelectedSensor(sensor);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo, {user}</Text>

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
              onPress={() => handleMarkerPress(sensor)} // Adiciona evento de clique
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedSensor?.Sala}</Text>
            <Text style={styles.modalText}>ID: {selectedSensor?.id}</Text>
            <Text style={styles.modalText}>Temperatura: {selectedSensor?.Temperatura} C</Text>
            <Text style={styles.modalText}>Latitude: {selectedSensor?.Latitude}</Text>
            <Text style={styles.modalText}>Longitude: {selectedSensor?.Longitude}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {location && nearestSensor && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Latitude: {location.latitude.toFixed(6)}</Text>
          <Text style={styles.text}>Longitude: {location.longitude.toFixed(6)}</Text>
          <Text style={styles.text}>Sensor mais próximo: {nearestSensor.Sala}</Text>
          <Text style={styles.text}>Distância: {nearestSensor.distance.toFixed(2)} km</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#220937',
  },
  map: {
    width: '100%',
    height: '40%',
  },
  textContainer: {
    backgroundColor: '#341152',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 8
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
    padding: 16
  },
  titulo:{
    color: '#9733EA',
    fontSize: 23,
    marginTop: 90,
    marginBottom: 16,
    fontWeight: 'bold',
    marginLeft: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#341152',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});