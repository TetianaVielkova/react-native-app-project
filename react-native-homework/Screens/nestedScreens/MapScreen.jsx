import React from "react";
import { View, StyleSheet } from  'react-native';
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({route}) => {
    const { longitude, latitude } = route.params.location.coords;
    
    
    return(
        <View style={styles.container}>
            <MapView  
            style={{ flex: 1 }}
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.006,
            }}>
                <Marker coordinate={{ latitude, longitude }} title={route.params.place}/>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default MapScreen;