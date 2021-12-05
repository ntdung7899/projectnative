import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Alert,
} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function EditTaskScreen({ navigation, route }) {
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [time, setTime] = useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState(null)
    const [desErrorMessage, setDesErrorMessage] = useState(null)
    useEffect(() => {
        const { params } = route;
        if (params?.selectedTask) {
            setName(params?.selectedTask?.name);
            setDes(params?.selectedTask?.des);
            setTime(params?.selectedTask?.begin);
        }
    }, [route]);
    const onSubmit = () => {
        const { params } = route;
        const updatedTask = {
            id: params?.selectedTask?.id,
            name,
            des,
            time,
        };
        navigation.navigate({
            name: 'Home',
            params: { updatedTask },
            merge: true,
        });
    };
    const validateName = (text) => {
        return text.length < 1 ? setNameErrorMessage('Name task not null !!!') : setNameErrorMessage(null)
    }
    const validateDes = (text) => {
        return text.length < 1 ? setDesErrorMessage('Description task not null !!!') : setDesErrorMessage(null)
    }
    const validateTitleAndSaveTask = (text) => {
        
        validateName(text);
        setName(text);
    }
    const validateDesAndSaveTask = (text) => {
        validateDes(text);
        setDes(text);
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View>
                    <TextInput
                        outlineColor='blue'
                        value={name}
                        mode='outlined'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => validateTitleAndSaveTask(text)}
                        maxLength={200}
                        multiline={false}
                        placeholder="Enter work..." />
                    <HelperText type='error' visible={Boolean(nameErrorMessage)} >
                        {nameErrorMessage}
                    </HelperText>
                </View>
                <View >
                    <TextInput
                        outlineColor='blue'
                        // style={styles.input}
                        value={des}
                        mode='outlined'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => validateDesAndSaveTask(text)}
                        maxLength={200}
                        multiline={false}
                        placeholder="Enter work..." />
                    <HelperText type='error' visible={Boolean(desErrorMessage)}>
                        {desErrorMessage}
                    </HelperText>
                </View>
                <View>
                    <View style={styles.viewTime}>
                        <Text style={styles.timeEditText} title="Open">{time}</Text>
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
                            //console.log('dddd',date.getMonth())
                            const month = Number(date.getMonth()) + 1
                            // console.log('month',month)
                            setDate(date)
                            setTime( date.getDate() + '/' + month + '/' + date.getFullYear())

                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.btnSave} onPress={() => onSubmit()}>
                    <Text style={{ color: 'red', }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: 10,
        position: 'absolute',
    },
    body: {
        justifyContent: 'center',
        marginTop: 40
    },
    name: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        paddingVertical: 10,
        borderRadius: 100,
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
        marginBottom: 10,
        paddingTop: 5,
        paddingLeft: 20,
    },
    viewTime: {
        flexDirection: 'row',
        marginTop: 20
    },
    btnSave: {
        borderWidth: 2,
        marginTop: 30,
        borderColor: 'blue',
        borderRadius: 30,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});
