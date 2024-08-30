import { View, Text,Image,Dimensions,StyleSheet,Alert} from 'react-native'
import React, { useState } from 'react'
import Otpcomponent from '../Componenet/Otpcomponent'
import ip from '../ip'

export default function Forgetotp({ navigation })  {
  return (
    <Otpcomponent  navigation={navigation} handle={"passwordforget"}  
    apiEndpoint={`http://${ip}:8080/forget/verify`}

    />
  )
}