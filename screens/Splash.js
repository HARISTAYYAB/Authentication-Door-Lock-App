import { View, Text,Image } from 'react-native'
import { React, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
export default function Splash() {
    const navigation = useNavigation();
    useEffect(() => {

        setTimeout(() => {
            
            // navigation.navigate("userdrawer")
            //important
            navigation.navigate("home");
            //main page
            // navigation.navigate("open")
        }, 4000)
    }, [])
    return (
        <View style={{ display: 'flex', backgroundColor: '#006A42', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image style={{ height:160, width:160,borderRadius:80 }} resizeMode='contain' source={require('../Asset/opendoor.png')} />
        </View>
    )
}