import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const reminderContext=createContext()
export const dateContext=createContext()
export const deleteResponseContext=createContext()


export default function COntextSHare({children}) {
    const [reminder,setReminder]=useState({})
    const [selected, setSelected] = useState('');
    const [deleted,setDeleted]=useState()

  return (
   <dateContext.Provider value={{selected,setSelected}}>
        <deleteResponseContext.Provider value={{deleted,setDeleted}}>
          <reminderContext.Provider value={{reminder,setReminder}}>
              {children}
          </reminderContext.Provider>
        </deleteResponseContext.Provider>
   </dateContext.Provider>
  )
}

const styles = StyleSheet.create({})