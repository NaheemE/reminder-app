import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Calender from '../src/components/Calender';
import FAIcons from 'react-native-vector-icons/FontAwesome6';
import Reminders from '../src/components/Reminders';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { dateContext } from '../context/COntextSHare';
import ModalDropdown from 'react-native-modal-dropdown';

const Home = ({ navigation, route }) => {
  const { selected, setSelected } = useContext(dateContext);
  console.log(selected);
  const [username, setUsername] = useState('');
  const [reminders, setReminders] = useState([]);

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
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const currentUser = auth().currentUser;
        const users = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();
        setUsername(users?.data().username);

        const remindersQuerySnapshot = await firestore()
          .collection('reminders')
          .where('uid', '==', currentUser.uid)
          .get();

        // console.log('aaaaaaaaaaaa');
        // const id = remindersQuerySnapshot._docs[0]._ref._documentPath._parts[1]
        // console.log(id);

        setReminders(
          remindersQuerySnapshot.docs.filter(item => {
            // const id = item._ref._documentPath._parts[1];
            const [year, month, day] = selected.split('-');
            const datePart = item._data.dateandtime.split(',')[0].trim();
            const formattedDate = `${String(parseInt(day)).padStart(2, '0')}/${String(parseInt(month)).padStart(2, '0')}/${year}`;
            return datePart === formattedDate 
          })
        );
      };
      getData();
    }, [selected]),
  );
console.log('bbbbbb');
console.log(reminders);

  return (
    <ScrollView
      style={{ paddingTop: 20, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <ModalDropdown
          options={['Logout']}
          onSelect={(index, value) => {
            if (value === 'Logout') {
              logout();
            }
          }}
          dropdownStyle={{ width: 100, height: 42, alignItems: "center", padding: 0 }}
          dropdownTextStyle={{ fontSize: 15, width: 100, textAlign: "center", fontWeight: "500", color: "black" }}
        >
          <Text style={{ color: 'black', fontSize: 23, fontWeight: '600' }}>
            Hey {username}...
          </Text>
        </ModalDropdown>
        <TouchableOpacity
          style={{
            backgroundColor: '#512CAF',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('Add')}
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
