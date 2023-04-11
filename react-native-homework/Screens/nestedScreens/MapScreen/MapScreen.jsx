import React from "react";
import { View, StyleSheet } from  'react-native';
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
    
    return(
        <View style={styles.container}>
            <MapView  
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 46.42622849933442,
                longitude: 12.376753461890907,
                latitudeDelta: 0.001,
                longitudeDelta: 0.006,
            }}>
                <Marker coordinate={{ latitude: 46.42622849933442, longitude: 12.376753461890907 }} title="Photo of the place"/>
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