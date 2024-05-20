import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ReminderItem() {
  return (
    <View style={{width:"100%",height:100,backgroundColor:"#512CAF",flexDirection:"row",justifyContent:"space-between",borderRadius:20,padding:20,alignItems:"center",marginTop:20,elevation:5}}>
        <View style={{flexDirection:"row"}}>
            <View style={{width:10,borderRadius:10,backgroundColor:"red",height:10,marginTop:5}}></View>
            <View style={{marginLeft:10}}>
                <Text style={{color:"white",fontSize:18,fontWeight:"500"}}>Phone bill</Text>
                <Text style={{color:"black"}}>khb ks kjsn...</Text>
            </View>

        </View>
        <View>
            <Text style={{color:"white",fontSize:18,fontWeight:"500"}}>09:00 PM</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})