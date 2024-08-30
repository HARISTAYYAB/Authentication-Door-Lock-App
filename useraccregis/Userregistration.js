import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert,} from 'react-native'
import React, { useState} from 'react';
import Field from '../screens/Fields';
import Button from '../Componenet/Button';
import Passwordfield from '../screens/Passwordfield';
import axios from 'axios';
import ip from '../ip';



export default function Userregistration({navigation})  {
  
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [isloading, setisLoading] = useState(false);
 
      const register = async() => {

        try {
          if (!username) {
            setNameError('Enter the username');
            return;
          } else if (!/^[^\s]+(\s[^\s]+)*$/.test(username)) {
            setNameError('Remove Extra spaces in username');
            return;
          } else {
            setNameError('');
          }
        
          if (!password) {
            setpasswordError('Enter the password');
            return;
          } else if (/\s/.test(password)) {
            setpasswordError('Password cannot contain spaces');
            return;
          } else if (password.length < 6) {
            setpasswordError('Password should be at least 6 characters');
            return;
          } else {
            setpasswordError('');
          }
          setisLoading(true)
          const{data}= await axios.put(`http://${ip}:8080/mailVerify/verify`,{username,password})
          Alert.alert("Success","User has been Successfully Registered")  
          navigation.navigate("Userdoorpasword")
          setisLoading(false)
          setusername("")
          setpassword("")
          
          }
          
       catch (error) {
          Alert.alert(error.data)
          console.log(error)
          
        }
    

      };
  
       

  return (
    <ScrollView>
    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#006A42' }}>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register 
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          User create account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            borderTopRightRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
            <Field inputtitle="Username" value={username} setvalue={(text)=>{
              setusername(text)
              setNameError('')
            }} />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
           <Passwordfield inputtitle={"Password"} value={password} setvalue={(text)=>{
            setpassword(text)
            setpasswordError('')
          } } />
           {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <Button buttontitle="Register" onPress={register} buttoncolor='#006A42' textcolor="white" loading={isloading}  />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
           
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  errorText: {
    fontWeight:'bold',
    color: 'red',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: '12%',
  },
})