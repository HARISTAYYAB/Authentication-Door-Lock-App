import { View, Text } from 'react-native'
import React from 'react'
import Doorpassword from '../Doorpassword'
import ip from '../../ip';
export default function Admindoorpassword({ navigation }) {
  const handleSuccess = () => {
    navigation.navigate('login');
  };
  return (

    <Doorpassword
    navigation={navigation}
    onSuccess={handleSuccess}
    apiendpint={`http://${ip}:8080/register/pincode`}
     />
  )
}