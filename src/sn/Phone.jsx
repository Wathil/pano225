import React from "react";
import { formatTel } from "./formatTel";
import Phonepng from "./pngs/Phonepng";

const Phone = (props) => ( // 2250102030405
    <div className="phone">
        <a href={`tel:${props.tel}`}><Phonepng /> {formatTel(props.tel)}</a>
    </div>
);

export default Phone;