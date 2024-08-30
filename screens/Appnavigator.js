import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from './Contexapi/authcontex';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Splash';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Doorpassword from './Doorpassword';
import Mainpage from './drawer/Mainpage';
import Opendrawer from './drawer/Opendrawer';
import Familyregsiter from './drawer/Familyregsiter';
import UseremailVerified from '../useraccregis/UseremailVerified';
import UserOtp from '../useraccregis/UserOtp';
import Userregistration from '../useraccregis/Userregistration';
import Userlogin from '../useraccregis/Userlogin';
import Registeraccount from './drawer/Registeraccount';
import Checkemail from '../Forgetpassword/Checkemail';
import Forgetotp from '../Forgetpassword/Forgetotp';
import Passwordforget from '../Forgetpassword/Passwordforget';
import TimeAccess from './drawer/TimeAccess';
import Tleveluser from './drawer/Tleveluser';
import Apasswordforget from '../Forgetpassword/Apasswordforget';
import Acheckemail from '../Forgetpassword/Acheckemail';
import Aforgetotp from '../Forgetpassword/Aforgetotp';
import Umainpage from '../useraccregis/Umainpage';
import Userdrawer from '../useraccregis/Userdrawer';
import Admindoorpassword from './drawer/Admindoorpassword';
import Userdoorpassword from '../useraccregis/Userdoorpassword';
const Stack = createNativeStackNavigator();


export default function Appnavigator() {
  return (


    <NavigationContainer>
      
    <Stack.Navigator>
    <Stack.Screen name="splash" component={Splash} options={{headerShown:false}} />
    <Stack.Screen name="home" component={Home} options={{headerShown:false}} />
    <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
    <Stack.Screen name="Signup"  component={Signup} options={{headerShown:false}} />
    <Stack.Screen name="mainpage" component={Mainpage} options={{headerShown:false}} />
    <Stack.Screen name="open" component={Opendrawer} options={{headerShown:false}} />
    <Stack.Screen name="familyregister" component={Familyregsiter} options={{headerShown:false}} />
    <Stack.Screen name="registeraccount" component={Registeraccount} options={{headerShown:false}} />
    <Stack.Screen name="useremailverified" component={UseremailVerified} options={{headerShown:false}} />
    <Stack.Screen name="Userotp" component={UserOtp} options={{headerShown:false}} />
    <Stack.Screen name="Userregistration" component={Userregistration} options={{headerShown:false}} />
    <Stack.Screen name="Userlogin" component={Userlogin} options={{headerShown:false}} />
    <Stack.Screen name="Usermainpage" component={Umainpage} options={{headerShown:false}} />
    <Stack.Screen name="Checkemail" component={Checkemail} options={{headerShown:false}} />
    <Stack.Screen name="forgetotp" component={Forgetotp} options={{headerShown:false}} />
    <Stack.Screen name="passwordforget" component={Passwordforget} options={{headerShown:false}} />
    {/* <Stack.Screen name="Timeaccess" component={TimeAccess} options={{headerShown:false}} /> */}
    <Stack.Screen name="Timelevel" component={Tleveluser} options={{headerShown:false}} />
    <Stack.Screen name="Apassword" component={Apasswordforget} options={{headerShown:false}} />
    <Stack.Screen name="Acheckemail" component={Acheckemail} options={{headerShown:false}} />
    <Stack.Screen name="Aforgetotp" component={Aforgetotp} options={{headerShown:false}} />
    <Stack.Screen name="userdrawer" component={Userdrawer} options={{headerShown:false}} />
    <Stack.Screen name="Admindoorpassword" component={Admindoorpassword} options={{headerShown:false}} />
    <Stack.Screen name="Userdoorpasword" component={Userdoorpassword} options={{headerShown:false}} /> 


    </Stack.Navigator>
   
     
  </NavigationContainer>

  )
}