import React, { useContext, useEffect } from "react";
import { FlatList,Pressable, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Context as TrackContext } from "../contexts/TrackContext";

export default function TrackListScreen() {
    const navigation = useNavigation();
    const { state, fetchTracks } = useContext(TrackContext);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchTracks();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1,
            }}
        >
            <FlatList
                data={state}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => 
                        <Pressable
                            onPress={() =>
                                navigation.navigate("TrackDetail", {
                                    _id: item._id,
                                })
                            }
                        >
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </Pressable>
                    
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({});
