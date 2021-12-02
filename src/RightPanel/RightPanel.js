import React from 'react'
import * as data from '../Data/incidentsData.json';
// import FolderIcon from '@material-ui/core/icons-material/Folder';
import LocationCity from '@material-ui/icons/LocationCity';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { connect } from 'react-redux';
import { getSelection } from '../ActionCreators';




const listItemsObj = {}



function RightPanel(props) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [mapData, setmapData] = React.useState({});


    console.log("heelo from right panel");
    console.log(props);
    console.log("breaks..")

    function getDetail(e) {
        // console.log(e.target.innerHTML.trim())
        // console.log(listItemsObj[e.target.innerHTML.trim()])
        console.log("using hooks")
        // console.log(listItemsObj)
        // setmapData(listItemsObj[e.target.innerHTML.trim()])
        // console.log(setmapData(listItemsObj[e.target.innerHTML.trim()]))
        // console.log(props)
        // props.updateState(listItemsObj[e.target.innerHTML.trim()]);
        props.setSelection(listItemsObj[e.target.innerHTML.trim()])

    }

    const listItems = []

    data.data.slice(1, 15).map((d, index) => {
        listItems.push(<li onClick={(e) => getDetail(e)} key={d[16].trim()} value={d[16].trim()}>{d[16]}</li>)
        listItemsObj[d[16].trim()] = d;
    });


    console.log(listItems)
    return (
        <div>
            <ul dense={dense}>
                {
                    listItems
                }
            </ul >
            {mapData.toString()}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        selected: state.selected
    };
}
// const mapDispatchToProps = dispatch => ({
//     dispatch // ← Add this
// })


const mapDispatchToProps = (dispatch) => ({
    setSelection: (data) => {
        dispatch(getSelection(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
