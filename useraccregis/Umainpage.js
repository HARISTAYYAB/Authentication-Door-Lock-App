import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, BackHandler } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../ip';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import Button from '../Componenet/Button';

export default function Umainpage({ navigation }) {
    const getapi = async () => {
        console.log("Button")
        try {
            const token = await AsyncStorage.getItem('NUser');
            const tokenObject = JSON.parse(token);
            const { data } = await axios.get(`http://${ip}:8080/openlock`, {
                headers: { 'x-auth-token': tokenObject.token },
            });
    
            if (data?.msg === 'Temporary Blocked') {
                Alert.alert('Temporary Blocked', 'Door can not access at this time .');
            } else if (data?.msg === 'Door Opened') {
                Alert.alert('Success', 'Door is Unlocked.');
            } else {
                Alert.alert('Unknown Response', 'Received an unknown response from the server.');
            }
        } catch (error) {
            // Handle errors from the API call or parsing the token
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while fetching data.');
        }
    };
    const isFocused = useIsFocused();

    useEffect(() => {
        const backAction = () => {
            if (isFocused) {
                Alert.alert(
                    'Confirmation',
                    'Do you want to navigate to the home screen?',
                    [
                        { text: 'Cancel', onPress: () => null, style: 'cancel' },
                        { text: 'OK', onPress: () => navigation.navigate('home') }
                    ],
                    { cancelable: false }
                );
                return true; // Prevent default behavior
            }
            return false; // Allow default behavior for other screens
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Clean up the event listener on unmount
    }, [navigation, isFocused]);

    return (
        <View style={styles.maincontainer}>
            <View style={styles.rowcontainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                    style={styles.iconContainer}
                >
                    <Icon name="menu" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Confirmation',
                            'Do you want to navigate to the home screen?',
                            [
                                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                                { text: 'OK', onPress: () => navigation.navigate('home') }
                            ],
                            { cancelable: false }
                        );
                    }}
                >
                    <Icon name="logout" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={getapi}>
                    <Image source={require("../Asset/lock.png")} style={styles.logo} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#006A42'
    },
    rowcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
       
    },
    iconContainer: {
        marginRight: 15, // Adjust the margin as needed
    },
    rightIconContainer: {
        marginLeft: 'auto', // This will push the icon to the right
    },
    logo: {
        width: 120, // Adjust the percentage as needed
        height: 120, // Adjust the percentage as needed
        justifyContent: 'center'
    },
});
