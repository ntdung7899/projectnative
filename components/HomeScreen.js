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
function HomeScreen({ navigation, route }) {
    
    // storage value
    const setStorageValue = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@data', jsonValue)
        } catch (e) {
            // save error
            console.log('cant save value: '+ e)
        }

        console.log('save done')
    }
    // get value storage
    const getStorageValue = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@data')
            const parseValue = eval('(' + jsonValue + ')');
            var ids = new Set(parseValue.map(d => d.id));
            var merged = [...parseValue, ...fake.filter(d => !ids.has(d.id))];
             setData(merged);
            // return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
            console.log('cant get value: ')
        }

    }
    const fake = [
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
    ]
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
    const [data, setData] = useState(DATA);
    const [isRender, setRender] = useState(false);
    const [isModelVisible, setModelVisible] = useState(false);
    const [inputText, setInputText] = useState({
        id: 0,
        title: '',
        content: 'acd',
        begin: '',
    });
    const [editText, setEditText] = useState();

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (route.params?.data) {
            const receiveData = route.params.data;
            DATA.push(receiveData);
            setData(DATA);
            setRender(true);
            // console.log(DATA);

        }
    }, [route.params?.data]);
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
         getStorageValue()
        
         
        
    }, [])

    // storage value when it update
    useEffect(() => {
        setStorageValue(data)
    }, [data])
    const onPressDetail = (item) => {
        navigation.navigate('Details', { data: item });
    }
    const renderItem = ({ item, index }) => (
        <View style={styles.lineItem}>
            <View style={styles.leftItem}>
                <TouchableOpacity onPress={() => onPressDetail(item)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
                    <Text style={{ color: 'black' }}>{item.content}</Text>
                    <View style={{ marginTop: 10, flex: 1 }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                            <Text style={styles.timeText}>{item.begin}</Text>
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
                <TouchableOpacity onPress={() => onPressDeleteItem(item)}>
                    <Image source={{ uri: 'https://previews.123rf.com/images/vectorstockcompany/vectorstockcompany1808/vectorstockcompany180810079/107109630-delete-button-icon-vector-isolated-on-white-background-for-your-web-and-mobile-app-design-delete-but.jpg' }}
                        style={{
                            height: 30,
                            width: 30,
                            paddingTop: 20
                        }} />
                </TouchableOpacity>
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
    const onPressDeleteItem = (deleItem) => {
        const newData = data.filter(item => item.id !== deleItem.id)
        setData(newData);
        setRender(true);
        console.log(data)
    }
    const onPressAddItem = () => {
        navigation.navigate('CreateTask', { data: data.length });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <FlatList
                    data={data}
                    renderItem={(item) => renderItem(item)}
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
            <View style={styles.containerFloatingButton}>
                <TouchableOpacity onPress={() => onPressAddItem()}>
                    <Icon name="plus" size={22} color="blue" light />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leftItem: {
        flexDirection: 'column'
    },
    lineItem: {
        padding: 10,
        borderBottomWidth: 2,
        marginBottom: 10,
        flexDirection: 'row',

    },
    rightItem: {
        marginLeft: 'auto',
        flexDirection: 'row',
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