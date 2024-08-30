import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import ForgotPassword from '../Componenet/ForgotPassword'
export default function Apasswordforget() {
    const navigation = useNavigation();
    const handleLoginPress = () => {
      navigation.navigate('login');
    };
  
  return (
    <View>
     <ForgotPassword onLoginPress={handleLoginPress}
     apiEndpoint={`http://${ip}:8080/adminForget/password`}
      />
    </View>
  )
}