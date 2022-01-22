import React from "react";
import "./style.css";
import Facebook from "./sn/Facebook";
import Whatsapp from "./sn/Whatsapp";
import Instagram from "./sn/Instagram";
import Twitter from "./sn/Twitter";
import Phone from "./sn/Phone";

export function Article(props) {
  return (
    <article className="articleContainer" ref={props.reference}>
      <div className="cardContainer">
        <div className="card">
          <h2 className="top-info">
            <button className="button-artiste-info" onClick={(e) => props.setArtisteFromCard(props.article.artiste)}>{props.article.artiste}</button>
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
          <div
            className="image"
            style={{ backgroundImage: `url(${props.article.url})` }}
          ></div>
          <div className="bottom-info">
            <div className="bottom-info-hover-left">
              <button className="button-zone-info" onClick={(e) => props.setZoneFromCard(props.article.zone)}>{props.article.zone}</button>
            </div>
            <div className="bottom-info-hover-right">
              <button className="button-musique-info" onClick={(e) => props.setMusiqueFromCard(props.article.musique)}>{props.article.musique}</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
