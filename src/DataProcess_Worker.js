import * as data from './Data/incidentsData.json';
import { fromLonLat } from 'ol/proj';


console.log("converting")
const DataProcess_Worker = function () {
    const geoJSON = {
        "type": "FeatureCollection",
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857',
            },
        },
        "features": []
    }
    data.data.forEach((element, index) => {

        // if (index < 50) {
        console.log(element[18])
        console.log(element[17])
        console.log(fromLonLat([element[17], element[18]]))
        geoJSON["features"].push({
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": fromLonLat([element[17], element[18]]) },
            "properties": {
                "uid": element[0],
                "incident_name": element[14],
                "category": element[9],
                "sub-category": element[10],
                "date": element[12],
                "time": element[13],
                "action-taken": element[15],
                "address": element[16]
            }
        });
        // }
    });
    return geoJSON;
}


export default DataProcess_Worker;
