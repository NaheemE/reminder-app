import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'

export default function Calender() {
    const [selected, setSelected] = useState('');

  return (
    <View style={{paddingHorizontal:20}}>
        <Calendar
       theme={{
        calendarBackground:'#220A5E',
        selectedDayBackgroundColor: 'white',
        selectedDayTextColor:"red",
        monthTextColor:"white",
        textSectionTitleColor:"#03AED2",
        selectedDotColor:"red",
        dayTextColor:"white",
        textDisabledColor:"gray"
       }}
       style={{backgroundColor:"#220A5E",borderRadius:10,padding:10,marginTop:20,elevation:5}}
       onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          selectedColor: '#FF5F00',
          selectedTextColor: 'white', 
        },
      }}

/>
    </View>
  )
}

const styles = StyleSheet.create({})