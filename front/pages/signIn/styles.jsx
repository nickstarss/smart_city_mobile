import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#220937',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    caixa:{
        width:'71%',
        borderRadius: 5,
        padding:8,
        fontSize:25,
        marginTop:12,
        backgroundColor: '#3C185A',
        color: 'white',
        fontSize: 14
    },
    title:{
        fontSize: 24,
        color: 'white',
    },
    title2:{
        fontSize: 24,
        fontWeight:'bold',
        color: '#9733EA'
    },
    caixas:{
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    },
    btnOk:{
        marginTop:20,
        borderWidth:1,
        borderRadius:8,
        width:'71%',
        height:50,
        backgroundColor:'#9733EA',
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        marginBottom: 80
    },
    nome:{
        marginTop: 20,
        marginRight: 167,
        color: 'white',
        fontSize: 15
    },
    nome2:{
        marginTop: 20,
        marginRight: 240,
        color: 'white',
        fontSize: 15  
    },
    inscreverBox:{
        display: 'flex',
        flexDirection: 'row',
        marginRight: 65,
        marginTop: 16
    },

    inscrever:{
        color: 'white'
    },
    inscreverTexto:{
        color: 'white',
        fontSize: 14
    },
    errorMessage:{
        color: 'red',
        marginTop: 10,
        marginRight: 90
    }

})

export default styles