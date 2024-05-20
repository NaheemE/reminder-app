import {
    Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../src/components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import SetDateandTime from '../src/components/SetDateandTime';
import Priority from '../src/components/Priority';

export default function Add() {
  const [reminder, setReminder] = useState({
    title: '',
    description: '',
    priority: 'low',
    dateandtime: new Date(),
  });
  console.log(reminder);
  const handleSubmit=()=>{
    const {title,description,priority,dateandtime}=reminder
    if(!reminder.title){
        Alert.alert("Please enter the title")
    }
    else{

    }
  }
  return (
    <ScrollView style={{backgroundColor: 'white', padding: 20}} showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 20}}>
        <CustomInput
          label={'Title'}
          value={reminder.title}
          onChangeText={text => setReminder({...reminder, title: text})}
        />
        <CustomInput
          label={'Description'}
          value={reminder.description}
          onChangeText={text => setReminder({...reminder, description: text})}
        />
      </View>
      <View style={{marginTop: 20}}>
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
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          Set
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
