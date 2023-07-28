import React, { useContext } from "react";
import { Button, Input } from "react-native-elements";

import { Context as LocationContext } from "../contexts/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

import Spacer from "./Spacer";

export default function TrackForm() {
    const {
        state: { name, recording, locations },
        changeName,
        startRecording,
        stopRecording,
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <>
            <Spacer>
                <Input
                    value={name}
                    placeholder="Enter name"
                    onChangeText={changeName}
                />
            </Spacer>
            <Spacer>
                {recording ? (
                    <Button title="Stop Recording" onPress={stopRecording} />
                ) : (
                    <Button title="Start Recording" onPress={startRecording} />
                )}
            </Spacer>
            <Spacer>
                {!recording && locations.length ? (
                    <Button title="Save Recording" onPress={saveTrack} />
                ) : null}
            </Spacer>
        </>
    );
}
