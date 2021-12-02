import React, { useState, useEffect } from "react";
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


// import Grid from '@mui/material/Grid';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Item from '@material-ui/core/ListItem';

import RightPanel from "./RightPanel/RightPanel";
import { connect } from 'react-redux';

import { setCoordinate } from './ActionCreators';









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
  console.log("function called")
  console.log(e)
  // props.setSelection(listItemsObj[e.target.innerHTML.trim()])
}
// [12679199, '6F81D1A9-EE64-4736-B9E0-046692BA6A5F', 12679199, 1452914410,
//  '400501', 1510573327, '400501', null, '150861067', 'WARRANTS', 'WARRANT ARREST',
//   'Saturday', '2017-10-28T00:00:00', '13:23', 'SOUTHERN', 'ARREST, BOOKED', '0 Block of GRACE ST',
//    '-122.41465041992562', '37.77501964528436', Array(5), '15086106763010']

const App = (props) => {
  console.log("updating lat")
  console.log(props)

  console.log("updated")
  const [center, setCenter] = useState(fromLonLat(['-122.41465041992562', '37.77501964528436']));
  const [zoom, setZoom] = useState(12);



  useEffect(() => {
    // changePanel(data);
    console.log("props changed")
    // setCenter(fromLonLat([props.selected[17], props.selected[18]]))
  }, [props]);
  // setCenter(fromLonLat([props.selected[17], props.selected[18]]))


  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  // const [showMarker, setShowMarker] = useState(false);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));





  console.log("hello props")
  console.log(props.selected)
  return (
    <div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Item>
              <Map center={center} zoom={zoom} draw={new Draw({
                type: "Circle",
              })}
                onClick={(event) => setShowMarker(event)}>
                <Layers>
                  <TileLayer source={osm()} zIndex={0} />

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
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item><RightPanel />{console.log("hello app")}</Item>
            <Item></Item>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("map state 2 props")
  console.log(state)
  return {
    selected: state.selected
  };
}


const mapDispatchToProps = (dispatch) => ({
  setSelection: (data) => {
    dispatch(setCoordinate(data));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
