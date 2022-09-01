import React, {useState} from 'react';
import Select from "react-select";

function DropdownRenderer(props) {
    console.log(props,"props")
    const[value, setValue] = useState(props.value);
    const[options, setOptions] = useState([]);

    const onOptionChange = (event) => {
        if(props.onOptionChangeGrouping !== undefined){
            props.onOptionChangeGrouping(event);
        }
        props.onOptionChange(event.target.value);
        setValue(event.target.value);
    }
    return(
        <div>
            {props.groupingFilterOptions===undefined?
            <select value={value} onChange={onOptionChange}>
            <option value={props.options[0]}> {props.options[0]} </option>
            <option value={props.options[1]}> {props.options[1]} </option>
            <option value={props.options[2]}> {props.options[2]} </option>
            <option value={props.options[3]}> {props.options[3]} </option>
            <option value={props.options[4]}> {props.options[4]} </option>
            </select> : 

            <select value={value} onChange={onOptionChange}>
            <option value={props.groupingFilterOptions[0]}> {props.groupingFilterOptions[0]} </option>
            <option value={props.groupingFilterOptions[1]}> {props.groupingFilterOptions[1]} </option>
            <option value={props.groupingFilterOptions[2]}> {props.groupingFilterOptions[2]} </option>
            <option value={props.groupingFilterOptions[3]}> {props.groupingFilterOptions[3]} </option>
            <option value={props.groupingFilterOptions[4]}> {props.groupingFilterOptions[4]} </option>
            </select>
        }
            {/* <select value={value} onChange={onOptionChange}>
                <option value={props.options[0]}> {props.options[0]} </option>
                <option value={props.options[1]}> {props.options[1]} </option>
                <option value={props.options[2]}> {props.options[2]} </option>
                <option value={props.options[3]}> {props.options[3]} </option>
                <option value={props.options[4]}> {props.options[4]} </option>
            </select> */}
            {/* <Select
                options={options}
            /> */}
        </div>
    )
}

export default DropdownRenderer;