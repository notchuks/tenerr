import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchGigs } from '../../redux/gigs/gigSlice';
import { useFetchGigsQuery } from '../../redux/query/fetchGigs';
import { GigCard } from '../../components';
// import { gigs } from '../../data';
import "./Gigs.scss";
import { useIsMounted } from '../../utils/isMounted';

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [skip, setSkip] = useState(false);
  // const { gigs, isFetching, error } = useAppSelector((state) => state.gigs);
  const { search: foo } = useLocation(); // rename search from useLocation so it can be used in fetchGigs
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const mounted = useIsMounted();
  // let min: string = "";
  // let max: string = "";
  // console.log(search);
  // console.log(min)
  // console.log(max)
  const { data, error, isLoading, isFetching, refetch } = useFetchGigsQuery({ search: foo.replace("?", ""), min: minRef.current?.value, max: maxRef.current?.value, sort }, { skip: skip });
  

  useEffect(() => {
    setSkip((prev) => !prev);
    console.log(skip);
  }, []);
  

  console.log(skip);
  // console.log(data);
  // console.log(error);
  // console.log(isLoading);

  // get Gigs
  // useEffect(() => {
  //   dispatch(fetchGigs({ search, min: minRef.current?.value, max: maxRef.current?.value, sort }));
  // }, [search]);

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  }

  useEffect(() => {
    refetch
  }, [sort]);
  

  const apply = () => {
    console.log(minRef.current?.value);
    console.log(maxRef.current?.value);
    refetch();
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
          {isFetching ? "Loading" : error ? "Something went wrong :(" : data && data.map(gig => (
            <GigCard key={gig.gigId} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}

// onChange={e => min = e.target.value.toString()}
// onChange={e => max = e.target.value.toString()}

export default Gigs;