import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Reviews, Slide } from '../../components';
import { useFetchGigQuery } from '../../redux/query/fetchGigs';
import { useFetchUserQuery } from '../../redux/query/fetchUser';
import "./Gig.scss";

const Gig = () => {
  const [skip, setSkip] = useState(false);
  const { id } = useParams();
  console.log(id);
  const { data: gig, isFetching: isFetchingGig, error: gigError, isSuccess } = useFetchGigQuery(id!);

  const { data: user, isFetching: isFetchingUser, error: userError } = useFetchUserQuery(isSuccess ? gig?.userId : skipToken);

  console.log(skip);
  // E dey muzz me. E dey work but i don forget why.
  useEffect(() => {
    if(gig) {
      setSkip((prev) => !prev);
      console.log(skip);
    }
  }, []);

  console.log(gig);
  console.log(user);

  return (
    <div className="gig">
      {isFetchingGig ? (
        "Loading"
      ) : gigError ? (
        "Something went wrong :("
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadCrumbs">
              TENERR {`>`} {gig?.cat.toUpperCase()} {`>`}
            </span>
            <h1>{gig?.title}</h1>
            {isFetchingUser ? "Loading" : userError ? "Something went wrong :(" : (<div className="user">
              <img
                className="pp"
                src={user?.img || "/img/default.jpg"}
                alt=""
              />
              <span>{user?.username}</span>
              {!isNaN(gig?.totalStars! / gig?.starNumber!) && (
                <div className="stars">
                  {Array.from(
                    { length: Math.round(gig?.totalStars! / gig?.starNumber!) },
                    (item, i) => (
                      <img src="/img/star.png" key={i} />
                    )
                  )}
                  <span>{Math.round(gig?.totalStars! / gig?.starNumber!)}</span>
                </div>
              )}
            </div>)}
            <Slide slidesToShow={1} width={"600px"}>
              <div className="slider">
                {gig?.images?.map((img) => (
                  <img
                    className="number-slide keen-slider__slide"
                    src={img}
                    key={img}
                  />
                ))}
              </div>
            </Slide>
            <h2>About This Gig</h2>
            <p>{gig?.desc}</p>
            {isFetchingUser ? "Loading" : userError ? "Something went wrong :(" : (
              <div className="seller">
                <h2>About The seller</h2>
                <div className="user">
                  <img
                    src={user?.img || "/img/default.jpg"}
                    alt=""
                  />
                  <div className="info">
                    <span>{user?.username}</span>
                    {!isNaN(gig?.totalStars! / gig?.starNumber!) && (
                      <div className="stars">
                        {Array.from({ length: Math.round(gig?.totalStars! / gig?.starNumber!) }, (item, i) => (
                            <img src="/img/star.png" key={i} />
                          )
                        )}
                        <span>{Math.round(gig?.totalStars! / gig?.starNumber!)}</span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{user?.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {user?.desc}
                  </p>
                </div>
              </div>
            )}
            {id && <Reviews gigId={id} />}
          </div>
          <div className="right">
            <div className="price">
              <h3>{gig?.shortTitle}</h3>
              <h2>$ {gig?.price}</h2>
            </div>
            <p>{gig?.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{gig?.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{gig?.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {gig?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
              {/* <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design</span>
            </div> */}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;