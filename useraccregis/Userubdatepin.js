// import { View, Text } from 'react-native'
// import React from 'react'
// import { Image } from 'react-native'
// import CompDoorpass from '../Componenet/CompDoorpass'

// export default function Userubdatepin({navigation}) {
//   const token = await AsyncStorage.getItem('NUser');
//   const tokenObject = JSON.parse(token);
//     const handleSuccess = () => {
//         navigation.navigate('Usermainpage');
//       };
//   return (
//     <CompDoorpass 
//     navigation={navigation}
//       imageSource={require('../Asset/lock.png')}
//       buttonText="Next"
//       onSuccess={handleSuccess}
  

//     />
//   )
// }
import React, { useEffect, useState } from 'react';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompDoorpass from '../Componenet/CompDoorpass';
import ip from '../ip';
export default function Userubdatepin({ navigation }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {

      
    try {
      const storedToken = await AsyncStorage.getItem('NUser');
  const parsedToken = JSON.parse(storedToken);
const token = parsedToken.token;
setToken(token);
console.log('Token:', token);
} catch (error) {
  console.error('Error parsing token:', error);
  // Handle parsing error


      } 
    };

    fetchToken();
  }, []);

  const handleSuccess = () => {
    navigation.navigate('Usermainpage');
  };

  return (
    <CompDoorpass
      navigation={navigation}
      imageSource={require('../Asset/lock.png')}
      buttonText="Ubdate"
      onSuccess={handleSuccess}
      userToken={token} 
      apiEndpoint={`http://${ip}:8080/updatePin`}// Pass the token as a prop to CompDoorpass
    />
  );
}
