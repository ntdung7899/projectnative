import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';

function CustomFlatlist() {
    const dataItem = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];
    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ opacity}}>
          <Text >{item.title}</Text>
        </TouchableOpacity>
      );
    const renderItem = ({item}) => {
        return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
              
            />
          );
    }
    
    return (
        <View>
            <FlatList data={dataItem}   
                renderItem = {renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            >  

            </FlatList>

        </View>

    );
}

export default CustomFlatlist