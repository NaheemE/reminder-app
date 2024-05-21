import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReminderItem from './ReminderItem'

export default function Reminders() {
  return (
    <View style={{ marginVertical: 20, padding: 20 }}>
      <Text style={{ color: "black", fontSize: 23, fontWeight: "500" }}>Today</Text>
      <View style={{ alignItems: "center", width: "100%", marginTop: 20 }}>
        <View style={{ width: 100, height: 7, backgroundColor: "#512CAF", borderRadius: 10 }}></View>
      </View>
      <ReminderItem />
      <ReminderItem />
      <ReminderItem />
    </View>
  )
}

const styles = StyleSheet.create({})