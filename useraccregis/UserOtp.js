import { View, Text,Image,Dimensions,StyleSheet,Alert} from 'react-native'
import React, { useState } from 'react'
import Button from '../Componenet/Button'
import Field from '../screens/Fields'
import ip from '../ip'
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;

export default function UserOtp({ navigation }) {
  const [id,setid] = useState("")
  const [isloading, setisLoading] = useState(false);
  const  check= async () => {
    try {
      if(!id){
        Alert.alert("please enter otp code")
        return 

      }
      setisLoading(true)
      const{data}= await axios.post(`http://${ip}:8080/mailVerify/verify`,{id})
      console.log(data)
      if(data.msg == "Wrong otp code"){
      Alert.alert(data.msg)
      setisLoading(false)
      return
      }
      else if(data.msg==true){
      setisLoading(false)
      navigation.navigate("Userregistration")
      setid("")


      }
      
    } catch (error) {
      Alert.alert("connection problem")
      console.log(error)
      setisLoading(false)
      
    }


  };
  
    
  return (
    <View style={{ backgroundColor: '#006A42', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image source={require("../Asset/check.png")} style={styles.logo} />
      </View>

      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, margin: 20, textAlign: 'center' }}>A Verifiation code has been send to your email</Text>
      <Field inputtitle="Enter 6-Digit Code here" value={id} setvalue={(text) => setid(text)} />
      <Button buttontitle="Verify" onPress={check} buttoncolor='white' textcolor="#006A42" loading={isloading} />
    </View>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: screenWidth * 0.4, // Adjust the percentage as needed
    height: screenWidth * 0.4, // Adjust the percentage as needed
    justifyContent:'center'
  },
})