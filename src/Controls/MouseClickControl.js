import React, { useContext, useEffect, useState } from "react";
import MousePosition from 'ol/control/MousePosition';
import MapContext from "../Map/MapContext";

const MouseClickControl = () => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let fullScreenControl = new MousePosition({});

        map.controls.push(fullScreenControl);

        return () => map.controls.remove(fullScreenControl);
    }, [map]);

    return null;
};

export default MouseClickControl;