import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ReminderItem from './ReminderItem';
import { dateContext } from '../../context/COntextSHare';

export default function Reminders({ reminders, navigation }) {
  const { selected, setSelected } = useContext(dateContext);
  const [dateString, setDatestring] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getYesterDayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const todayDate = getTodayDate();
    const tomorrowDate = getTomorrowDate();
    const yesterdaydate = getYesterDayDate();

    if (selected == todayDate) {
      setDatestring('Today');
    } else if (selected == tomorrowDate) {
      setDatestring('Tomorrow');
    } else if (selected == yesterdaydate) {
      setDatestring('Yesterday');
    } else {
      setDatestring(selected);
    }
  }, [selected]);


  return (
    <View style={{ marginVertical: 20, padding: 20 }}>
      <Text style={{ color: 'black', fontSize: 23, fontWeight: '500' }}>
        {dateString}
      </Text>
      <View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
        <View
          style={{
            width: 100,
            height: 7,
            backgroundColor: '#512CAF',
            borderRadius: 10,
          }}></View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        data={reminders}
        renderItem={({ item }) => (
          <ReminderItem navigation={navigation} item={item} />
        )}
        ListEmptyComponent={
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={{ color: "black", fontSize: 15 }}>No reminders set , </Text><TouchableOpacity onPress={() => navigation.navigate("Add")}><Text style={{ color: "#512CAF", fontSize: 15 }}>click here to add</Text></TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
