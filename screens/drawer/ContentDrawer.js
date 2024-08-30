import { View, Text, Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ContentDrawer(props) {
const [name, setName] = useState('');
useEffect(() => {

}, []);

  return (

    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#006A42", height: 250, }}>
       <View style={{marginTop:85}}>
       
          <Image style={{ height: 100, width: 100,margin:10}} source={require('../../Asset/opendoor.png')} />
         
          </View>
        
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  )
}