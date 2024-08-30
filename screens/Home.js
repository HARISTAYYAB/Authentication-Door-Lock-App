import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        const backAction = () => {
            if (isFocused) {
                BackHandler.exitApp(); 
                return true; 
            }
            return false; 
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); 
    }, [navigation, isFocused]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.loginButton}>
                <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Userlogin')} style={[styles.loginButton, { backgroundColor: '#006A42' }]}>
                <Text style={[styles.buttonText, { color: 'white' }]}>User</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#006A42',
        borderRadius: 100,
        alignItems: 'center',
        width: 250,
        paddingVertical: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
});
