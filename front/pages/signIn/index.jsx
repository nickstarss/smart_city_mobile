import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, Image } from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    useEffect(() => {
        AsyncStorage.setItem('token', token)
            .then(() => {
                if (token != null) {
                    console.log("Token SignIn: ", token)
                    console.log("Token sucesso!")
                }
            })
            .catch((erro) => {
                console.error("Erro: ", erro);
            })
    }, [token])

    useEffect(() => {
        AsyncStorage.setItem('usuario', user)
            .then(() =>{
                if (user != null){
                    console.log("Usuario: ", user)
                }
            })
            .catch((erro) => {
                console.error("Usuario indefinido: ", erro)
            })
    })

    const fetchToken = async ()=>{
        try{
            const response = await axios.post(
                'https://nickback.pythonanywhere.com/api/token/',
                {
                    username: user,
                    password: password
                }
            )
            console.log(response.data.access)
            setToken(response.data.access)
            navigation.navigate('Home')
            setUser(user)

        } catch (erro){
            console.error("Deu Erro:", erro);
        }
        
    }


    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <View>
                <Text style={styles.title}>Faça login para entrar na</Text>
                <Text style={styles.title2}>cidade do Futuro</Text>
            </View>
            <Text style={styles.nome}>Nome de usuário</Text>
            <TextInput
                placeholderTextColor='#7E3DB4'
                placeholder='Digite seu nome de usuário'
                onChangeText={setUser}
                value={user}
                style={styles.caixa}
            />
            
            <Text style={styles.nome2}>Senha</Text>
            <TextInput
                placeholderTextColor='#7E3DB4'
                placeholder='Digite sua senha'
                onChangeText={setPassword}
                value={password}
                style={styles.caixa}
                secureTextEntry={true}
            />

            <Pressable
                style={styles.btnOk}
                onPress={fetchToken}
            >
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>LOGIN</Text>
            </Pressable>

            <View style={styles.inscreverBox}>
                <Text style={styles.inscreverTexto}>Não tem uma conta?</Text>
                <Pressable
                    style={styles.inscrever}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#9733EA', fontStyle: 'italic', marginLeft: 6 }}>Se inscreva</Text>
                </Pressable>
            </View>


        </View>
    )
}