import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Delete() {
    const [userId, setUserId] = useState(0)
    const [usuario, setUsuario] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [cep, setCep] = useState('')
    const [email, setEmail] = useState('')
    const [numero, setNum] = useState('')
    const [token, setToken] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then((tokenY) => {
                console.log('token Delete: ', tokenY)
                setToken(tokenY);
            })
            .catch(error => {
                console.error('Erro ao recuperar token:', error);
            });
    }, [excluir]);


    const procurar = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/usuario/' + userId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setUsuario(response.data.nome)
            setRua(response.data.rua)
            setBairro(response.data.bairro)
            setCidade(response.data.cidade)
            setUF(response.data.uf)
            setCep(response.data.cep)
            setEmail(response.data.email)

        } catch (error) {
            console.log(error);
        }

    }
    const excluir = async (userId, token) => {
        try {
            const response = await axios.delete('http://127.0.0.1:8000/api/usuario/' + userId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setBairro('')
            setCep('')
            setCidade('')
            setEmail('')
            setNum('')
            setRua('')
            setUF('')
            setUserId('')
            setUsuario('')
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>DELETE</Text>
            <Text style={styles.texto2}>ID:</Text>
            <TextInput
                style={styles.ID}
                onChangeText={(e) => setUserId(e)}
            />

            <View style={styles.btnC}>
                <Pressable
                    style={styles.btnBuscar}
                    onPress={procurar}
                >
                    <Text style={styles.btnTxt}>Buscar</Text>
                </Pressable>
            </View>
            <View style={styles.campos}>
                <Text style={styles.texto2}>Nome:</Text>
                <Text style={styles.textoNomeEmail}>{usuario}</Text>
                <Text style={styles.texto2}>Cep:</Text>
                <Text style={styles.textoNomeEmail}>{cep}</Text>
                <Text style={styles.texto2}>Rua:</Text>
                <Text style={styles.texto}>{rua}</Text>
                <Text style={styles.texto2}>Bairro:</Text>
                <Text style={styles.texto}>{bairro}</Text>
                
                <View style={styles.cx}>
                    <Text style={styles.textoCidade2}>Cidade:</Text>
                    <Text style={styles.textoUf2}>UF:</Text>
                </View>
                
                <View style={styles.cx}>
                    <Text style={styles.textoCidade}>{cidade}</Text>
                    <Text style={styles.textoUf}>{uf}</Text>
                </View>
                
                <Text style={styles.texto2}>Email:</Text>
                
                <Text style={styles.textoNomeEmail}>{email}</Text>
            
            </View>

            <View style={styles.btnD}>
                <Pressable
                    style={styles.btnApagar}
                    onPress={() => excluir(userId, token)}
                >
                    <Text style={styles.btnTxt2}>Apagar</Text>
                </Pressable>
            </View>

        </View>
    );
}


// 