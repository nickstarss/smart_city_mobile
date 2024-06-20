
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#220937'
    },
    divSensor:{
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#341152',
        padding: 15,
        width: '70%',
        marginTop: 10,
        marginLeft: 60,
        borderRadius: 8
    },
    textoSensor:{
        color: 'white'
    },
    textoSensorTitulo:{
        color: '#9435E1',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20
    },
    titulo:{
        marginRight: 190,
        marginTop: 60,
        color: '#9733EA',
        fontSize: 22,
        fontWeight: 'bold'
    },
    sersorContainer:{
        width: '100%',
    }
});

export default styles