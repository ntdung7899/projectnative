import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native';

function DetailsScreen({ navigation, route }) {
    const [dataItem, setDataItem] = useState({
        id: 0,
        title: '',
        content: '',
        begin: '',
    });
    var receiveData;
    useEffect(() => {
        if (route.params?.data) {
            receiveData = route.params.data;
            setDataItem({ id: receiveData.id, title: receiveData.title, content: receiveData.content, begin: receiveData.begin, });
            console.log(dataItem);
        }
    }, [route.params?.data]);
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <View style = {styles.topItem}>
                    <Text style={styles.txtTitle}>{dataItem.title}</Text>
                    <Text style = {styles.txtTime}>{dataItem.begin} </Text>
                </View>
                <View style={styles.bottomItem}>
                    <Text style={styles.txtDescription}> Description: </Text>
                    <Text style={styles.txtContent}>{dataItem.content}</Text>
                </View>
                
            </View>
            <View style = {styles.viewBtn}>
                    <TouchableOpacity style={styles.btnDone}
                        onPress = {() => navigation.navigate('Home')}>
                        <Text style = {{ color: 'red', fontSize: 18, fontWeight: 'bold'}}>Done</Text>
                    </TouchableOpacity>
                </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' , alignItems: 'center' },
    viewContainer: {
        alignItems: 'center',  
        width: 400, 
        borderWidth: 1, 
        
    },
    bottomItem: {
        flexDirection: 'column',
        width: 200,
        alignItems: 'center',

    },
    txtTitle: {
        paddingTop: 60,
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',

    },
    topItem:{
        borderBottomWidth: 1,
        width: 400,
        alignItems: 'center',
        borderColor: 'blue'
    },
    txtTime: {
        padding: 10,
    },
    txtDescription: {
        fontSize: 18, 
        fontWeight: 'bold', 
        fontWeight: 'bold', 
        color: 'black',
        paddingTop: 20 
    },
    txtContent:{
        paddingTop: 20, 
        paddingBottom: 30
    },
    viewBtn:{
        marginTop: 40, 
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    btnDone:{

    },
})
export default DetailsScreen;