import { SELECT_CITY } from './Actions';

const initialState = {
    selected: [12679199, '6F81D1A9-EE64-4736-B9E0-046692BA6A5F', 12679199, 1452914410,
        '400501', 1510573327, '400501', null, '150861067', 'WARRANTS', 'WARRANT ARREST',
        'Saturday', '2017-10-28T00:00:00', '13:23', 'SOUTHERN', 'ARREST, BOOKED', '0 Block of GRACE ST',
        '-122.41465041992562', '37.77501964528436', Array(5), '15086106763010']
};
function reducer(state = initialState, action) {
    console.log("reducer called")
    console.log(action)
    switch (action.type) {

        case SELECT_CITY:
            return {
                ...state,
                selected: action.data
            }

        default:
            return state;
    }

}
export default reducer;
