import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { HelperText, Icon, TextInput } from 'react-native-paper';
function Signup({ navigation }) {
  const [userName, setUserName] = useState('');
  const [numberKey, setNumberKey] = useState({ number: '' });
  const [emailKey, setEmailKey] = useState({ email: '' });
  const [isErrorEmail, setErrorEmail] = useState(true);
  const [isSelected, setSelection] = useState(true);
  const [isErrorPhone, setErrorPhone] = useState(true);

  //check phone
  const validationNumber = (value) => {
    if (value.length <= 10 && /^[0-9\b]+$/.test(value)) {
      setNumberKey({ number: value });
      if (value.length == 10) {
        setErrorPhone(false);
        console.log('10')
      }
    }
    else if (value.length > 10) {
      setErrorPhone(true);

    }
    else {
      setErrorPhone(true);
      console.log(value)
    }
  }
  // check email 
  const validationEmail = (value) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false && value.length == null) {

      setEmailKey({ email: value })
      setErrorEmail(true);
    }
    else {
      setEmailKey({ email: value })
      setErrorEmail(false);

    }
  }
  // check null input
  const hasErrors = () => {
    return userName.length < 1;
  };
  const checkSubmit = () => {
    if (isErrorEmail == true) {
      console.log(isErrorEmail);
      Alert.alert('Please check your email  again !');
    }
    else if (isErrorPhone == true) {
      console.log(isErrorPhone + '' + isErrorEmail);
      Alert.alert('Please check your phone  again !');
    }
    else {
      navigation.goBack();
      console.log(isErrorPhone + '' + isErrorEmail);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.signupText}>Create Account</Text>
        <View>
          <TextInput
            style={styles.input}
            value={userName}
            placeholder='Username'
            mode='outlined'
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="account" />}
            onChangeText={(text) => setUserName(text)} />
          <HelperText type='error' visible={hasErrors()}>
            Username is empty !
          </HelperText>
        </View>
        <View>
          <TextInput
            error={isErrorEmail}
            style={styles.input}
            mode='outlined'
            placeholder='Email'
            value={emailKey.email}
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="email" />}
            
            onChangeText={(value) => validationEmail(value)} />
          <HelperText type='error' visible={isErrorEmail} >
            E-mail Address is required!
          </HelperText>
        </View>
        <View>
          <TextInput
            error={isErrorPhone}
            style={styles.input}
            placeholder='Phone'
            mode='outlined'
            value={numberKey.number}
            underlineColorAndroid='transparent'
            left={<TextInput.Icon name="phone" />}
            onChangeText={(value) => validationNumber(value)}
          />
          <HelperText type='error' visible={isErrorPhone} >
            Contact Number should consist of 10 digits only !
          </HelperText>
        </View>


        <TextInput
          style={styles.input}
          mode='outlined'
          placeholder='Password'
          secureTextEntry={isSelected}
          underlineColorAndroid='transparent'
          left={<TextInput.Icon name="lock" />} 
          right={<TextInput.Icon name="eye" onPress={() => setSelection(!isSelected)}/>}/>
        <View style={styles.btnSignup} >
          <TouchableOpacity onPress={checkSubmit} >
            <Text style={{ color: 'white', fontSize: 19 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text style={{ color: 'white', marginTop: 50, marginBottom: 30, fontWeight: 'bold' }}>Or signup with social media account </Text>
        <View style={styles.signupWithSocial}>
          <TouchableOpacity style={{ paddingTop: 10 }}>
            <View style={styles.imgSignupSocial}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/1200px-Facebook_circle_pictogram.svg.png' }}
                style={{
                  height: 30,
                  width: 30,
                  paddingTop: 20
                }}
              />
              <Text style={styles.textInsideButtonSocial}>Continue With Facebook</Text>
            </View>

          </TouchableOpacity>
        </View>
        <View style={styles.signupWithSocial}>
          <TouchableOpacity style={{ paddingTop: 10 }}>
            <View style={styles.imgSignupSocial}>
              <Image source={{ uri: 'https://www.vhv.rs/dpng/d/551-5511916_2019-pro-exp-media-inc-circle-twitter-logo.png' }}
                style={{
                  height: 30,
                  width: 30,
                  paddingTop: 20
                }} />
              <Text style={styles.textInsideButtonSocial}>Continue With Google</Text>
            </View>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,

  },
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 260
  },
  signupText: {
    fontSize: 25,
    fontFamily: 'bold',
    color: 'black'
  },

  input: {
    width: 350,
    height: 40,
    backgroundColor: null
  },
  btnSignup: {
    margin: 20,
    backgroundColor: '#FF3D00',
    width: 150,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupWithSocial: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 10,

  },
  imgSignupSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10
  },
  textInsideButtonSocial: {
    color: 'black',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 10
  }
})
export default Signup;