import React, { useState } from 'react';
import { GigCard } from '../../components';
import { gigs } from '../../data';
import "./Gigs.scss";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  }
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">TENERR {`>`} GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>Explore the boundaries of art and technology with Tenerr's AI artists</p>
        <div className="menu">
          <div className="left">
            <span>Budget:</span>
            <input type="text" placeholder="min" name="" id="" />
            <input type="text" placeholder="max" name="" id="" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="./img/down.png" onClick={() => setOpen(!open)} alt="" />
            {open && <div className="rightMenu">
              {sort === "sales" ? (<span onClick={() => reSort("createdAt")}>Newest</span>) : (<span onClick={() => reSort("sales")}>Best Selling</span>) }
            </div>}
          </div>
        </div>

        <div className="cards">
          {gigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs;