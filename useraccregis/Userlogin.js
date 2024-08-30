import { View, Text, ScrollView, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import Field from '../screens/Fields'
import Button from '../Componenet/Button'
import ip from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Passwordfield from '../screens/Passwordfield'
export default function Userlogin({ navigation }) {
    
    const [username, setuername] = useState("")
    const [password, setpassword] = useState("")
    const [isloading, setisLoading] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
          setuername('')
          setpassword('')
          return () => {};
        }, [])
      );
    const fetchData = async() => {
        try {
            
            if (!username) {
              return Alert.alert('Alert',"please enter UserName")
      
            }
            else if(!password){
                return Alert.alert('Alert',"please enter password")
            }
            else if (!/^[^\s]+(\s[^\s]+)*$/.test(username)) {
                Alert.alert("Alert", "Remove Extra spaces in username");
                return;
              }
            
            else if (/\s/.test(password)) {
                Alert.alert("Alert", "Password should not contain spaces between characters");
                return;
              }
            setisLoading(true)

            
            const { data } = await axios.post(`http://${ip}:8080/normalLogin`,{username, password})
            if (data?.msg == "Password Incorrect") {
                setisLoading(false);
                Alert.alert("Alert","Wrong email or password");
                return
                
              } 
              else {
                await AsyncStorage.setItem('NUser', JSON.stringify(data));
                setisLoading(false);
                navigation.navigate("userdrawer");
                console.log("USER login successful", { username, password});
                Alert.alert("Success","Login success fully")
                setpassword('')
                setuername('')
                return
               }
      
          } catch (error) {
            setisLoading(true)
            if(error.response && error.response.data && error.response.data.msg) {
                console.log(error.response.data.msg);
                Alert.alert("Alert",error.response.data.msg)
               
            }
            setisLoading(false)
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
                            User
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>
                            Login to your account
                        </Text>
                        <Field inputtitle="Enter UserName " value={username} setvalue={(text) =>setuername(text)} />
                        <Passwordfield inputtitle={"Enter Password"} value={password} setvalue={(text) =>setpassword(text)} />
                        {/* <Field inputtitle="Enetr Password" value={password} setvalue={(text) =>setpassword(text)} /> */}
                        <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16 }}>
                            <TouchableOpacity onPress={()=>{navigation.navigate("Checkemail")}}   > 
                            <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>
                                Forgot Password ?
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <Button buttontitle="Login" onPress={fetchData} buttoncolor="#006A42" textcolor='white'loading={isloading}  />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ? </Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("useremailverified") }}>
                                <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}





