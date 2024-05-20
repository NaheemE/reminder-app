import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Calender from '../src/components/Calender';
import FAIcons from 'react-native-vector-icons/FontAwesome6';
import Reminders from '../src/components/Reminders';

const Home = ({navigation}) => {
  return (
    <ScrollView style={{paddingTop:20,backgroundColor:"white"}} showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal:20
        }}>
        <Text style={{color: 'black', fontSize: 23, fontWeight: '600'}}>
          Hey User...
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#512CAF',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation:5
          }}
          onPress={()=>navigation.navigate("Add")}
          
          >
          <FAIcons
            style={{color: 'white', fontSize: 25, fontWeight: '900'}}
            name="plus"
          />
        </TouchableOpacity>
      </View>
      <Calender />
      <Reminders/>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
