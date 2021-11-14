import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    LogBox,
    Button,
} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateTaskScreen from './CreateTaskScreen';
import LoginScreen from './LoginScreen';
import NotificationContext from './NotificationContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen({ navigation, route }) {
    const Tab = createBottomTabNavigator();
    const dataFromContext = React.useContext(NotificationContext)

    // storage value
    const setStorageValue = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)

            await AsyncStorage.setItem(key, jsonValue)
            console.log('save success',jsonValue)
        } catch (e) {
            // save error
            console.log('cant save value: ' + e)
        }
    }
    const setStorageCompleteValue = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)

            await AsyncStorage.setItem('@completeData', jsonValue)
            console.log('save complete data',jsonValue)
        } catch (e) {
            // save error
            console.log('cant save value: ' + e)
        }
    }
    // get value storage
    const DATA = [
        {
            id: 1,
            title: 'Tập thể dục',
            content: 'Gập bụng 1000 cái, đu xà 1000 cái',
            begin: 'March 21, 2012'
        },
        {
            id: 2,
            title: 'Shopping',
            content: 'Dắt người yêu đi shopping',
            begin: '30/11/2021'
        },
        {
            id: 3,
            title: 'Thăm gia đình người yêu',
            content: 'Về quê thăm gia đình người yêu và xin phép ',
            begin: '3/12/2021'
        },
        {
            id: 4,
            title: 'Cúng rằm',
            content: 'Mua trái cây cúng rằm',
            begin: '15/12/2021'
        },
        {
            id: 5,
            title: 'Cúng rằm',
            content: 'Mua trái cây cúng rằm',
            begin: '15/12/2021'
        },
        {
            id: 6,
            title: 'Cúng rằm',
            content: 'Mua trái cây cúng rằm',
            begin: '15/12/2021'
        },
        {
            id: 7,
            title: 'Cúng rằm',
            content: 'Mua trái cây cúng rằm',
            begin: '15/12/2021'
        },
        {
            id: 8,
            title: 'Cúng rằm',
            content: 'Mua trái cây cúng rằm',
            begin: '15/12/2021'
        },
        {
            id: 9,
            title: 'Cúng rằm',
            content: 'Mua trái cây cúng rằm',
            begin: '15/12/2021'
        },


    ]

    const [data, setData] = useState();
    const [isRender, setRender] = useState(false);
    const [isModelVisible, setModelVisible] = useState(false);
    const [inputText, setInputText] = useState({
        id: 0,
        title: '',
        content: '',
        begin: '',
    });


    const [editText, setEditText] = useState();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [completeData, setCompleteData] = useState([]);
    useEffect(() => {
        console.log('first load data route')
        setRender(true);
    }, [])


    useEffect(() => {
        if (route.params?.data) {
            const dataFromRoute = route.params?.data;
            console.log('dataFromRoute', dataFromRoute);
            setData((prev) => [...prev, dataFromRoute]);

        }
    }, [route.params?.data]);
    //storage value when it update

    useEffect(() => {
        if(data){
            data && console.log('dataLoad', data)
            setRender(true);
            setStorageValue('@data',data)
        }
        
    }, [data])
    useEffect(() => {
        if(dataFromContext){
            dataFromContext&& console.log('dataFromContext', dataFromContext)
            setData(dataFromContext)
            setRender(true);
        }
        
    }, [dataFromContext])

    useEffect(() => {
        completeData && console.log('complete:', completeData)
        setStorageCompleteValue(completeData)
    }, [completeData])

    const onPressDetail = (item) => {
        navigation.navigate('Details', { data: item });
    }
    const onPressCompleteItem = (value) => {

        setCompleteData((prev) => [...prev, value])
        const newData = data.filter(item => item.id !== value.id)
        setData(newData);
        setRender(true);
    }


    const renderItem = ({ item, index }) => (
        <View style={styles.container}>
            <View style={{
                marginTop: 10,
                padding: 10,
                borderColor: 'white',
                marginBottom: 10,
                flexDirection: 'row',
                borderRadius: 10,
                backgroundColor: index % 2 == 0 ? 'rgb(245, 213, 207)' : 'rgb(207, 236, 255)',
                width: '95%',
                height: 200
            }}>
                <View style={styles.leftItem}>
                    <TouchableOpacity onPress={() => onPressDetail(item)}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingTop: 20 }}>{item.title}</Text>
                        <Text style={{ color: 'black', paddingTop: 20, }}>{item.content}</Text>
                        <View style={{ marginTop: 10, flex: 1, paddingTop: 30 }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', }}>

                                <Text style={styles.timeText}><Icon name="calendar-times-o" /> {item.begin}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                </View>
                <View style={styles.rightItem}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onPressEditItem(item)}>
                        <Image source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/09/73/edit-icon-vector-22390973.jpg' }}
                            style={{
                                height: 30,
                                width: 30,
                                paddingTop: 20
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10, }} onPress={() => onPressCompleteItem(item)}>
                        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQCKgcedvbY_2c4E2T-_B1FUUhZbnId3Pgsw&usqp=CAU' }}
                            style={{
                                height: 30,
                                width: 30,
                                paddingTop: 20,
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPressDeleteItem(item, '@data')}>
                        <Image source={{ uri: 'https://previews.123rf.com/images/vectorstockcompany/vectorstockcompany1808/vectorstockcompany180810079/107109630-delete-button-icon-vector-isolated-on-white-background-for-your-web-and-mobile-app-design-delete-but.jpg' }}
                            style={{
                                height: 30,
                                width: 30,
                                paddingTop: 20
                            }} />
                    </TouchableOpacity>

                </View>

            </View>
        </View>


    );

    const onPressEditItem = (item) => {

        setModelVisible(true);
        setInputText({ id: item.id, title: item.title, content: item.content, begin: item.begin });
        setEditText(item.id);


    };
    const handleSaveEditItem = (editText) => {
        const newData = data.map(item => {
            if (item.id == editText) {
                item.title = inputText.title;
                item.content = inputText.content;
                item.begin = inputText.begin;
                console.log(inputText.begin);
                return item;
            }
            return item;
        })

        setData(newData);
        setRender(true);
    }
    const onPressSaveEdit = () => {
        handleSaveEditItem(editText);
        setModelVisible(false);
    }
    const onPressDeleteItem = (deleItem, key) => {
        const newData = data.filter(item => item.id !== deleItem.id)
        setData(newData);
        setStorageValue(key, newData);
        setRender(true);
        //console.log(data)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerContent}>
                <FlatList
                    data={data}
                    renderItem={(item, index) => renderItem(item, index)}
                    keyExtractor={item => item.id}
                    extraData={isRender}
                />
                <Modal animationType='fade'
                    visible={isModelVisible}>

                    <View style={styles.editContainer}>
                        <View style={styles.borderContainer}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'orange', marginBottom: 20 }}>Edit task: </Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    outlineColor='blue'
                                    style={styles.input}
                                    value={inputText.title}
                                    mode='outlined'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => setInputText({ id: inputText.id, title: text, content: inputText.content, begin: inputText.begin })}
                                    maxLength={200}
                                    multiline={false}
                                    placeholder="Enter work..." />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    outlineColor='blue'
                                    style={styles.input}
                                    value={inputText.content}
                                    mode='outlined'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => setInputText({ id: inputText.id, title: inputText.title, content: text, begin: inputText.begin })}
                                    maxLength={200}
                                    multiline={false}
                                    placeholder="Enter work..." />
                            </View>
                            <View>
                                <View style={styles.viewTime}>
                                    <Text style={styles.timeEditText} title="Open">{inputText.begin}</Text>
                                    <TouchableOpacity onPress={() => setOpen(true)}>
                                        <Text style={{ color: 'red', paddingTop: 20, paddingLeft: 90, fontSize: 20 }} title="Open" >Change time</Text>
                                    </TouchableOpacity>

                                </View>

                                <DatePicker
                                    modal
                                    mode="date"
                                    open={open}
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                        setInputText({ id: inputText.id, title: inputText.title, content: inputText.content, begin: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() })
                                        console.log(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                            </View>
                            <View style={styles.inputView}></View>
                            <TouchableOpacity style={styles.btnSave} onPress={() => onPressSaveEdit()}>
                                <Text style={{ color: 'red', }}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

            </View>

        </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContent: {

    },

    leftItem: {
        flexDirection: 'column'
    },
    lineItem: {

    },
    rightItem: {
        marginLeft: 'auto',
        flexDirection: 'row',

        paddingTop: 20
    },
    containerFloatingButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        bottom: 50,
        right: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,

    },

    editContainer: {
        marginTop: 80,
        alignItems: 'center'

    },
    borderContainer: {

        height: 500,
        width: 400,
        borderWidth: 2,
        alignItems: 'center',
    },
    inputView: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 50,
        marginTop: 10

    },
    input: {
        width: 350,
        margin: 12,
        height: 40,
        backgroundColor: null,

    },

    timeText: {
        color: 'black',
        borderWidth: 1,
        width: 120,
        height: 30,
        borderColor: 'blue',
        paddingLeft: 12,
        borderRadius: 20,
        paddingTop: 5,
        paddingLeft: 20,
    },
    timeEditText: {
        color: 'black',
        borderWidth: 1,
        width: 120,
        height: 30,
        borderColor: 'blue',
        paddingLeft: 12,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 5,
        paddingLeft: 20,
    },
    btnSave: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 30,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    viewTime: {
        flexDirection: 'row',
        marginTop: 30
    },
    timeEdit: {
        color: 'red',
        paddingTop: 20
    },

});
export default HomeScreen