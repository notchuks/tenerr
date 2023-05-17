import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchGigs } from '../../redux/gigs/gigSlice';
import { GigCard } from '../../components';
// import { gigs } from '../../data';
import "./Gigs.scss";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const dispatch = useAppDispatch();
  const { gigs, isFetching, error } = useAppSelector((state) => state.gigs);
  const { search } = useLocation();
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  // get Gigs
  useEffect(() => {
    dispatch(fetchGigs({ search, min, max }));
  }, []);

  let min = minRef.current?.value;
  let max = maxRef.current?.value;

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  }

  const apply = () => {
    console.log(minRef.current?.value);
    console.log(maxRef.current?.value);
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
            <input type="number" placeholder="min" ref={minRef} name="" id="" min={1} />
            <input type="number" placeholder="max" ref={maxRef} name="" id="" min={1} />
            <button onClick={apply}>Apply</button>
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
          {isFetching ? "Loading" : error ? "Something went wrong :(" : gigs && gigs.map(gig => (
            <GigCard key={gig.gigId} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs;