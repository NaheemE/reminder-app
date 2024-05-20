import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Home from './Screens/Home'
import { PaperProvider } from 'react-native-paper'
import Add from './Screens/Add'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login}
          options={{ headerShown: false }}
          />
          <Stack.Screen name='Register' component={Register}
          options={{ headerShown: false }}

          />
          <Stack.Screen name='Home' component={Home}
          options={{ headerShown: false }}
          />
          <Stack.Screen name='Add' component={Add}
          options={{
            title:"Set reminder",
            headerTitleAlign:"center",
        headerStyle:{
          backgroundColor:"#512CAF"
        },
        headerTintColor: 'white',
          headerTitleStyle: {
            color: 'white',
          }
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})