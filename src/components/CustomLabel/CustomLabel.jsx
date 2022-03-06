import React from 'react';
import { ControlLabel } from "react-bootstrap";

const CustomLabel = (props) => {
    return (
        <ControlLabel className={props.data.class}>{props.data.text} </ControlLabel>
    );
};

export default CustomLabel;