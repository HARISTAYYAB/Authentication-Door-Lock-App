import { View, Text, StyleSheet, ActivityIndicator,Button,ScrollView,Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ip from '../../ip'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Registeraccount() {
  const [isLoading, setisLoading] = useState(false)
  const [apidata, setapidata] = useState([])
  useEffect(() => {
    getapi()

  }, [])
  const deletedata = (_id) => {
    Alert.alert(
      'Confirmation',
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
  
              if (!tokenObject || !tokenObject.token) {
                console.error('No token found');
                return;
              }
  
              
              const response = await axios.get(
                `http://${ip}:8080/familyRegister/register_account/delete/${_id}`,
                {
                  headers: {
                    'x-auth-token': tokenObject.token,
                    'Content-Type': 'application/json',
                  },
                }
              );
  
              
              getapi()
             
  
              console.log('Delete API response:', response.data);
  
            } catch (error) {
              console.error('Delete API error:', error);
  
              if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
              } else if (error.request) {
                // Request was made but no response received
                console.error('Error request data:', error.request);
              } else {
                // Something else happened
                console.error('Error message:', error.message);
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const getapi=async()=>{
    try {
      const token = await AsyncStorage.getItem("user");
      setisLoading(true)
      const tokenObject = JSON.parse(token);
  

      const { data } = await axios.get(`http://${ip}:8080/familyRegister/registerAccount`,
      {headers: { 'x-auth-token': tokenObject.token }});
      setapidata(data)
      setisLoading(false)
    
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <View style={styles.maincontainer}>
       
        {
          isLoading?(<View style={styles.loader} ><ActivityIndicator size={'large'} color={"white"} /></View>)
          :(
            <ScrollView>
          {apidata.map((list, index) => {
            return (
              <View key={index} style={{
                backgroundColor: 'white', margin: 8, alignItems: 'center', display: 'flex', flexDirection: 'row'
                , justifyContent: 'space-around', height: 60, padding: 9
              }} >
                <View>
                  <Text style={{ fontSize: 15 }}>{list.email}</Text>
                </View>
                <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                  {/* <Button title="Edit" onPress={() => { console.log("press delete") }} /> */}
                  <View style={{ marginHorizontal: 8 }} />
                  <Button title="Delete" onPress={() => { deletedata(list._id) }} />
                </View>
              </View>
            )
          })}
        </ScrollView>
          )
        }
    </View>
  )
}
const styles=StyleSheet.create({
  maincontainer:{
    flex:1,
    backgroundColor:'#006A42'
  },
  heading:{
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    margin:15
    
  },
  loader:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})