import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet ,Alert,Image,Dimensions,ActivityIndicator} from 'react-native';
import Field from '../screens/Fields';
import Button from '../Componenet/Button';
import axios from 'axios';
import ip from '../ip';
const screenWidth = Dimensions.get('window').width;

const Componentmailchk = ({ navigation,handle,apiEndpoint}) => {
    const [email, setemail] = useState('');
    const [isloading, setisLoading] = useState(false);
    
    const fetchData = async () => {
      if (!email) {
        Alert.alert("Alert", "Please enter email");
        return;
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
       
        setisLoading(true);
    
        const { data } = await axios.post(apiEndpoint, { email });
    
        if (data.msg === "Wrong email") {
          setisLoading(false)
          setemail("")
          
          Alert.alert("Alert","Wrong Email");
          return
          
        }
        else if (data.msg === "Account not created") {
          
          
          Alert.alert("Alert","Account not created");
          setisLoading(false)
          setemail("")
          return
          
        }  
        else {
          
          navigation.navigate(handle);
          Alert.alert("OTP sent to your email");
          setemail('');
      
        }    
       
       } 
      catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again.");
        console.error(error);
      }
       finally {
        setisLoading(false);
      }
    };
    
  return (
    <View style={{ backgroundColor: '#006A42', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View>
      <Image source={require("../Asset/message.png")} style={styles.logo} />
    </View>

    {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, margin: 20, textAlign: 'center' }}>Create a New Account</Text> */}
    <Field inputtitle="Enter your Email" value={email} setvalue={(text)=>setemail(text)} 

     />
      <Button buttontitle="Next" onPress={fetchData} buttoncolor='white' textcolor="#006A42" loading={isloading}  />
      
       
  </View>
  )
}

export default Componentmailchk
 

const styles = StyleSheet.create({
  logo: {
    width: screenWidth * 0.4, 
    height: screenWidth * 0.4,
    justifyContent:'center',
    margin:20
  },
})
