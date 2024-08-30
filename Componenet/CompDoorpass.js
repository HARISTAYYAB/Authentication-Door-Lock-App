import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;


const CompDoorpass = ({ navigation, route, imageSource, buttonText, onSuccess,apiEndpoint, userToken }) => {

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
 
  
  const ans = async () => {
    try {
      if (!f1 || !f2 || !f3 || !f4) {
        Alert.alert('Please enter all fields');
        return;
      }

      let abf = f1 + f2 + f3 + f4;
      // var pincode = abf;
      // const { data } = await axios.put(`http://${ip}:8080/mailVerify/pincode`, { pincode });
      // const { data } = await axios.put(apiEndpoint, { pincode: abf });



      const { data } = await axios.post(apiEndpoint, { pincode: abf }, {
        headers: { 'x-auth-token': userToken }, // Include userToken in the headers
      });



      ToastAndroid.showWithGravity(
        'Successfully Pin Ubdate',
        ToastAndroid.SHORT
        ,
        ToastAndroid.BOTTOM
      );
      
      onSuccess(); // Call the onSuccess callback function passed as prop
    } catch (error) {
      Alert.alert(error.data);
      console.log(error);
      // console.log(userToken)
      // console.log(pincode)
    }
  };

  const clearInputs = () => {
    setF1('');
    setF2('');
    setF3('');
    setF4('');
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
      <View style={styles.container}>
        
        <View style={styles.headerContainer}>
          <Image source={imageSource} style={styles.logo} />
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
                setF1(text);
                if (text.length >= 1) {
                  secondInput.current.focus();
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
                setF2(text);
                if (text.length >= 1) {
                  thirdInput.current.focus();
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
                setF3(text);
                if (text.length >= 1) {
                  fourthInput.current.focus();
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
                setF4(text);
                if (text.length >= 1) {
                  fourthInput.current.blur(); // Remove focus from the last input
                }
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.verifyButton, { backgroundColor: f1 && f2 && f3 && f4 ? '#0A8791' : '#808080' }]}
          disabled={!(f1 && f2 && f3 && f4)}
          onPress={() => {
            ans();
            clearInputs();
          }}>
          <Text style={styles.verifyButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
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
      width: screenWidth * 0.4,
      height: screenWidth * 0.4,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      lineHeight: 20 * 1.4,
      marginTop: 20,
      marginBottom: 10,
      color: 'white',
      fontWeight: 'bold',
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
      fontWeight: 'bold',
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
  
  
export default CompDoorpass

 