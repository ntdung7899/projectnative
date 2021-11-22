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
  LogBox,
  Button,
} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
function CompleteTask({ navigation, route }) {
  const defaultInitialState = { id: 1, title: 'Bạn chưa hoàn thành công việc', content: '-_- ', begin: '', }
  const [completeData, setCompleteData] = useState();
  const [isRender, setRender] = useState(false);

  async function getStorageCompleteValue() {
    try {
      const item = await AsyncStorage.getItem('@completeData');
      const value = item ? JSON.parse(item) : defaultInitialState;
      //console.log('value get',value);
      setCompleteData(value);
      setRender(true);
    } catch (e) {
      console.log('cant get value complete: ' + e)
    }
  }
  const setStorageCompleteValue = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@completeData', jsonValue)
        console.log('save complete data', jsonValue)
    } catch (e) {
        // save error
        console.log('cant save value: ' + e)
    }
}

  useEffect(() => {
    getStorageCompleteValue();
    setRender(true)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getStorageCompleteValue()
    }, [])
  );

  useEffect(() => {
    if (completeData) {
      completeData && console.log('completeData', completeData);
      setStorageCompleteValue(completeData);
      setRender(true);
    }
  }, [completeData]);
  const onPressBackItem = (value) => {
    const newData = completeData.filter(item => item.id !== value.id)
    
    setStorageValue(value);
    removeItem();
    setCompleteData(newData);
    setRender(true);
  }
  const removeItem = async () => {
    await AsyncStorage.removeItem('@completeData')
  }
  const setStorageValue = async (value) => {
    try {
      const getData = await AsyncStorage.getItem('@data')
      const convertData = JSON.parse(getData)
      convertData.push(value)
      await AsyncStorage.setItem('@data', JSON.stringify(convertData))
      console.log('save success')
    } catch (e) {
        console.log('cant merge value: ' + e)
    }
}

  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={{
        marginTop: 10,
        padding: 10,
        borderColor: 'white',
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: index % 2 == 0 ? 'rgb(245, 213, 207)' : 'rgb(207, 236, 255)',
        width: '95%',
        height: 200
      }}>
        <View style={styles.leftItem}>
          <TouchableOpacity>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingTop: 20 }}>{item.title}</Text>
            <Text style={{ color: 'black', paddingTop: 20, }}>{item.content}</Text>
            <View style={{ marginTop: 10, flex: 1, paddingTop: 30 }}>
              <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                <Text style={styles.timeText}><Icon name="calendar-times-o" /> {item.begin}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => onPressBackItem(item)}>
            <Image source={{ uri: 'https://w7.pngwing.com/pngs/1004/921/png-transparent-bachengzhen-%E5%A4%A7%E4%BC%97%E5%88%9B%E4%B8%9A%E3%80%81%E4%B8%87%E4%BC%97%E5%88%9B%E6%96%B0-innovation-entrepreneur-back-icon-angle-entrepreneurship-symbol.png' }}
              style={{
                height: 30,
                width: 30,
                paddingTop: 20,
                backgroundColor: 'rgba(0,0,0,0.45)',
              }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>


  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerContent}>
        <FlatList
          data={completeData}
          renderItem={(item, index) => renderItem(item, index)}
          keyExtractor={item => item.id}
          extraData={isRender}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
  },
  leftItem: {
    flexDirection: 'column'
  },
  timeText: {
    color: 'black',
    borderWidth: 1,
    width: 120,
    height: 30,
    borderColor: 'blue',
    paddingLeft: 12,
    borderRadius: 20,
    paddingTop: 5,
    paddingLeft: 20,
  },
})
export default CompleteTask;