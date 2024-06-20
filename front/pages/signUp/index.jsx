import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput, Image } from 'react-native'
import { FontAwesome, AntDesign } from "@expo/vector-icons"
import styles from './styles'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logo from '../../assets/logo.png';

export default function SignUp({ navigation }) {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [erro, setErro] = useState(null)
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        AsyncStorage.setItem('token', token)
            .then(() => {
                if (token != null) {
                    console.log("Token SignUp: ", token)
                    console.log("Token sucesso!")
                }
            })
            .catch((erro) => {
                console.error("Erro: ", erro);
            })
    }, [token])
    
    const createUser = async () => {
        console.log("Usuario: ", usuario);
        console.log("Senha: ", password);
        try {
            const response = await axios.post('http://127.0.0.1:8000/create_user/',
                {
                    username: usuario,
                    password: password
                })
            const resp = await axios.post('http://127.0.0.1:8000/token/',
                {
                    username: usuario,
                    password: password
                })
                setToken(resp.data.access)
                navigation.navigate('Home')

        } catch (error) {
            setErro(error)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <View>
                <Text style={styles.title}>Se cadastre para entrar na</Text>
                <Text style={styles.title2}>cidade do Futuro</Text>
            </View>

            <View style={styles.campos}>
                <Text style={styles.texto2}>Nome de usuário</Text>
                <TextInput
                    placeholderTextColor='#7E3DB4'
                    style={styles.input}
                    onChangeText={setUsuario}
                    value={usuario}
                    placeholder='Digite seu nome de usuário'
                />
                <Text style={styles.texto2}>Sua senha</Text>
                <TextInput
                    placeholderTextColor='#7E3DB4'
                    style={styles.input}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Digite sua senha'
                />
            </View>

            <Pressable
                style={styles.btn}
                onPress={createUser}
            >
                <Text style={styles.btnCadastrar}>CADASTRAR</Text>
            </Pressable>

            <View style={styles.inscreverBox}>
                <Text style={styles.inscreverTexto}>Já tem uma conta?</Text>
                <Pressable
                    style={styles.inscrever}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#9733EA', fontStyle: 'italic', marginLeft: 6 }}>Fazer login</Text>
                </Pressable>
            </View>

            <View style={{ width: "80%" }}>
                <Text style={styles.textoErro}>{!erro ? '' : 'Erro: '}{erro}</Text>
            </View>
        </View>
    )
}

