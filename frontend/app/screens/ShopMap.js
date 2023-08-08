import axios from "axios";
axios.default;
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../config/colors';
import { Entypo } from '@expo/vector-icons';

function ShopMap({ route }) {
    const id = route.params.userId;
    // console.log(id)
    const [shopCoordinates, setShopCoordinates] = useState("")

    useEffect(() => {
        getUserById();
    }, [ShopMap]);

    const getUserById = () => {
        axios.get(`http://192.168.245.23:3000/api/find/${id}`)
        .then(function (response) {
            // handle success
            setShopCoordinates(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }

return (
    <View style={ styles.container }> 
           {shopCoordinates && (
            <>
        <MapView
            style={styles.map}
            initialRegion={{
            latitude: shopCoordinates.coordinates.latitude,
            longitude: shopCoordinates.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            >
            <Marker coordinate={shopCoordinates.coordinates} />
        </MapView>
        
        {/* <View style={ styles.OtherContainer }>
            <TouchableOpacity><Text><Entypo name="location" size={16} color="black" />{shopCoordinates.address}</Text></TouchableOpacity>
       </View> */}
        </>
      )}
    </View> 
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary, 
    },
    map: {
        flex: 1,
      },
    OtherContainer: {
        marginTop: 10,
        marginLeft:80
    },
    btn: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 1,
        color: colors.tertiary,
    // Add other desired styles
    },
    
    
})

export default ShopMap;