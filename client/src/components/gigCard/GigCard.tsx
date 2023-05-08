import React from "react";
import { Link } from "react-router-dom";
import { gigs } from "../../data";
import "./GigCard.scss";

interface Gig {
  id: number;
  img: string;
  pp: string;
  desc: string;
  price: number;
  star: number;
  username: string;
}

const GigCard = ({ gig }: { gig: Gig }) => {
  return (
    <Link to={"/gig/123"} className="link">
      <div className="gigCard">
        <img src={gig.img} alt="" />

        <div className="info">
          <div className="user">
            <img src={gig.pp} alt="" />
            <span>{gig.username}</span>
          </div>
          <p>{gig.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{gig.star}</span>
          </div>
        </div>

        <hr />

        <div className="details">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {gig.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
