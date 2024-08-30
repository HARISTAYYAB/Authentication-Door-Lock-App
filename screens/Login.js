import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../ip';
import Passwordfield from './Passwordfield';


export default function Login({ navigation }) {





  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email) {
        return Alert.alert('Alert', "please Enter Email")

      }
      else if(!password){
        return Alert.alert('Alert', "please Enter passowrd")

      }
      else if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert('Alert', 'Enter a valid email');
        return;
      }

      else if (/\s/.test(email)) {
        Alert.alert("Alert", "Email should not contain spaces between characters");
        return;
      }
      else if (/\s/.test(password)) {
        Alert.alert("Alert", "Password should not contain spaces between characters");
        return;
      }
      else {

        setIsLoading(true);
        const { data } = await axios.post(`http://${ip}:8080/login`, { email, password })
       
        setIsLoading(false)

      
      
        await AsyncStorage.setItem('user', JSON.stringify(data))
        navigation.navigate("open",)
        console.log("login success fully", { email, password })
       
        setEmail('')
        setPassword('')
       
      
        
      }
    } catch (error) {
      setIsLoading(true)
      if (error.response && error.response.data && error.response.data.msg) {
        Alert.alert("Alert", error.response.data.msg)
        setEmail('')
        setPassword('')
        setIsLoading(false)
      }
    }
  }



  return (
    <ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#006A42' }}>

        <View style={{ alignItems: 'center', width: 460 }}>
          <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginVertical: 20 }}>
            Login
          </Text>
          <View style={{ backgroundColor: 'white', height: 700, width: 460, borderTopRightRadius: 130, borderTopLeftRadius: 130, paddingTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 40, color: '#006A42', fontWeight: 'bold', paddingTop: 29 }}>
              Admin
            </Text>
            <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>
              Login to your account
            </Text>
            <TextInput
              placeholder="Enter Email"
              style={{ borderRadius: 100, color: '#006A42', paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10 }}
              placeholderTextColor={'#006A42'}
              value={email}
              
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <Passwordfield inputtitle={"Enter Password"} value={password} setvalue={(text) => setPassword(text)} />
            <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16 }}>
              <TouchableOpacity onPress={() => { navigation.navigate("Acheckemail") }}>
                <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.loginButton]}
            >
              {isLoading ? (
                <ActivityIndicator size='large' color="white" />
              ) : (
                <Text style={styles.buttonText}>
                  Login
                </Text>

              )}
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ? </Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
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
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '78%',

    backgroundColor: 'rgb(220,220, 220)',
    marginVertical: 10,
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  passwordVisibilityIcon: {
    marginLeft: 12

  },
});
