import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import SignIn from './src/screens/SignIn'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import { Ionicons } from '@expo/vector-icons'

// const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarActiveBackgroundColor: 'rgb(79 70 229)',
        }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons
                name="basket-outline"
                style={{
                  backgroundColor: 'rgb(79 70 229)',
                  padding: 5,
                  borderRadius: 20,
                }}
                size={20}
                color={'#fff'}
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Sign-In"
//           component={SignIn}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="SignUp"
//           component={SignUp}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Home"
//           component={Home}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

export default HomeTabs
