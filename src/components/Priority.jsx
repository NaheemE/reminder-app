import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Priority({reminder,setReminder}) {
  return (
    <View style={{marginTop:50}}>
        <Text style={{color:"black",fontSize:17,fontWeight:"500"}}>
            Set priority
        </Text>
        <TouchableOpacity onPress={()=>setReminder({...reminder,priority:"low"})}>
            <View style={{flexDirection:"row",marginTop:10}}>
            <View style={{width:10,borderRadius:10,backgroundColor:"#2196F3",height:10,marginTop:5}}></View>
            <Text style={{color:reminder.priority=="low"?"black":"#D5D4DF",fontSize:15,marginLeft:10,fontWeight:"500"}}>Low</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setReminder({...reminder,priority:"medium"})}>
            <View style={{flexDirection:"row",marginTop:10}}>
            <View style={{width:10,borderRadius:10,backgroundColor:"orange",height:10,marginTop:5}}></View>
            <Text style={{color:reminder.priority=="medium"?"black":"#D5D4DF",fontSize:15,marginLeft:10,fontWeight:"500"}}>Medium</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setReminder({...reminder,priority:"high"})}>
            <View style={{flexDirection:"row",marginTop:10}}>
            <View style={{width:10,borderRadius:10,backgroundColor:"red",height:10,marginTop:5}}></View>
            <Text style={{color:reminder.priority=="high"?"black":"#D5D4DF",fontSize:15,marginLeft:10,fontWeight:"500"}}>High</Text>
            </View>
        </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({})