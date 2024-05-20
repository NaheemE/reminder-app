import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Home from './Screens/Home'
import { PaperProvider } from 'react-native-paper'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    // <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name='Register' component={Register}
              options={{ headerShown: false }}

          />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})