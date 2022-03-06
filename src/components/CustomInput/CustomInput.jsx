import React, { useState, useEffect } from 'react';

import { FormControl } from "react-bootstrap";
import { MdEuroSymbol } from "react-icons/md";



function CustomInput(props) {


    const [data, setData] = useState(props.data);
    const [shouldRefresh, setShoulRefresh] = useState(true);


    const changedData = (e) => {
        if (e.target.name == 'given-ammount' || e.target.name == 'card-given-ammount') {
            props.moneychange(e.target.value, e.target.name)
            return
        }
        else if (e.target.name == "invoice-date") {
            props.selectedDate(e.target.value)
            return;
        }
        // props.handleInput(data);
        props.handleInput(e.target.name, e.target.value)

    }

    const focused = (e) => {
        if (e.target.name == "invoice-date") return;
        props.handleFocus(e, true);
    }

    const keyup = (e) => {
        if (e.key === 'Escape') {
            props.handleEscape(e);
        }
    }
    const classNameExtra = props.data.euroReq ? "flex align-center" : "";
    // console.log(data);
    return (

        <div className={`ml-5-px ` + classNameExtra}>
            <FormControl
                autoComplete={props.autoComp ? "" : "off"}
                onKeyUp={e => keyup(e)}
                onFocus={e => focused(e)}
                onChange={e => changedData(e)}
                name={props.data.inputName}
                // value={data.value == "" ? "" : props.data.value}
                className={props.data.inputClass}
                type={props.data.type}
                placeholder={props.data.placeholder}
                disabled={props.data.disabled}
                value={props.data.value}
                min={props.data.inputName == 'given-ammount' ? "0" : props.data.value}
            />
            {props.data.euroReq ? <MdEuroSymbol /> : ""}
        </div>
    );

}

export default CustomInput;