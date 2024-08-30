import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, Modal, Button, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ip from '../../ip';

export default function Familyregsiter({ navigation }) {

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sdata, setdata] = useState([]);

  useEffect(() => {
    
    getApi()
  }, []);

  const deletedata = (_id) => {
    Alert.alert(
      'Confirmaion',
      'Do you want to Delete?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('user');
              const tokenObject = JSON.parse(token);

              const { data } = await axios.post(
                `http://${ip}:8080/familyRegister/non-registered-delete/${_id}`,
                {},
                {
                  headers: {
                    'x-auth-token': tokenObject.token,
                    'Content-Type': 'application/json',

                  },
                }
              );
              getApi()


              console.log('Delete API response:', data);

            } catch (error) {

              console.error('Delete API error:', error);

            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const fetchData = async () => {
    if (!email) {
      setEmailError('Enter the email');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email');
      return;
    } else {
      setEmailError('');
    }

  

    try {
      const token = await AsyncStorage.getItem("user"); // Get the authentication token
      const tokenObject = JSON.parse(token);
      const { data } = await axios.post(
        `http://${ip}:8080/familyRegister`,
        { email, contact: "03002289775" },
        { headers: { 'x-auth-token': tokenObject.token } } // Include the token in the headers
      );
      if (data?.msg == "User already Exists") {
        Alert.alert("Aler", "User already Available")
        
        setEmail('');
        

      } else {

        console.log("Register API Response:", data);
        getApi()
        // Alert.alert("Family member has been registered ");

        // Clear input fields and close the modal
        setShow(false);
        setEmail('');
        
      }

    } catch (error) {
      console.error("API request failed:", error);
      setShow(false)
      // Handle error appropriately (show error message, log, etc.)
    }
  };





  const getApi = async () => {
    console.log("Get api function called")
    try {
      const token = await AsyncStorage.getItem("user");
      setIsLoading(true);
      const tokenObject = JSON.parse(token);

      const { data } = await axios.get(`http://${ip}:8080/familyRegister`,
        { headers: { 'x-auth-token': tokenObject.token } });
      setdata(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Icon style={{ padding: 20 }} name="menu" size={35} color={'white'} />
      </TouchableOpacity> */}
     
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView>
          {sdata.map((list, index) => {
            return (
              <View key={index} style={styles.listItem}>
                <View>
                  <Text style={{ fontSize: 15 }}>{list.email}</Text>
                </View>
                <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                  
                  <View style={{ marginHorizontal: 8 }} />
                  <Button title="Delete" onPress={() => deletedata(list._id)} />
                </View>
              </View>
            )
          })}
        </ScrollView>
      )}

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Image style={styles.addButton} resizeMode='contain' source={require("../../Asset/plus.png")} />
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={show}>
        <View style={styles.modalOverlay}>
          <View style={styles.centerview}>
            <View style={styles.modalview} >
              <Text
                style={{
                  color: '#006A42',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                Family Register
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={'#006A42'}
                value={email}
                autoCapitalize='none'
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError('');
                }}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    setEmail('');
                    
                    setShow(false)

                  }}
                >
                  <Text style={styles.buttonText}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    fetchData();


                  }}
                >
                  <Text style={styles.buttonText}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#006A42',
  },

  listItem: {
    backgroundColor: 'white',
    margin: 8,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
    padding: 9,
  },

  addButtonContainer: {
    position: 'absolute',
    top: 640,
    right: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    height: 70,
    width: 70,
  },

  centerview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalview: {
    backgroundColor: 'white',
    padding: 30,
    width: 320,
    borderRadius: 20,
    elevation: 5,
  },

  input: {
    borderRadius: 100,
    color: '#006A42',
    paddingHorizontal: 10,
    width: 250,
    backgroundColor: 'rgb(220,220, 220)',
    marginVertical: 10,
  },

  loginButton: {
    borderRadius: 100,
    alignItems: 'center',
    width: 120,
    paddingVertical: 10,
    backgroundColor: 'red'
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change this to the desired light grey color
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: '12%',
  },

});
