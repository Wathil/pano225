import React from "react";
import Facebookpng from "./pngs/Facebookpng";

const Facebook = (props) => ( // 
    <div className="facebook">
        <a href={`https://facebook.com/${props.facebook}`}><Facebookpng /> {props.facebook}</a>
    </div>
);

export default Facebook;