import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert,ActivityIndicator } from 'react-native'
import React, { useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Authcontext } from './Contexapi/authcontex';
import ip from '../ip';
import Passwordfield from './Passwordfield';





export default function Signup() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [abc,setabc]=useState()
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
    
    
  const  fetchData = async () => {
    try {
      if (!name) {
        setNameError('Enter the name');
        return;
      } else {
        setNameError('');
      }
  
      if (!email) {
        setEmailError('Enter the email');
        return;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Enter a valid email');
        return;
      } else {
        setEmailError('');
      }
  
      if (!phone) {
        setPhoneError('Enter the contact');
        return;
      } else if (!/^\d+$/.test(phone)) {
        setPhoneError('Contact should contain only digits (0-9)');
        return;
      } else if (phone.length !== 11) {
        setPhoneError('Contact number should be 11 characters');
        return;
      } else {
        setPhoneError('');
      }
  
      if (!password) {
        setpasswordError('Enter the password');
        return;
      } else if (password.length < 6) {
        setpasswordError('Password should be at least 6 characters');
        return;
      } else {
        setpasswordError('');
      }
  
      setIsLoading(true);
  
      const { data } = await axios.post(`http://${ip}:8080/register`, {
        name,
        email,
        contact: `${phone}`,
        password,
      });
  
      Alert.alert(data.msg);
      setIsLoading(false);
      console.log('Registered successfully', { name, email, phone, password });
      Alert.alert('Alert', 'Successfully Registered');
      navigation.navigate("Admindoorpassword")
      setName('');
      setphone('');
      setEmail('');
      setphone('');
      setPassword('');
    } catch (error) {
      setIsLoading(true)
      if(error.response && error.response.data && error.response.data.msg) {
        Alert.alert("Alert",error.response.data.msg)
        setIsLoading(false)
       // This should print your message
    }
    console.log(error.msg)
    }
  };
  
       // Call the fetchData function

  const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#006A42' }}>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginTop: 20 }}>
          Register
        </Text>
        <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>
          Create a new account
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
          <TextInput
           style={[
            styles.input,
          ]}
            placeholder="Enter Name"
            placeholderTextColor={'#006A42'}
            value={name}
            autoCapitalize="none" 
            onChangeText={(text) => {
              setName(text);
              setNameError('');
            }}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <TextInput
            style={[
              styles.input,
              
            ]}
            placeholder="Enter Email"
            placeholderTextColor={'#006A42'}
            value={email}
            autoCapitalize="none" 
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={[
              styles.input,
              
            ]}
            placeholder="Enter Contact Number"
            placeholderTextColor={'#006A42'}
            keyboardType="number-pad"
            value={phone}
            autoCapitalize="none" 
            onChangeText={(text) => {
              setphone(text);
              setPhoneError('');
            }}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

          <Passwordfield inputtitle={"Enter Password"} value={password} setvalue={(text)=>{
            setPassword(text)
            setpasswordError('')
          }} />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}




        

          <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: '#006A42' }]}
              onPress={() => {
                fetchData();
              }}>
              {isLoading ? ( 
                <ActivityIndicator size='large' color="white" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account ?{' '}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    borderRadius: 100,
    alignItems: 'center',
    width: 250,
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: '#006A42'
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: 'bold',
  },
  errorText: {
    fontWeight:'bold',
    color: 'red',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: '12%',
  },
  input: {
    borderRadius: 100,
    color: '#006A42',
    paddingHorizontal: 10,
    width: '78%',
    backgroundColor: 'rgb(220,220, 220)',
    marginVertical: 10,
  },
});
