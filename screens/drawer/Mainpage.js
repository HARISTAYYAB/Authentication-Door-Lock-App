
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet,BackHandler} from 'react-native'
import React, { useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../../ip';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const Mainpage = ({ navigation }) => {
  // useEffect(() => {
  //   AsyncStorage.getItem("user")
  //     .then(data => {
  //       console.log("Async userdata: ", data);
  //     })
  //     .catch(err => Alert.alert(err));
  // }, []);
const getapi=async()=>{
  const { data } = await axios.get(`http://${ip}:8080/admin/openlock`,)
   if (data?.msg === 'Door Opened') {
    Alert.alert('Success', 'Door is Unlocked.');
} else {
    Alert.alert('Unknown Response', 'Received an unknown response from the server.');
}
}
const isFocused = useIsFocused();
useEffect(() => {
  
  const backAction = () => {
      if (isFocused) {
          Alert.alert(
              'Confirmation',
              'Do you want to navigate to the home screen?',
              [
                  { text: 'Cancel', onPress: () => null, style: 'cancel' },
                  { text: 'OK', onPress: () => navigation.navigate('home') }
              ],
              { cancelable: false }
          );
          return true; // Prevent default behavior
      }
      return false; // Allow default behavior for other screens
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  return () => backHandler.remove(); 
}, [navigation, isFocused]);
  return (
    <View style={styles.maincontainer}>
      <View style={styles.rowcontainer}>
        
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
            style={styles.iconContainer}
          >
            <Icon name="menu" size={35} color="white" />
          </TouchableOpacity>
        
          <TouchableOpacity
           onPress={() => {
            Alert.alert(
                'Confirmation',
                'Do you want to navigate to the home screen?',
                [
                    { text: 'Cancel', onPress: () => null, style: 'cancel' },
                    { text: 'OK', onPress: () => navigation.navigate('home') }
                ],
                { cancelable: false }
            );
        }}

          >
            <Icon name="logout" size={35} color="white" />
          </TouchableOpacity>
        
      </View>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><TouchableOpacity onPress={getapi} >
        <Image source={require("../../Asset/lock.png")} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#006A42'
  },
  rowcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 20,
    // paddingTop:50,
  },
  iconContainer: {
    marginRight: 15, // Adjust the margin as needed
  },
  rightIconContainer: {
    marginLeft: 'auto', // This will push the icon to the right
  },
  logo: {
    width:120, // Adjust the percentage as needed
    height:120, // Adjust the percentage as needed
    justifyContent:'center'
  },
});

export default Mainpage;
