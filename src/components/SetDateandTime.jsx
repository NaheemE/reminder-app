import { StyleSheet, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import RNDateTimePicker from "@react-native-community/datetimepicker";


export default function SetDateandTime({reminder,setReminder}) {
  const [visible1, setVisible1] =useState(false);
  const [visible2, setVisible2] =useState(false);


  const showModal1 = () => setVisible1(true);
  const hideModal1 = () => setVisible1(false);
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);
  const containerStyle = {backgroundColor: 'white'};

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setReminder({...reminder,dateandtime:selectedDate});
      hideModal1();
      hideModal2();
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal visible={visible1} onDismiss={hideModal1} contentContainerStyle={containerStyle}>
        <RNDateTimePicker
        value={reminder.dateandtime}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      /></Modal>
      <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
        <RNDateTimePicker
        value={reminder.dateandtime}
        mode={"time"}
        onChange={onChange}
      /></Modal>
      </Portal>
      <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"100%"}}>
          <Button style={{marginTop: 30,backgroundColor:"#1A0B42"}} onPress={showModal1}>
            <Text style={{color:"white"}}>Set date</Text>
          </Button>
          <Button style={{marginTop: 30,backgroundColor:"#1A0B42"}} onPress={showModal2}>
          <Text style={{color:"white"}}>Set time</Text>
          </Button>
      </View>
      <Text style={{color:"black",fontSize:20,marginTop:15,fontWeight:"500"}}>{reminder.dateandtime.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});