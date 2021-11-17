import * as olSource from "ol/source";

function cluster({ distance, minDistance, maxZoom }) {
    return new olSource.Cluster({ url, attributions, maxZoom });
}

export default cluster;