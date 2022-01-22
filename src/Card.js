import React from "react";
import "./style.css";
import Facebook from "./sn/Facebook";
import Whatsapp from "./sn/Whatsapp";
import Instagram from "./sn/Instagram";
import Twitter from "./sn/Twitter";
import Phone from "./sn/Phone";

export function Card(props) {
  return (
    <>
      <div className="cardContainer">
        <div className="card">
          <h2 className="top-info">
            <a className="pano225-link article-link" href="#" onClick={(e) => props.setArtisteFromCard(props.article.artiste)}>
              {props.article.artiste}
            </a>
          </h2>
          <div className="pad_image">
            <p>{props.article.lieu}</p>
            {props.article.tel && <Phone tel={props.article.tel} />}
            {props.article.tel2 && <Phone tel={props.article.tel2} />}
            {props.article.whatsapp && (
              <Whatsapp whatsapp={props.article.whatsapp} />
            )}
            {props.article.instagram && (
              <Instagram instagram={props.article.instagram} />
            )}
            {props.article.twitter && (
              <Twitter twitter={props.article.twitter} />
            )}
            {props.article.facebook && (
              <Facebook facebook={props.article.facebook} />
            )}
          </div>
          <div className="image"
            style={{ backgroundImage: `url(${props.article.url})` }}
          ></div>
          <div className="bottom-info">
            <div className="bottom-info-hover-left">
              <a className="pano225-link zone-link" href="#" onClick={(e) => props.setZoneFromCard(props.article.zone)}>
                {props.article.zone}
              </a>
            </div>
            <div className="bottom-info-hover-right">
              <a className="pano225-link musique-link" href="#" onClick={(e) => props.setMusiqueFromCard(props.article.musique)}>
                {props.article.musique}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline"></div>
    </>
  );
}
