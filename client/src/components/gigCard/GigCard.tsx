import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { User, findUser } from '../../redux/user/userSlice';
import { useFetchUserQuery } from "../../redux/query/fetchUser";
import { Gig } from "../../utils/types";
import "./GigCard.scss";

const GigCard = ({ gig }: { gig: Gig }) => {
  const dispatch = useAppDispatch();
  // const [user, setUser] = useState<User>();
  const { data: user, isFetching, error } = useFetchUserQuery(gig.userId);

  // console.log(gig);
  // console.log(data);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     if (gig.userId) {
  //       const response = await dispatch(findUser(gig.userId));
  //       // console.log(response.payload);
  //       setUser(response.payload);
  //     }
  //   };
  //   fetchdata();
  // }, []);

  return (
    <Link to={`/gig/${gig.gigId}`} className="link">
      <div className="gigCard">
        <img src={gig.cover} alt="" />

        <div className="info">
          {user && (
            <div className="user">
              <img src={user?.img || "/img/default.jpg"} alt="" />
              <span>{user.username}</span>
            </div>
          )}
          <p>{gig.shortDesc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{!isNaN(gig.totalStars! / gig.starNumber!) && Math.round(gig.totalStars! / gig.starNumber!)}</span>
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
