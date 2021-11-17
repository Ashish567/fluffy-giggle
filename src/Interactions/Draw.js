import 'ol/ol.css';
import Draw, {
    createBox,
    createRegularPolygon,
} from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Polygon from 'ol/geom/Polygon';
import View from 'ol/View';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';





// const typeSelect = document.getElementById('type');

export default function addInteraction(source) {
    draw = new Draw({
        source: source,
        type: 'Circle'
    });
}


/**
 * Handle change event.
 */





