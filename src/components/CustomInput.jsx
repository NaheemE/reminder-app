import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

export default function CustomInput({label,value,onChangeText}) {
  return (
    <View>
        <TextInput
        mode='outlined'
        style={{backgroundColor:"white",width:"100%",height:60,marginTop:20}}
        label={label}
        value={value}
        onChangeText={onChangeText}
        />
    </View>
  )
}

const styles = StyleSheet.create({})