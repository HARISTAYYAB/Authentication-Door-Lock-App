import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet ,Alert,Image,Dimensions,ActivityIndicator} from 'react-native';
import Componentmailchk from '../Componenet/Componentmailchk';
import ip from '../ip';
export default function Checkemail({navigation}) {
   
  return (
   
    <Componentmailchk navigation={navigation} handle={"forgetotp"} 
    apiEndpoint={`http://${ip}:8080/forget`}
    />


   
  )  
}


