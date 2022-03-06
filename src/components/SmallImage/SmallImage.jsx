import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";

function SmallImage(props) {
    return <div key={props.imageKey} className="small-image-container"><img className={"small-image " + props.key}
                                                                            src={props.Image} alt={props.Alternative}/>
    </div>;
}

export default SmallImage;