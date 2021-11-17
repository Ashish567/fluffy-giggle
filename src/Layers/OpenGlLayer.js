import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import WebGLPointsLayer from 'ol/layer/WebGLPoints';

const OpenGlLayer = ({ source, style, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let vectorLayer = new WebGLPointsLayer({
            source,
            style: {
                symbol: {
                    symbolType: 'circle',
                    size: 14,
                    color: 'rgb(255, 0, 0)',
                    opacity: 0.5,
                },
            }
        });

        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);

    return null;
};

export default OpenGlLayer;