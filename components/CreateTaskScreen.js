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
function CreateTaskScreen({ route, navigation }) {
    const [newTask, setNewTask] = useState({
        id: 0,
        title: '',
        content: '',
        begin: '',
    });

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dataLength, setDataLength] = useState()
    const [isError, setError] = useState({
        errorName: false,
        errorContent: false,
        errorTime: true,
    })
    useEffect(() => {
        const DATA = route.params.data;
        setDataLength(DATA)
    }, []);
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
    const hasErrorTime = (value) => {

        return value.length < 1;
    };
    const onPressCreate = () => {

        if (isError.errorTime == true) {
            setError({ errorName: isError.errorName, errorContent: isError.errorContent, errorTime: false })
        }
        else {
            navigation.navigate('Home', { data: newTask })
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
                            onChangeText={(text) => { setNewTask({ id: dataLength + 1, title: newTask.title, content: text, newTask: newTask.begin }); hasErrorContent(text); console.log(isError) }}
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
                                setDate(date)
                                setNewTask({ id: dataLength + 1, title: newTask.title, content: newTask.content, begin: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() })
                                console.log(date)
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