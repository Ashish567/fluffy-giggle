import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer, OpenGlLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl, MouseClickControl } from "./Controls";
import FeatureStyles from "./Features/Styles";
import Draw from 'ol/interaction/Draw';







import mapConfig from "./config.json";
import "./App.css";

import mapPapp from './MapConfig';
const geojsonObject = mapPapp();
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}
const setShowMarker = (e) => {
  console.log(e)
}
const App = () => {
  const [center, setCenter] = useState(fromLonLat([-122.40913193948903, 37.752796998558445]));
  const [zoom, setZoom] = useState(9);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  // const [showMarker, setShowMarker] = useState(false);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <div>
      <Map center={center} zoom={zoom} draw={new Draw({
        type: "Circle",
      })}
        onClick={(event) => setShowMarker(event)}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />

          {/* {<VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObject, {
                featureProjection: get("EPSG:3857"),
              }),
            })}
          // style={FeatureStyles.Point}
          />} */}

          {<OpenGlLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObject, {
                featureProjection: get("EPSG:3857"),
              }),
            })}
          />}


          {<VectorLayer source={vector({ features })} />}
        </Layers>
        <Controls attribution={true} zoom={true}>
          <FullScreenControl />
          <MouseClickControl />
        </Controls>
      </Map>
    </div>
  );
};

export default App;

{/* <div>
<input
  type="checkbox"
  checked={showLayer1}
  onChange={(event) => setShowLayer1(event.target.checked)}
/>{" "}
Johnson County
</div>
<div>
<input
  type="checkbox"
  checked={showLayer2}
  onChange={(event) => setShowLayer2(event.target.checked)}
/>{" "}
Wyandotte County
</div>
<hr />
<div>
<input
  type="checkbox"
  checked={showMarker}
  onChange={(event) => setShowMarker(event.target.checked)}
/>{" "}
Show markers
</div> */}
