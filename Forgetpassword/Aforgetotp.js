import { View, Text } from 'react-native'
import React from 'react'
import Otpcomponent from '../Componenet/Otpcomponent'
import ip from '../ip'
export default function Aforgetotp({ navigation }) {
  return (
    <Otpcomponent  navigation={navigation} handle={"Apassword"}
    apiEndpoint={`http://${ip}:8080/adminForget/verify`}
      />
  )
}