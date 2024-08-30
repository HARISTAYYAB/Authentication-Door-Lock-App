import React from 'react';
import {TextInput} from 'react-native';



const Field = ({inputtitle,value,setvalue,secureTextEntry=false}) => {
  return (
    <TextInput
    value={value}
    onChangeText={setvalue}
     placeholder={inputtitle}
     autoCapitalize="none" 
     secureTextEntry={secureTextEntry}
      style={{borderRadius: 100, color: "#006A42",
       paddingHorizontal: 10,margin:20, width: '78%', backgroundColor: 'rgb(220,220, 220)',
        marginVertical: 10}}
      placeholderTextColor={"#006A42"} />
  );
};

export default Field;