import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Span, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CustomStyleButton(props) {
    const { defaultB, variant, disabled, disableShadow, startIcon, endIcon, size, color } = props

    const btnDefault = 'btnDefault';
    
    const btnDisable = props.disabled !== null ? true : false;
    const btnDisableShadow = props.disableShadow != null ? ('btnDisableShadow') : '';
    const btnStartIcon = props.startIcon !== null ? true : false;
    const btnEndIcon = props.endIcon !== '' ? 'btnEndIcon' : '';
    const btnSize = props.size !== null ? props.size : 17;
    const btnColor = props.color!== '' ?   props.color : 'black';
    const checkStartOrEndIcon = () => {
        if (btnStartIcon) {
            return <Text style = {styles.materialText} >Button</Text>
        }
        if (btnEndIcon) {
            return <Text style = {styles.materialText}>Button</Text>

        }
    }
    const styles = StyleSheet.create({
        materialText: {
            color: "black",
            fontSize: 17,
            justifyContent: "center",
            textAlign: "center",
        },
        button: {
            width: btnSize ? btnSize : 200,
            marginTop: 20,
            
            padding: 15,
            borderRadius: 5,
            borderColor: btnColor ? btnColor : 'black',
            borderWidth: 2
    
        },
        centered: {
            marginTop: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }
    
    
    });
    return (
        <View >
            <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('abc')}
                disabled = {props.disabled}
            >
                {
                    checkStartOrEndIcon()
                }
            </TouchableOpacity>
        </View>

    );
    
}



export default CustomStyleButton;