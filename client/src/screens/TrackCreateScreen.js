import React, { useCallback, useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

// import "../_mockLocation";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { Context as LocationContext } from "../contexts/LocationContext";
import useLocation from "../hooks/useLocation";

export default function TrackCreateScreen() {
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const {
        state: { recording },
        addLocation,
    } = useContext(LocationContext);

    const callback = useCallback(
        (location) => {
            addLocation(location, recording);
        },
        [recording]
    );

    const [err] = useLocation(isFocused || recording, callback);

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingHorizontal: 10,
                flex: 1,
            }}
        >
            <Text h3>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </View>
    );
}
