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
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
function CompleteTask({ navigation, route }) {
  const defaultInitialState = [{ id: 0, title: 'Bạn chưa hoàn thành công việc', content: '-_- ', begin: '', }]
  const [completeData, setCompleteData] = useState();
  const [isRender, setRender] = useState(false);
  async function getStorageValue() {
    try {
      const item = await AsyncStorage.getItem('@completeData');
      const value = item ? JSON.parse(item) : defaultInitialState;
      //console.log('value get',value);
      setCompleteData(value);
    } catch (e) {
      console.log('cant get value complete: ' + e)
    }
  }
  useEffect(() => {
    getStorageValue();

  }, [])


  const deleteIndex = () => {
    if(completeData.length > 2){
      const newData = completeData.filter(item => item.id != 0)
      // setCompleteData(newData)
      console.log('newData:',newData)
    }
  };
  useEffect(() => {
    if(completeData){
      completeData && console.log('completeData', completeData);
      deleteIndex();
      setRender(true);
    }
    
  }, [completeData]);
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