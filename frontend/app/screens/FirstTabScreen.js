import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



export default function FirstTabScreen({navigation}) {

  return (

     <View style={styles.container}>
      <Image source={require('../assets/auto.png')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Nearest Shop List')} >
        <Text style={styles.buttonText}>Get Nearby Shop  <Entypo name="location-pin" size={16} color="white" /></Text>
      </TouchableOpacity>
    </View>

      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#E0E0E0',
    backgroundColor: colors.primary,
  },
  image: {
    marginTop: -150,
    width: 500,
    height: 500,
    borderBottomRightRadius: 300,
    
  },
  button: {
    backgroundColor: '#445069',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 100,
    width: '60%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});