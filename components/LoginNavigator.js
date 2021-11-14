import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert,
    ImageBackground,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { HelperText, Icon, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import AppScreen from '../App'
const Stack = createNativeStackNavigator();
const LoginNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
                <Stack.Screen name="App" component={AppScreen}options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}
export default LoginNavigator;