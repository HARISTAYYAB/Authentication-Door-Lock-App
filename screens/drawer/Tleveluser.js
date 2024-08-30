import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, Button, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ip from '../../ip';
const Tleveluser = () => {
  const [isLoading, setisLoading] = useState(false);
  const [apidata, setapidata] = useState([]);
  const [switchValues, setSwitchValues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);


  const [date1, setdate1] = useState(new Date());
  const [show1, setshow1] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState(null);

  const [date, setdate] = useState(new Date());
  const [show, setshow] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const getApi = async () => {
    try {
      setisLoading(true);
      const token = await AsyncStorage.getItem("user");
      const tokenObject = JSON.parse(token);
      const { data } = await axios.get(`http://${ip}:8080/familyRegister/registerAccount`,
        { headers: { 'x-auth-token': tokenObject.token } });
      setapidata(data);

      setisLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  const onChange1 = (e, selecteddate1) => {
    if (e.type === 'dismissed') {

      setshow1(false);
    } else {

      setdate1(selecteddate1);
      setshow1(false);

      const dt1 = new Date(selecteddate1);
      const x1 = dt1.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      console.log("Selected Time 1:", x1);

      
      setSelectedTime1(x1);
    }
  };

  const tshow1 = () => {
    setshow1(true);
  };


  const onChange = (e, selecteddate) => {
    if (e.type === "dismissed") {
      
      setshow(false);
    } else {

      setdate(selecteddate);
      setshow(false);

      const dt = new Date(selecteddate);
      const x = dt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      console.log("Selected Time 2:", x);

      // Set selectedTime only when the user clicks "OK"
      setSelectedTime(x);
    }
  };


  const tshow = () => {
    setshow(true);
  };

  useEffect(() => {
    getApi();
    loadSwitchValues();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getApi()
      return () => {};
    }, [])
  );


  const isPrintButtonDisabled = !selectedTime1 || !selectedTime;

  const handleOkPress = async (_id) => {

    if (!isPrintButtonDisabled) {
      const token = await AsyncStorage.getItem("user");
      const tokenObject = JSON.parse(token);
      const { data } = await axios.put(`http://${ip}:8080/timeAccess/updateTime/${currentUserId}`,
        { startTime: selectedTime1, endTime: selectedTime, },
        { headers: { 'x-auth-token': tokenObject.token } });
      
      ToastAndroid.showWithGravity(
        `User Time Level Access has been set `,
        ToastAndroid.SHORT
        ,
        ToastAndroid.BOTTOM
      );

      console.log("Printed Times:", selectedTime1, selectedTime);
      console.log("User ID:", currentUserId)
      getApi();
      setModalVisible(false);
      setSelectedTime1(null);
      setSelectedTime(null);

      
    }
  };
 

  const cancelpress = () => {
    setModalVisible(false)
    setSelectedTime1(null);
    setSelectedTime(null);

  }

  const handlePrintUserId = (_id) => {
    setCurrentUserId(_id);
    setModalVisible(true);


  };


  const loadSwitchValues = async () => {
    try {
      const storedSwitchValues = await AsyncStorage.getItem('switchValues');
      if (storedSwitchValues !== null) {
        setSwitchValues(JSON.parse(storedSwitchValues));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveSwitchValues = async (values) => {
    try {
      await AsyncStorage.setItem('switchValues', JSON.stringify(values));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSwitchChange = async (_id) => {
    const newSwitchValues = { ...switchValues };
    newSwitchValues[_id] = !switchValues[_id]; // Toggle the switch state
    setSwitchValues(newSwitchValues);
    saveSwitchValues(newSwitchValues);

    // Check and log the switch state
    if (newSwitchValues[_id]) {
      console.log(`Switch for  is on, _id: ${_id}`);
      const token = await AsyncStorage.getItem("user");
      const tokenObject = JSON.parse(token);
      const { data } = await axios.put(`http://${ip}:8080/timeAccess/updateTime/on/${_id}`,
        { status: "1" },
        { headers: { 'x-auth-token': tokenObject.token } });
      ToastAndroid.showWithGravity(
        `Turn On User Time Level Access `,
        ToastAndroid.SHORT
        ,
        ToastAndroid.BOTTOM
      );


    } else {

      const token = await AsyncStorage.getItem("user");
      const tokenObject = JSON.parse(token);
      const { data } = await axios.put(
        `http://${ip}:8080/TimeAccess/updateStatus/${_id}`,
        { status: "0" },
        { headers: { 'x-auth-token': tokenObject.token } }
      );
      
      ToastAndroid.showWithGravity(
        'Turn Off User Time Level Access ',
        ToastAndroid.SHORT
        ,
        ToastAndroid.BOTTOM
      );
      console.log(_id)

    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#006A42' }}>
      {isLoading ? (
        <View style={styles.loader}><ActivityIndicator size={'large'} color={'white'} /></View>
      ) : (
        <ScrollView>
          {apidata.map((list, index) => (
            <View key={index} style={{
              backgroundColor: 'white', margin: 8, alignItems: 'center', display: 'flex', flexDirection: 'row'
              , justifyContent: 'space-around', padding: 13
            }} >
              <View>
                <TouchableOpacity onPress={() => handlePrintUserId(list._id)}>
                  <Text style={{ fontSize: 15 }}>{list.username}</Text>
                  <Text style={{ fontSize: 15 }}>{list.email}</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{list.start_time}-{list.end_time}</Text>
                </TouchableOpacity>


              </View>
              <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                <View style={{ marginHorizontal: 8 }} />

                <Switch
                  value={switchValues[list._id]}
                  onValueChange={() => handleSwitchChange(list._id)}
                  disabled={!list.start_time || !list.end_time}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.overlay} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.modalView}>
              <Text style={{fontWeight:'bold',}}>Select Time Range:</Text>
              <Button title="Start Time Pick" onPress={() => { tshow1() }} />
              <Button title="End Time Pick" onPress={() => { tshow() }} />

              {show1 && (
                <DateTimePicker
                  value={date1}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onChange1}
                />
              )}

              {show && (
                <DateTimePicker
                  value={date}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
              <Button
                title="OK"
                onPress={handleOkPress}
                disabled={isPrintButtonDisabled}
              />
              <Button title="Close" onPress={() => {
                cancelpress()
              }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Tleveluser;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    paddingVertical: 20,
    paddingHorizontal:29,
    backgroundColor: 'white',
    borderRadius: 10,
    gap:10
  },
});

