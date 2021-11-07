import React, { Component } from 'react';
import { View, TextInput, } from 'react-native';

import CustomStyleButton from './components/CustomStyleButton';
import CustomStyleInput from './components/CustomStyleInput';

import CustomFlatList from './components/CustomFlatList';


import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import CreateTaskScreen from './components/CreateTaskScreen';
import DetailsScreen from './components/DetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}} />
                <Stack.Screen name="CreateTask" component={CreateTaskScreen} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default App;