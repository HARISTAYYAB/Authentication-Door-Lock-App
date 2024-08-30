import { View, Text,TouchableOpacity,TextInput,StyleSheet,Image } from 'react-native'
import React,{useState} from 'react'

const Passwordfield = ({value,setvalue,inputtitle}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View style={styles.passwordInputContainer}>
    <TextInput
      style={{color: '#006A42',}}
      placeholder={inputtitle}
      placeholderTextColor={'#006A42'}
      value={value}
      onChangeText={setvalue}
      secureTextEntry={!isPasswordVisible}
      autoCapitalize="none" 
    />
    <TouchableOpacity
      style={styles.passwordVisibilityIcon}
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
      <Image
        source={isPasswordVisible ? require('../Asset/visibility.png') : require('../Asset/visible.png')}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '78%',
      
      backgroundColor: 'rgb(220,220, 220)',
      marginVertical: 10,
      borderRadius: 100,
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    },
    passwordVisibilityIcon: {
      marginLeft:12
      
    },
  });
  

export default Passwordfield