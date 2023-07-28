import { useContext } from "react";

import { Context as LocationContext } from "../contexts/LocationContext";
import { Context as TrackContext } from "../contexts/TrackContext";
import { navigate } from "../navigationRef";

export default function useSaveTrack() {
    const { createTrack } = useContext(TrackContext);
    const {
        state: { name, locations },
        reset,
    } = useContext(LocationContext);

    const saveTrack = async () => {
        await createTrack(name, locations);
        reset();
        navigate("TrackList");
    };

    return [saveTrack];
}
