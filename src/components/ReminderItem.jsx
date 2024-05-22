import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import FAIcons from 'react-native-vector-icons/FontAwesome6';
import { reminderContext } from '../../context/COntextSHare';

export default function ReminderItem({item,navigation}) {
  const {reminder,setReminder}=useContext(reminderContext)
  const [visible, setVisible] = React.useState(false);


  const showModal = () => {
    setReminder(item)
    setVisible(true);
  }
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    minHeight: 150,
    justifyContent: 'space-between',
  };
  let [date, time] = item.dateandtime.split(',').map(part => part.trim());
  let [timePart, period] = time.split(' ');
  let [hours, minutes] = timePart.split(':');
  let formattedTime = `${hours}:${minutes} ${period}`;

  const deleteReminder = () => {};

  return (
    <>
      <Portal>
        {visible && <View style={styles.overlay} />}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View>
            <View>
              <Text style={{color: '#220A5E', fontSize: 22, fontWeight: '500'}}>
                {item.title}
              </Text>
              <Text style={{marginTop: 10, fontSize: 16}}>
                {item.description}
              </Text>
            </View>

            <View
              style={{
                marginTop: 30,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2196F3',
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={()=>{
                  navigation.navigate("Edit")
                  hideModal()
                }}
                
                >
                <FAIcons style={{color: 'white', fontSize: 20}} name="edit" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={deleteReminder}
                >
                <FAIcons style={{color: 'white', fontSize: 20}} name="trash" />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: 'black'}}>{formattedTime}</Text>
            </View>
          </View>
        </Modal>
      </Portal>
      <TouchableWithoutFeedback onPress={showModal} onS>
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: '#512CAF',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            marginTop: 20,
            elevation: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 10,
                borderRadius: 10,
                backgroundColor:
                  item.priority == 'low'
                    ? '#2196F3'
                    : item.priority == 'medium'
                    ? 'orange'
                    : 'red',
                height: 10,
                marginTop: 5,
              }}></View>
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                {item.title}
              </Text>
              <Text style={{color: 'black'}}>{item.description}</Text>
            </View>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
              {formattedTime.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
  },
});
