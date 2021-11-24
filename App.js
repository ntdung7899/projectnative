import React, { Component, useState, useEffect } from 'react';
import { View, TextInput, LogBox } from 'react-native';

import CustomStyleButton from './components/CustomStyleButton';
import CustomStyleInput from './components/CustomStyleInput';

import CustomFlatList from './components/CustomFlatList';


import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import CreateTaskScreen from './components/CreateTaskScreen';
import DetailsScreen from './components/DetailsScreen';
import CompleteScreen from './components/CompleteTask';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationContext from './components/NotificationContext';

import { useFocusEffect } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const App = ({ navigation, route }) => {
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
    
    const [data, setData] = useState()
    async function getStorageValue() {
        try {
            const item = await AsyncStorage.getItem('@data');
            const value = item ? JSON.parse(item) : DATA;
            //console.log(value);
            value.sort((a,b) => a.id - b.id);
            setData(value);
        } catch (e) {
            console.log('cant get value in app.js: ' + e)
        }
    }
    
    useEffect(() => {
        getStorageValue();
        
    }, [])
    
    useEffect(() => {
         if(data){
            data && console.log('dataInAppJs', data);
         }
        
    }, [data]);
    
    return (
        <NotificationContext.Provider value={data}>
                <Tab.Navigator screenOptions={screenOptions}>
                    <Tab.Screen name='Home' color='red' component={HomeScreen} initialParams={{ dataItem: data }} />
                    <Tab.Screen name='CreateTask' color='red' component={CreateTaskScreen} initialParams={{ data: data }} />               
                    <Tab.Screen name='Complete' color='red' component={CompleteScreen}/>
                </Tab.Navigator>
        </NotificationContext.Provider>


    );
}
const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
        const icons = {
            Home: 'home',
            CreateTask: 'plus',
            Details: 'details',
            Complete: 'content-save'

        };

        return (
            <MaterialCommunityIcons
                name={icons[route.name]}
                color={color}
                size={size}
            />
        );
    },
    headerShown: false,
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',


})

export default App;