import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert,} from 'react-native'
import React, { useState} from 'react';
import Field from '../screens/Fields';
import Button from '../Componenet/Button';
import Passwordfield from '../screens/Passwordfield';
import axios from 'axios';
import ip from '../ip';


const ForgotPassword = ({ onLoginPress,apiEndpoint }) => {
    const [password, setpassword] = useState('');
    const [confrmpassword, setconfrmpassword] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [confrmpasswordError, setconfrmpasswordError] = useState('');
    const [isloading, setisLoading] = useState(false);
  
    const register = async() => {
  
      try {
        if (!password) {
          setpasswordError('Enter the password');
          return;
        } else if (password.length < 6) {
          setpasswordError('Password should be at least 6 characters');
          return;
        } else {
          setpasswordError('');
        }
  
        if (!confrmpassword) {
          setconfrmpasswordError('Enter the confirm password');
          return;
        } else if (confrmpassword !== password) {
          Alert.alert("Alert",'Passwords do not match');
          return;
        } else {
          setconfrmpasswordError('');
        }
  
        
  
        // Place your API call here
  
        setisLoading(true)
        const{data}= await axios.put(apiEndpoint,{password})
        // const{data}= await axios.put(`http://${ip}:8080/forget/password`,{password})
        Alert.alert("Alert","Password has been Successfully changed")  
        console.log("ubdate",)
       
      setisLoading(false)
       setconfrmpassword("")
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
          Change Password
        
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
        
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
            
            <Passwordfield inputtitle={"Password"}  value={password} setvalue={(text) => {
              setpassword(text);
              setpasswordError('');
            }}/>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <Passwordfield inputtitle={"Confirm Password"}  value={confrmpassword} setvalue={(text) => {
              setconfrmpassword(text);
              setconfrmpasswordError('');
            }}/>
            {confrmpasswordError ? <Text style={styles.errorText}>{confrmpasswordError}</Text> : null}

        <Button buttontitle="Ubdate" onPress={register} buttoncolor='#006A42' textcolor="white" loading={isloading}  />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Log in here {' '}
            </Text>
            <TouchableOpacity
              onPress={onLoginPress}>
              <Text
                style={{ color: "#006A42", fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
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

export default ForgotPassword






