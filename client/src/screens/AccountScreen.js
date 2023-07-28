import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../contexts/AuthContext";

export default function AccountScreen() {
    const { signout } = useContext(AuthContext);
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1,
            }}
        >
            <Text h3>Account Screen</Text>
            <Spacer>
                <Button title="Sign Out" onPress={signout} />
            </Spacer>
        </View>
    );
}
