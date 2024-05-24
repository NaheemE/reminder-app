import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput,DefaultTheme } from 'react-native-paper'

export default function CustomInput({label,value,onChangeText,secureTextEntry=false,multilined=false}) {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#512CAF', 
      outline: '#220A5E',
    },
  };
  return (
    <View>
        <TextInput
        mode='outlined'
        style={{backgroundColor:"white",width:"100%",minHeight:60,marginTop:20,borderColor:"red",textAlignVertical:"center"}}
        label={label}
        value={value}
        onChangeText={onChangeText}
        theme={customTheme}
        multiline={multilined}
        secureTextEntry={secureTextEntry}
        />
    </View>
  )
}

const styles = StyleSheet.create({})