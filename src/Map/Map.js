import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import Draw from 'ol/interaction/Draw';
import { toLonLat } from 'ol/proj';

import { connect } from 'react-redux';
import { setCoordinate } from '../ActionCreators';

const Map = (props) => {
	console.log("inside map")
	console.log(props)

	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const { zoom, center } = props
	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: [],
			...new Draw({
				type: "Circle",
			})
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);

		mapObject.on('click', (e) => {
			console.log("clicked!")
			console.log(toLonLat(e.coordinate));
			mapObject.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
				console.log(feature.values_)
				props.setSelection(feature.values_)
				props.onClick(e)
			})
		})

		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{props.children}
			</div>
		</MapContext.Provider>
	)
}


const mapDispatchToProps = (dispatch) => ({
	setSelection: (data) => {
		dispatch(setCoordinate(data));
	}
});


export default connect(null, mapDispatchToProps)(Map);