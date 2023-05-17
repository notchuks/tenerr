import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { User, findUser } from '../../redux/user/userSlice';
import { Gig } from "../../redux/gigs/gigSlice"
import { gigs } from "../../data";
import "./GigCard.scss";

// interface Gig {
//   id: number;
//   img: string;
//   pp: string;
//   desc: string;
//   price: number;
//   star: number;
//   username: string;
// }

const GigCard = ({ gig }: { gig: Gig }) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();
  const { gigs: foo } = useAppSelector((state) => state.gigs);

  // console.log(gig);

  useEffect(() => {
    const fetchdata = async () => {
      if (gig.userId) {
        const response = await dispatch(findUser(gig.userId));
        // console.log(response.payload);
        setUser(response.payload);
      }
    };
    fetchdata();
  }, []);

  return (
    <Link to={"/gig/123"} className="link">
      <div className="gigCard">
        <img src={gig.cover} alt="" />

        <div className="info">
          {user && (
            <div className="user">
              <img src={user?.img} alt="" />
              <span>{user.username}</span>
            </div>
          )}
          <p>{gig.shortDesc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{gig.totalStars}</span>
          </div>
        </div>

        <hr />

        <div className="details">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {gig.price.toString()}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
