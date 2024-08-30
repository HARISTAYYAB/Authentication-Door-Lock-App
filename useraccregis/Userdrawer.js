import { View, Text } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Userubdatepin from './Userubdatepin';
import Umainpage from './Umainpage';
import Usercontentdrawer from './Usercontentdrawer';
const Drawer = createDrawerNavigator();
export default function Userdrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <Usercontentdrawer {...props} />} >
        <Drawer.Screen name="Usermainpage" component={Umainpage} options={{
        headerShown: false,
        drawerLabel: 'main page',
        drawerIcon: () => <Icon name="person" size={24} color="black" />

      }} />
      <Drawer.Screen
        name="userubdatepin"
        component={Userubdatepin}
        options={{
          headerShown: false,
          drawerLabel: 'Update Pin',
          drawerIcon: () => <Icon name="lock" size={24} color="black" />,
        }}
      />
    </Drawer.Navigator>
  )
}