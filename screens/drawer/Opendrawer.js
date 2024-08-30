import { View, Text, Button } from 'react-native'
import React from 'react'
import Mainpage from './Mainpage';
import Icon from "react-native-vector-icons/MaterialIcons"
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContentDrawer from './ContentDrawer';
import Familyregsiter from './Familyregsiter';
import Registeraccount from './Registeraccount';
import TimeAccess from './TimeAccess';
import Tleveluser from './Tleveluser';
import Adminpinubdate from './Adminpinubdate';
const Drawer = createDrawerNavigator();
export default function Opendrawer() {
  return (

    <Drawer.Navigator drawerContent={props => <ContentDrawer {...props} />}>
      <Drawer.Screen name="mainpage" component={Mainpage} options={{
        headerShown: false,
        drawerLabel: 'Home',
        drawerIcon: () => <Icon name="home" size={24} color="black" />
      }}
      />
      <Drawer.Screen name="famiyregister" component={Familyregsiter} options={{
        drawerLabel: 'Family Registration',
        title: "Family Regsiter",
        drawerIcon: () => <Icon name="person" size={24} color="black" />

      }} />
      <Drawer.Screen name="registeraccount" component={Registeraccount} options={{
        title: "Register Accounts",
        drawerLabel: 'Register Account',
        drawerIcon: () => <Icon name="group" size={24} color="black" />
      }} />

      
      <Drawer.Screen name="Timelevel" component={Tleveluser} options={{
        title:"Time Access",
        
        drawerLabel: 'Time Access',
        drawerIcon: () => <Icon name="group" size={24} color="black" />
      }} />
      <Drawer.Screen
        name="adminubdatepin"
        component={Adminpinubdate}
        options={{
          headerShown: false,
          drawerLabel: 'Update Pin',
          drawerIcon: () => <Icon name="lock" size={24} color="black" />,
        }}
      />

    </Drawer.Navigator>


  )
}



