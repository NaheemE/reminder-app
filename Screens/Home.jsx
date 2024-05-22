import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Calender from '../src/components/Calender';
import FAIcons from 'react-native-vector-icons/FontAwesome6';
import Reminders from '../src/components/Reminders';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const Home = ({ navigation, route }) => {

  const [username, setUsername] = useState('')
  const [reminders,setReminders]=useState([])

  const logout = async () => {
    try {
      await auth().signOut();
      console.log('Sign Out Successful');
      await AsyncStorage.removeItem('firstTimeUser');
      route.params.handleAsyncStorageChange();
      // navigation.navigate("Login")
    } catch (error) {
      console.log('Error', error.message);
    }
  }

  useFocusEffect(React.useCallback(() => {
    const getData = async () => {
      const currentUser = auth().currentUser;
      const users = await firestore().collection('users').doc(currentUser.uid).get()
      setUsername(users?.data().username)

      const remindersQuerySnapshot = await firestore().collection('reminders').where('uid', '==', currentUser.uid).get();
      // console.log(remindersQuerySnapshot.docs);
      setReminders(remindersQuerySnapshot.docs)
    }
    getData()
  }, []));

  return (
    <ScrollView style={{ paddingTop: 20, backgroundColor: "white" }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
        <Button title='logout' onPress={logout} />
        <Text style={{ color: 'black', fontSize: 23, fontWeight: '600' }}>
          Hey {username}...
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#512CAF',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 5
          }}
          onPress={() => navigation.navigate("Add")}

        >
          <FAIcons
            style={{ color: 'white', fontSize: 25, fontWeight: '900' }}
            name="plus"
          />
        </TouchableOpacity>
      </View>
      <Calender />
      <Reminders navigation={navigation} reminders={reminders} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
