import React, { Component } from 'react';
import { View, TextInput, } from 'react-native';

import CustomStyleButton from './components/CustomStyleButton';
import CustomStyleInput from './components/CustomStyleInput';

import CustomFlatList from './components/CustomFlatList';


import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default App;