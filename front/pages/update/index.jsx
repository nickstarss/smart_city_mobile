import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, TextInput, Pressable } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UPDATE() {
    const [userId, setUserId] = useState(0)
    const [usuario, setUsuario] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [cep, setCep] = useState('')
    const [email, setEmail] = useState('')
    const [num, setNum] = useState('')
    const [pass, setPassword] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then((tokenY) => {
                console.log('token Update: ', tokenY)
                setToken(tokenY);
            })
            .catch(error => {
                console.error('Erro ao recuperar token:', error);
            });
    }, []);

    const dados = {
        'nome': usuario,
        'rua': rua,
        'bairro': bairro,
        'cidade': cidade,
        'uf': uf,
        'cep': cep,
        'email': email,
        'numero': num
    }

    const buscar = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/usuario/' + userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsuario(response.data.nome)
            setRua(response.data.rua)
            setBairro(response.data.bairro)
            setCidade(response.data.cidade)
            setUF(response.data.uf)
            setCep(response.data.cep)
            setEmail(response.data.email)
        }
        catch (erro) {
            console.error(erro);
        }
    }

    const update = async (dados, token) => {
        console.log("Token UP", token, dados);
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/usuario/' + userId, dados, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                
            });
            
            setBairro('')
            setCep('')
            setCidade('')
            setEmail('')
            setNum('')
            setPassword('')
            setRua('')
            setUF('')
            setUserId('')
            setUsuario('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>UPDATE</Text>
            <Text style={styles.texto2}>ID:</Text>
            <TextInput
                style={styles.ID}
                onChangeText={(e) => setUserId(e)}
            />

            <View>
                <Pressable
                    style={styles.btn}
                    onPress={buscar}
                >
                    <Text style={{ fontWeight: 'bold' }}>GET</Text>
                </Pressable>
            </View>
            <View style={styles.campos}>
                <Text style={styles.texto2}>Nome:</Text>
                <TextInput
                    style={styles.textoNomeEmail}
                    onChangeText={setUsuario}
                    value={usuario}
                />
                <View style={styles.cx}>
                    <Text style={styles.texto2}>Cep:</Text>
                </View>
                <View style={styles.cx}>
                    <TextInput
                        style={styles.textoCep}
                        onChangeText={setCep}
                        value={cep}
                    />

                </View>
                <View style={styles.cx}>
                    <Text style={styles.textoCidade2}>Rua:</Text>
                    <Text style={styles.textoUf2}>      Nº</Text>
                </View>
                <View style={styles.cx}>
                    <TextInput
                        style={styles.texto}
                        onChangeText={setRua}
                        value={rua}
                    />
                    <TextInput
                        style={styles.textoNum}
                        onChangeText={setNum}
                        value={num}
                    />
                </View>
                <Text style={styles.texto2}>Bairro:</Text>
                <TextInput
                    style={styles.texto}
                    onChangeText={setBairro}
                    value={bairro}
                />
                <View style={styles.cx}>
                    <Text style={styles.textoCidade2}>Cidade:</Text>
                    <Text style={styles.textoUf2}>UF:</Text>
                </View>
                <View style={styles.cx}>
                    <TextInput
                        style={styles.textoCidade}
                        onChangeText={setCidade}
                        value={cidade}
                    />
                    <TextInput
                        style={styles.textoUf}
                        onChangeText={setUF}
                        value={uf}
                    />
                </View>
                <Text style={styles.texto2}>Email:</Text>
                <TextInput
                    style={styles.textoNomeEmail}
                    onChangeText={setEmail}
                    value={email}
                />


                <Text style={styles.texto2}>Senha:</Text>
                <TextInput
                    style={styles.addNew}
                    onChangeText={(e) => setPassword(e)}
                    value={pass}
                    secureTextEntry={true}
                />

                <View style={{ alignItems: 'center' }}>
                    <Pressable
                        style={styles.btn}
                        onPress={()=> update(dados, token)}
                    >
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>PUT</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


