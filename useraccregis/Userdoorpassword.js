import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import ip from '../ip';


const screenWidth = Dimensions.get('window').width;
export default function Userdoorpassword({navigation}) {

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
const [f1, setf1] = useState('')
const [f2, setf2] = useState('')
const [f3, setf3] = useState('')
const [f4, setf4] = useState('')
    const handleSuccess = () => {
      
      };


      const ans=async ()=>{
    
        try {
          if(!f1 || !f2|| !f3|| !f4){
            Alert.alert("please enter all fields")
            return 
    
          }
          let abf =f1+f2+f3+f4
          var pincode = abf
          console.log(pincode)
          
          const{data}= await axios.put(`http://${ip}:8080/mailVerify/pincode`,{pincode})
         
          ToastAndroid.showWithGravity(
            'Successfully',
            ToastAndroid.SHORT
            ,
            ToastAndroid.BOTTOM
          );
          navigation.navigate("Userlogin");
        
          }
          
       catch (error) {
          Alert.alert(error.data)
          console.log(error)
          
        }
    
          
    
      }
    const clearInputs = () => {
        setf1('');
        setf2('');
        setf3('');
        setf4('');
        // Optionally, you can also focus on the first input field after clearing
        firstInput.current.blur();
        secondInput.current.blur();
        thirdInput.current.blur();
        fourthInput.current.blur();
      };
      useFocusEffect(
        React.useCallback(() => {
          clearInputs();
          return () => {};
        }, [])
      );
    
      return (
    
        // <Doorpassword
        // navigation={navigation}
        // onSuccess={handleSuccess}
        // apiendpint={`http://${ip}:8080/mailVerify/pincode`}
        //  />
        <View style={styles.container}>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}
        translucent
      /> */}
      <View style={styles.headerContainer}>
        <Image source={require("../Asset/lock.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Enter 4-digit code</Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            value={f1}
            keyboardType="number-pad"
            maxLength={1}
            
            ref={firstInput}
            onChangeText={(text) => {
                setf1(text)
                if(text.length >=1){
                    secondInput.current.focus()
                }
            
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            value={f2}
            ref={secondInput}
            onChangeText={(text) => {
                setf2(text)
                if(text.length >=1){
                    thirdInput.current.focus()
                }
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            value={f3}
            ref={thirdInput}
            onChangeText={(text) => {
                setf3(text)
                if(text.length >=1){
                    fourthInput.current.focus()
                }
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            value={f4}
            ref={fourthInput}
            onChangeText={(text) => {
                setf4(text)
                if(text.length >=1){
                    fourthInput.current.focus()
                }
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.verifyButton,{backgroundColor: f1 && f2 && f3 && f4 ? '#0A8791' : '#808080' }]}
        disabled={!(f1 && f2 && f3 && f4)}
        onPress={()=>{
            ans();
            clearInputs();
        }
        }>
        <Text style={styles.verifyButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
      )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006A42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  logo: {
    width: screenWidth * 0.4, // Adjust the percentage as needed
    height: screenWidth * 0.4, // Adjust the percentage as needed
    justifyContent:'center'
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 20,
    marginBottom: 10,
    color:'white',
    fontWeight:'bold'

  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    alignItems: 'center',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: '#0A8791',
    borderWidth: 2,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  otpText: {
    fontSize: 25,
    color: '#0E122B',
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontWeight:'bold'
  },
  verifyButton: {
    backgroundColor: '#0A8791',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 200,
  },
  verifyButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});