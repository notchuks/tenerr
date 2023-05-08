import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCurrentUser } from '../../redux/user/userSlice';
import { Featured, Slide, TrustedBy, CatCard, ProjectCard } from '../../components';
import { cards, projects } from "../../data";
import "./Home.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  
  // getCurrentUser only once on page load
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  
  const { currentUser } = useAppSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <div className="contain">
        <Slide slidesToShow={4} width={"80%"} >
          {cards.map((card) => (
            <div className={`number-slide slide keen-slider__slide`} key={card?.id}>
              <CatCard item={card} />
            </div>
          ))}
        </Slide>
      </div>

      <section className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high-quality prices at every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high-quality prices at every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high-quality prices at every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high-quality prices at every price point. No hourly rates, just project-based pricing.</p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls></video>
          </div>
        </div>
      </section>

      <section className="features dark">
        <div className="container">
          <div className="item">
            <h1>tenerr business</h1>
            <h1>A business solution designed for teams</h1>
            <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore fiverr business</button>
          </div>
          <div className="item">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png" alt="" />
          </div>
        </div>
      </section>

      <div className="contain">
        <Slide slidesToShow={4} width={"80%"}>
          {projects.map((project) => (
            <div className={`number-slide slide keen-slider__slide`} key={project?.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default Home;