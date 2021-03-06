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
    LogBox
} from 'react-native';
import { HelperText, TextInput, Paragraph, Dialog, Portal, Provider, Button } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import NotificationContext from './NotificationContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function CreateTaskScreen({ route, navigation }) {

    const count = React.useContext(NotificationContext);
    const defaultState = {
        id: 0,
        title: '',
        content: '',
        begin: '',
    }
    //console.log(count);
    const [newTask, setNewTask] = useState(defaultState)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dataLength, setDataLength] = useState()
    const [isError, setError] = useState({
        errorName: false,
        errorContent: false,
        errorTime: false,
    })
    
    useEffect(() => {
        dataLength && console.log('dataLength',dataLength);
    }, [dataLength]);

    useFocusEffect(
        React.useCallback(() => {
        getStorageValue()
        }, [])
     );
    const hasErrorName = (value) => {
        setError({
            errorName: (value.length < 1 ? true : false),
            errorContent: isError.errorContent,
            errorTime: isError.errorTime
        })
    };
    const hasErrorContent = (value) => {
        setError({
            errorName: isError.errorName,
            errorContent: value.length < 1 ? true : false,
            errorTime: isError.errorTime
        })
    };
    const onPressCreate = () => {
         console.log(newTask)
        if(newTask.title == '') setError({ errorName: true, errorContent: isError.errorContent, errorTime: isError.errorTime })
        if(newTask.content == '') setError({ errorName: isError.errorName, errorContent: true, errorTime: isError.errorTime })
        if(newTask.begin == '' || newTask.begin === undefined) {
            
            setError({ errorName: isError.errorName, errorContent: isError.errorContent, errorTime: true })
            
        }
        else {
            if(newTask.title == '' || newTask.content == ''){
                return;
            }
            setNewTask(defaultState)
            setError({ errorName: false, errorContent: false, errorTime: false })
            navigation.navigate('Home', { screen: 'Home', data: newTask })
        }
    }
    const getLength = (value) => {
        value.sort((a,b) => a.id - b.id);
        const lastObj = value.slice(-1);
        let result = lastObj.map(a => a.id)
        setDataLength(Number(result))
        // console.log(Number(result))
    }
    async function getStorageValue() {
        try {
          const item = await AsyncStorage.getItem('@data');
          const value = item ? JSON.parse(item) : defaultState;
          getLength(value);
        } catch (e) {
          console.log('cant get value complete: ' + e)
        }
      }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.borderContainer}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', paddingTop: 50, }}><Icon name="edit" size={22} />Create task </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            label='name task'
                            outlineColor='gray'
                            style={styles.input}
                            value={newTask.title}
                            mode='flat'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => { setNewTask({ id: dataLength + 1, title: text, content: newTask.content, newTask: newTask.begin }); hasErrorName(text) }}
                            maxLength={200}
                            multiline={false}
                            placeholder="Enter name task" />
                        <HelperText type='error' visible={isError.errorName}>Name task is empty !</HelperText>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            label='description'
                            outlineColor='gray'
                            style={styles.input}
                            value={newTask.content}
                            mode='flat'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => { setNewTask({ id: dataLength + 1, title: newTask.title, content: text, newTask: newTask.begin }); hasErrorContent(text);}}
                            maxLength={200}
                            multiline={false}
                            placeholder="Enter description" />
                        <HelperText type='error' visible={isError.errorContent}>description task is empty !</HelperText>
                    </View>

                    <View>
                        <View style={styles.timeView}>
                            <TouchableOpacity style={styles.btnCalendar} onPress={() => setOpen(true)}>
                                <Text style={styles.timeText}>{newTask.begin}</Text>
                                <Icon name='calendar' size={20} />
                            </TouchableOpacity>
                        </View>
                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                const month = Number(date.getMonth()) + 1
                                setDate(date)
                                setNewTask({ id: dataLength + 1, title: newTask.title, content: newTask.content, begin: date.getDate() + '/' +month + '/' + date.getFullYear() })
                                setError({
                                    errorName: isError.errorName,
                                    errorContent: isError.errorName,
                                    errorTime: false,
                                })
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                        <HelperText type='error' visible={isError.errorTime}>description task is empty !</HelperText>
                    </View>
                    <TouchableOpacity style={styles.btnCreate} onPress={() => onPressCreate()}>
                        <Text style={{ color: 'red' }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1,


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
        borderRadius: 30,
        height: 50,
        marginTop: 30

    },
    input: {
        width: 350,
        margin: 12,
        height: 50,
        backgroundColor: null,

    },
    btnCreate: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 30,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    timeView: {
        borderBottomWidth: 1,
        marginTop: 30,
        width: 340,

    },
    timeText: {

        fontSize: 18,
        color: 'blue',
        paddingLeft: 50,
    },
    btnCalendar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
export default CreateTaskScreen;