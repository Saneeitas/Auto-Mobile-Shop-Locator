import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from "axios"
import colors from '../config/colors';
import { Entypo } from '@expo/vector-icons';

export default function SecondTabScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shops, setShops] = useState([]);
  const [shopslist, setShopslist] = useState([]);
  const [nearestShop, setNearestShop] = useState(null);

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

    })();
  }, []);

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    if (shopslist.length > 0 && location) {
      // Sort the shops by distance from the user's current location
      shopslist.sort((a, b) => {
        const aDistance = calculateDistance(location.latitude, location.longitude, a.coordinates.latitude, a.coordinates.longitude);
        const bDistance = calculateDistance(location.latitude, location.longitude, b.coordinates.latitude, b.coordinates.longitude);
        return aDistance - bDistance;
      });

      setShops(shopslist);

      // Find the nearest  to the user's current location
      let nearestDistance = Infinity;
      let nearestShop = null;
      shopslist.forEach(shop => {
        const distance = calculateDistance(location.latitude, location.longitude, shop.coordinates.latitude, shop.coordinates.longitude);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestShop = shop.name;
        }
      });

      setNearestShop(nearestShop);
    }
  }, [shopslist, location]);

  const getShops = () => {
    axios.get('http://192.168.245.23:3000/api/find')
      .then(function (response) {
        // handle success
        setShopslist(response.data)
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        setErrorMsg('Failed to fetch shops data. Please try again later.');
      });
  }

  if (errorMsg) {
    return <Text >{errorMsg}</Text>
  } else if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  } else if (isLoading) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  } else {
    return (
      <View style={ styles.container }>
        <FlatList
          data={shops}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={ styles.shop }>
              <TouchableOpacity onPress={ () => navigation.navigate("Shop Map", {
                userId: item._id,
              }) }>
                <Text style={ styles.name }>{ item.name }</Text>
                <View style={styles.infoRow}>
                <Text style={styles.distance}>
                  {calculateDistance(location.latitude, location.longitude, item.coordinates.latitude, item.coordinates.longitude)} km,
                </Text>
                <Text style={styles.address}>  <Entypo name="location-pin" size={12} color="black" />{item.address}</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

// Haversine formula to calculate distance
 function calculateDistance(lat1, lon1, lat2, lon2) {
   const R = 6371; // Radius of the earth in km
   const dLat = deg2rad(lat2 - lat1);   //deg2rad below
   const dLon = deg2rad(lon2 - lon1);
   const a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
     Math.sin(dLon / 2) * Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   const d = R * c;  //Distance in km
   return d.toFixed(2);
 }

 function deg2rad(deg) {
   return deg * (Math.PI/180)
 }


const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  shop: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 6,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    maxHeight: 200,
    overflow: 'scroll',
    backgroundColor: '#f5f5f5',
  },
  name: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    color: colors.secondary,
    fontSize: 14,
    
  },
  distance: {
    color: "black",
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
