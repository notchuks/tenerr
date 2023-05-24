import React from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useFetchUserQuery } from "../../redux/query/fetchUser";
import { Review } from "../../utils/types";
import "./Review.scss";

const Review = ({ review }: { review: Review }) => {
  const { data: user, error, isFetching } = useFetchUserQuery(review ? review?.userId : skipToken);
  return (
    <>
      <div className="review">
        {isFetching ? "Loading" : error ? "Something went wrong :(" : (<div className="user">
          <img
            className="pp"
            src={user?.img || "/img/default.jpg"}
            alt=""
          />
          <div className="info">
            <span>{user?.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{user?.country}</span>
            </div>
          </div>
        </div>)}
        <div className="stars">
          {Array.from({ length: review.star }, (item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
          <span>{review?.star}</span>
        </div>
        <p>{review?.desc}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
      </div>
      <hr className="hr" />
    </>
  );
};

export default Review;
