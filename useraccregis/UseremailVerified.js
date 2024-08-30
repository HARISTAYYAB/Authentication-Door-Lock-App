import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet ,Alert,Image,Dimensions,ActivityIndicator} from 'react-native';
import Field from '../screens/Fields';
import Button from '../Componenet/Button';
import axios from 'axios';
import ip from '../ip';
const screenWidth = Dimensions.get('window').width;

export default function UseremailVerified({navigation}) {
  const [email, setEmail] = useState();
  const [isloading, setisLoading] = useState(false);

  const fetchData = async () => {
    if(!email){
      Alert.alert("please enter email")
      return 

    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Alert", "Enter a valid email");
      
      return;
    } 
    else if (/\s/.test(email)) {
      Alert.alert("Alert", "Email should not contain spaces between characters");

      return;
    }
    try {
      
      
      setisLoading(true)
      const{data}= await axios.post(`http://${ip}:8080/mailVerify`,{email})
      if(data.msg =="Wrong email"){
      Alert.alert(data.msg)
      setisLoading(false)
      return
      }
      else if(data.msg =="Account already created"){
        Alert.alert("Alert","Account already created")
        setisLoading(false)
        return
        }
      else{
      navigation.navigate("Userotp")
      Alert.alert('Alert',"otp send on your email")
      setisLoading(false)
      setEmail("")
      }
      
    } catch (error) {
      Alert.alert("connection problem")
      setisLoading(false)
      console.log(error)
      
    }


  };

  return (
    <View style={{ backgroundColor: '#006A42', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image source={require("../Asset/check.png")} style={styles.logo} />
      </View>

      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, margin: 20, textAlign: 'center' }}>Create a New Account</Text>
      <Field inputtitle="Enter your Email" value={email} setvalue={(text)=>setEmail(text)} />
        <Button buttontitle="Next" onPress={fetchData} buttoncolor='white' textcolor="#006A42" loading={isloading}  />
        
         
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: screenWidth * 0.4, 
    height: screenWidth * 0.4,
    justifyContent:'center'
  },
})
