import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Featured.scss";

const Featured = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/gigs?search=${search}`);
  }
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>Find the perfect <i>freelance</i> services for your business</h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder="Try building mobile app" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
            </div>
            <button onClick={handleSearch} >Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man-otra.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Featured;