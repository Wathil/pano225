import React from "react";
import Instagrampng from "./pngs/Instagrampng";

const Instagram = (props) => ( // 
    <div className="instagram">
        <a href={`https://www.instagram.com/${props.instagram}`}><Instagrampng /> {props.instagram}</a>
    </div>
);

export default Instagram;