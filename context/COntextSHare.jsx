import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const reminderContext=createContext()
export const dateContext=createContext()


export default function COntextSHare({children}) {
    const [reminder,setReminder]=useState({})
    const [selected, setSelected] = useState('');

  return (
   <dateContext.Provider value={{selected,setSelected}}>
        <reminderContext.Provider value={{reminder,setReminder}}>
            {children}
        </reminderContext.Provider>
   </dateContext.Provider>
  )
}

const styles = StyleSheet.create({})