import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'

const Button = ({buttontitle,onPress,buttoncolor,textcolor,loading}) => {
  return (
    <TouchableOpacity
    style={[styles.loginButton, { backgroundColor: buttoncolor }]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator size='large' color={textcolor} />
    ) : (
      <Text style={[styles.buttonText, { color: textcolor }]}>
        {buttontitle}
      </Text>
    )}
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    loginButton: {
      borderRadius: 100,
      alignItems: 'center',
      justifyContent:'center',
      width: 250,
      paddingVertical: 10,
      marginVertical: 10,
      
    },
    buttonText: {
      
      fontSize: 25,
      fontWeight: 'bold',
    }
  });
export default Button