import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const reminderContext=createContext()


export default function COntextSHare({children}) {
    const [reminder,setReminder]=useState({})
  return (
    <reminderContext.Provider value={{reminder,setReminder}}>
        {children}
    </reminderContext.Provider>
  )
}

const styles = StyleSheet.create({})