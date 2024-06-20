
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#220937'
    },
    ID: {
        width: '20%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    addNew: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    texto: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#bbb',
        borderWidth: 1,
        padding: 5,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#3C185A',
        borderRadius: 5,
        padding:8,
        fontSize:25,
        backgroundColor: '#3C185A',
        color: 'white',
        fontSize: 14
    },

    title: {
        fontSize: 24,
        color: 'white',
    },
    title2:{
        fontSize: 24,
        fontWeight:'bold',
        color: '#9733EA'
    },
    texto2: {
        marginTop: 16,
        color: 'white',
        marginBottom: 12
        
    },
    textoCidade2: {
        marginTop: 10,
        
    },
    textoUf2: {
        marginTop: 10,
        marginLeft: '70%'
    },

    
    btn: {
        marginTop:20,
        borderWidth:1,
        borderRadius:8,
        width:'75%',
        height:50,
        backgroundColor:'#9733EA',
        alignItems:'center',
        justifyContent:'center',
    },
    btnPost: {
        width: 100,
        height: 40,
        marginTop: 25,
        marginBottom: 10,
        borderWidth: 1,
        backgroundColor: '#00f',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnC:{
        width:'80%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    btnD:{
        width:'80%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    btnTxt:{
        color:'#fff',
        fontSize:20,
        fontWeight: 'bold'
    },
    btnTxt2:{
        color:'#000',
        fontSize:20,
        fontWeight: 'bold'
    },
    btnBuscar: {
        width: '40%',
        height: 50,
        borderWidth: 1,
        backgroundColor: '#00f',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    btnApagar: {
        width: '40%',
        height: 50,
        borderWidth: 1,
        backgroundColor: '#f00',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
        
    },
    cx: {
        marginTop: 1,
        width: '100%',
        flexDirection: "row"
    },
    campos:{
        width:'75%',
    },
    logo:{
        marginBottom: 80
    },
    inscreverBox:{
        display: 'flex',
        flexDirection: 'row',
        marginRight: 95,
        marginTop: 16
    },
    inscrever:{
        color: 'white'
    },
    inscreverTexto:{
        color: 'white',
        fontSize: 14
    },
    btnCadastrar:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default styles