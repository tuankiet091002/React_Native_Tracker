import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";

import { Context as LocationContext } from "../contexts/LocationContext";

export default function Map() {
    const {
        state: { currentLocation, locations },
    } = useContext(LocationContext);

    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    }

    return (
        <MapView
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            region={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            style={styles.map}
        >
            <Circle
                center={currentLocation.coords}
                radius={120}
                strokeColor="rgba(158, 158, 255, 1.0)"
                fillColor="rgba(158, 158, 255, 0.3)"
            />
            <Polyline coordinates={locations.map((loc) => loc.coords)} />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
});
