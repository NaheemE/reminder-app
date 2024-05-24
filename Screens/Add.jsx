import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '../src/components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import SetDateandTime from '../src/components/SetDateandTime';
import Priority from '../src/components/Priority';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'


export default function Add({ navigation }) {
  const [reminder, setReminder] = useState({
    title: '',
    description: '',
    priority: 'low',
    dateandtime: '',
    uid: ''
  });

  console.log(reminder);
  const handleSubmit = async () => {
    const { title, description, priority, dateandtime } = reminder
    if (!title || !description || !priority || !dateandtime) {
      Alert.alert("Please fill all the fields")
    }
    else {
      try {
        setReminder({...reminder,dateandtime:dateandtime})
        const res = await firestore().collection("reminders").add(reminder)
        console.log(res);
        navigation.navigate("Home")
        setReminder({
          title: '',
          description: '',
          priority: 'low',
          dateandtime: new Date(),
          uid: ''
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    const getData = async () => {
      const currentUser = auth().currentUser;
      console.log(currentUser.uid);
      setReminder(() => ({
        ...reminder,
        uid: currentUser.uid,
      }));
    }
    getData()
  }, [])

  return (
    <ScrollView style={{ backgroundColor: 'white', padding: 20 }} showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 20 }}>
        <CustomInput
          label={'Title'}
          value={reminder.title}
          onChangeText={text => setReminder({ ...reminder, title: text })}
        />
        <CustomInput
          label={'Description'}
          value={reminder.description}
          onChangeText={text => setReminder({ ...reminder, description: text })}
          multilined={true}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <SetDateandTime reminder={reminder} setReminder={setReminder} />
      </View>
      <Priority reminder={reminder} setReminder={setReminder} />
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: '#1A0B42',
          height: 60,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
          Set
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
