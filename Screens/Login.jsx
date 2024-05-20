import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../src/components/CustomInput'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation, route }) => {
  const [user, setUser] = useState({
    email: "", password: ""
  })
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = user
    if (!email || !password) {
      Alert.alert("Please fill the form completely...")
    }
    else {
      setLoading(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('Sign In Successful');
        await AsyncStorage.setItem('firstTimeUser', 'false');
        route.params.handleAsyncStorageChange();
        // navigation.navigate("Home")
        setUser({ email: "", password: "" })
      } catch (error) {
        console.log('Error', error.message);
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
        <View style={{ justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white", marginTop: 50 }}>
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
          <View style={{ width: "100%", marginTop: 30 }}>
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
              onPress={handleLogin}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("Register")}
            ><Text style={{ textAlign: "center", color: "#1A0B42", fontWeight: "600" }}>Sign up</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
})