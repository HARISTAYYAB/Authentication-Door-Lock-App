import { View, Text } from 'react-native'
import React from 'react'
import Componentmailchk from '../Componenet/Componentmailchk'
import ip from '../ip'
export default function Acheckemail({ navigation }) {
  return (
    <Componentmailchk navigation={navigation} handle={"Aforgetotp"}
    apiEndpoint={`http://${ip}:8080/adminForget`}
     />
  )
}