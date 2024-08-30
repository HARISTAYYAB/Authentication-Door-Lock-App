import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert,} from 'react-native'
import React, { useState} from 'react';
import ForgotPassword from '../Componenet/ForgotPassword';
import ip from '../ip';
import { useNavigation } from '@react-navigation/native';


export default function Passwordforget() {
  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate('Userlogin');
  };

  return (
    <View>
      <ForgotPassword onLoginPress={handleLoginPress}
      apiEndpoint={`http://${ip}:8080/forget/password`} 
      />

    </View>
    
  )
}


