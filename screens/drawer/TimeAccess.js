// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Switch, ScrollView } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function TimeAccess({ navigation }) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [apidata, setApiData] = useState([]);
//     const [switchValues, setSwitchValues] = useState({});

//     useEffect(() => {
//         loadSwitchValues();
//         getApiData();
//     }, []);

//     const loadSwitchValues = async () => {
//         try {
//             const storedSwitchValues = await AsyncStorage.getItem('switchValues');
//             if (storedSwitchValues !== null) {
//                 setSwitchValues(JSON.parse(storedSwitchValues));
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const saveSwitchValues = async (values) => {
//         try {
//             await AsyncStorage.setItem('switchValues', JSON.stringify(values));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getApiData = async () => {
//         try {
//             setIsLoading(true);
//             const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
//             setApiData(data);
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleSwitchChange = (email) => {
//         const newSwitchValues = { ...switchValues };
//         newSwitchValues[email] = !switchValues[email]; // Toggle the switch state
//         setSwitchValues(newSwitchValues);
//         saveSwitchValues(newSwitchValues);

//         // Check and log the switch state
//         if (newSwitchValues[email]) {
//             console.log(`Switch for ${email} is on`);
//         } else {
//             console.log(`Switch for ${email} is off`);
//         }
//     };

//     const isUserAvailable = (email) => {
//         return apidata.some(user => user.email === email);
//     };

//     return (
//         <View style={styles.maincontainer}>
//             {isLoading ? (
//                 <View style={styles.loader}><ActivityIndicator size={'large'} color={"white"} /></View>
//             ) : (
//                 <ScrollView>
//                     {apidata.map((user) => (
//                         <TouchableOpacity key={user.id}>
//                             <View style={styles.itemContainer}>
//                                 <View style={styles.columnContainer}>
//                                     <Text style={styles.text}>{user.id}</Text>
//                                     <Text style={styles.text}>{user.email}</Text>
//                                 </View>
                                
//                                 <Switch
//                                     value={switchValues[user.email]}
//                                     onValueChange={() => handleSwitchChange(user.email)} // Update the switch state on press
//                                     disabled={!isUserAvailable(user.email)} // Disable switch if user is not available
//                                 />
//                             </View>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,
//         backgroundColor: '#006A42'
//     },
//     itemContainer: {
//         backgroundColor: 'white',
//         margin: 8,
//         alignItems: 'center',
//         flexDirection: 'row',
//         height: 60,
//         padding: 9
//     },
//     columnContainer: {
//         flexDirection: 'column', // Stack email and ID vertically
//         alignItems: 'flex-start', // Align items to the start of the column
//     },
//     text: {
//         fontSize: 15
//     },
//     loader: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });
