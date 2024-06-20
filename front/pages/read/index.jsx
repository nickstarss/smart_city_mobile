import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage'

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

export default function Read() {
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

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Sensores</Text>
            <ScrollView style={styles.sersorContainer}>
                {Object.keys(sensores).map((key) =>
                sensores[key].map((sensor) => (
                    <View style={styles.divSensor}>
                        <Text style={styles.textoSensorTitulo}>{sensor.Sala}</Text>
                        <Text style={styles.textoSensor}>ID: {sensor.id}</Text>
                        <Text style={styles.textoSensor}>Latitude: {sensor.Latitude}</Text>
                        <Text style={styles.textoSensor}>Longitude: {sensor.Longitude}</Text>
                        <Text style={styles.textoSensor}>Temperatura: {sensor.Temperatura}</Text>
                    </View>
                ))
                )}
            </ScrollView>
        </View>
    );
}


