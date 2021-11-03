import React, { useState, useEffect } from 'react';
import { View,  StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
function CustomStyleInput(props) {
    const { error, helperText, disabled, startIcon, endIcon, value, size, mult } = props

    props.error = props.error != null ? 'red' : 'blue';

    const styles = StyleSheet.create({
        input: {
            flex: 1,
            width: 150,
            margin: 12,
            borderWidth: 1,
            borderColor: props.error,
            borderRadius: 10
        },
        container: {
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        searchIcon: {
            padding: 10,
        },
    })
   
    return (
        <View >
            <View style = {styles.container}>
                <TextInput
                    label="password"
                    style={styles.input}
                    onChangeText={() => console.log('abc')}
                    editable={props.disabled ? props.disabled : false}
                    placeholder="placeholder"
                    keyboardType="numeric"
                    right = {props.endIcon ? <TextInput.Icon name="eye" /> : null}
                    left = {props.startIcon ? <TextInput.Icon name="eye" /> : null}
                    numberOfLines = {5}
                    multiline= {props.mult != null ? props.mult : false}

                />
            </View>

            <View>
                <HelperText type="error">
                    Email address is invalid!
                </HelperText>
            </View>
        </View>




    );
}
export default CustomStyleInput