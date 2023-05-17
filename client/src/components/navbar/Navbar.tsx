import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCurrentUser, logout, resetState } from '../../redux/user/userSlice';
import { Link, useLocation } from "react-router-dom";

import mint from "../../assets/mint.png";
import "./Navbar.scss";

const Navbar = () => {
  const [ active, setActive ] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  // getCurrentUser only once on page load
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  
  const { currentUser } = useAppSelector((state) => state.user);
  console.log(currentUser);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
  
    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(resetState());
    console.log("I don morove all :)")
  };
  
  return (
    // if we scroll or currentpath !== homepage use navbar active (i.e white background)
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}> 
      <div className="container">
        <div className="logo">
          <Link to={"/"} className="link">
          <span className="text">tenerr</span>
          </Link>
          <span className="point">.</span>
        </div>
        <div className="links">
          <span>Tenerr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && (<Link to={"/login"} className="link">
          <span>Sign In</span>
          </Link>)}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (<Link to={"/register"}><button>Join</button></Link>)}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              {/* <img src={"/img/default.jpg"} alt="" /> */}
              <img src={currentUser?.img || "/img/default.png"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to={"/gigs"} className="link">Gigs</Link>
                      <Link to={"/add"} className="link">Add New Gig</Link>
                    </>
                  )}
                  <Link to={"/orders"} className="link">Orders</Link>
                  <Link to={"/messages"} className="link">Messages</Link>
                  <p onClick={handleLogout} >Logout</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to={"/"}>
              Graphics & Design
            </Link>
            <Link className="link" to={"/"}>
              Video & Animation
            </Link>
            <Link className="link" to={"/"}>
              Writing & Translation
            </Link>
            <Link className="link" to={"/"}>
              AI Services
            </Link>
            <Link className="link" to={"/"}>
              Digital Marketing
            </Link>
            <Link className="link" to={"/"}>
              Music & Audio
            </Link>
            <Link className="link" to={"/"}>
              Programming & Tech
            </Link>
            <Link className="link" to={"/"}>
              Business
            </Link>
            <Link className="link" to={"/"}>
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;