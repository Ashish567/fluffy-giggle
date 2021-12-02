import { SELECT_CITY } from './Actions';
import { SELECT_COORD } from './Actions';


export const getSelection = (data) => {
    console.log("city selected");
    console.log(data);

    return {
        type: SELECT_CITY,
        data,
    };
};

export const setCoordinate = (data) => {
    console.log("city selected");
    console.log(data);

    return {
        type: SELECT_COORD,
        data,
    };
};