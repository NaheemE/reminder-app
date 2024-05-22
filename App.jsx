import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Home from './Screens/Home'
import { PaperProvider } from 'react-native-paper'
import Add from './Screens/Add'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Edit from './Screens/Edit'
import COntextSHare from './context/COntextSHare'

const Stack = createNativeStackNavigator()

const App = () => {

  const [firstTimeUser, setFirstTimeUser] = useState('')
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const isFirstTimeUser = await AsyncStorage.getItem('firstTimeUser');
      setFirstTimeUser(isFirstTimeUser)
      console.log(isFirstTimeUser);
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAsyncStorageChange = () => {
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // <Provider store={store}>
    <PaperProvider>
<COntextSHare>
        <NavigationContainer>
          <Stack.Navigator >
            {
              firstTimeUser === 'false' ?
                <>
                  <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} initialParams={{ handleAsyncStorageChange }}/>
                  <Stack.Screen name='Add' component={Add} options={{
                    title:"Set reminder",
                     headerTitleAlign:"center",
                     headerStyle:{
                       backgroundColor:"#512CAF"
                     },
                     headerTintColor: 'white',
                       headerTitleStyle: {
                         color: 'white',
                       }
                  }} />
                  <Stack.Screen name='Edit' component={Edit} options={{
                    title:"Edit reminder",
                     headerTitleAlign:"center",
                     headerStyle:{
                       backgroundColor:"#512CAF"
                     },
                     headerTintColor: 'white',
                       headerTitleStyle: {
                         color: 'white',
                       }
                  }} />
                </> :
                <>
                  <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} initialParams={{ handleAsyncStorageChange }}/>
                  <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                </>
            }
          </Stack.Navigator>
        </NavigationContainer> 
</COntextSHare>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})