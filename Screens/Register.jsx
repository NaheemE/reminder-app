import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../src/components/CustomInput'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const Register = ({ navigation }) => {
  const [user, setUser] = useState({
    username: "", email: "", password: ""
  })
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { username, email, password } = user
    if (!email || !password || !username) {
      Alert.alert("Please fill the form completely...")
    }
    else {
      setLoading(true);
      try {
        const userCredentials = await auth().createUserWithEmailAndPassword(email, password)
        const user = userCredentials.user

        await firestore().collection('users').doc(user.uid).set({
          username: username,
          email: email
        })
        console.log(user);
        navigation.navigate("Login")
        setUser({
          username: "", email: "", password: ""
        })
      }
      catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1A0B42" />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white", marginTop: 30 }}>
          <Image
            source={{
              uri: "https://static-00.iconduck.com/assets.00/reminder-note-illustration-2048x1543-2si44jzj.png"
            }}
            style={{ width: 250, height: 200 }}
          />
          <Text style={{ fontSize: 31, color: "#220A5E", fontFamily: "serif", fontWeight: "bold", textAlign: "center" }}>
            Never forget to do {'\n'}
            your tasks {'\n'}
            again.
          </Text>
          <View style={{ width: "100%", marginTop: 10 }}>
            <CustomInput
              label={"Username"}
              value={user.username}
              onChangeText={text => setUser({ ...user, username: text })}
            />
            <CustomInput
              label={"Email"}
              value={user.email}
              onChangeText={text => setUser({ ...user, email: text })}
            />
            <CustomInput
              label={"Password"}
              value={user.password}
              onChangeText={text => setUser({ ...user, password: text })}
            />

            <TouchableOpacity style={{ width: "100%", backgroundColor: "#1A0B42", height: 60, borderRadius: 15, justifyContent: "center", alignItems: "center", marginTop: 20 }}
              onPress={handleRegister}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("Login")}
            ><Text style={{ textAlign: "center", color: "#1A0B42", fontWeight: "600" }}>Login</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
})