import React from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_STATE } from '../../reducers/gigReducer';
import { useAppSelector } from '../../redux/hooks';
import { useDeleteGigMutation, useFetchUserGigsQuery } from '../../redux/query/fetchGigs';
import "./MyGigs.scss";

const MyGigs = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { data: gigs, isLoading, error } = useFetchUserGigsQuery({ userId: currentUser?._id });
  const [deleteGig, { error: deleteError }] = useDeleteGigMutation();
  console.log(gigs);

 const handleDelete = async (gigId: string) => {
  try {
    const payload = await deleteGig(gigId).unwrap();
    console.log("fulfilled", payload);
  } catch (error: any) {
    console.error("error", error);
  }
 }
  return (
    <div className="myGigs">
      {isLoading ? "Loading..." : error ? "Something went wrong :(" : (<div className="container">
        <div className="title">
          <h2>Gigs</h2>
          <Link to={"/add"} className="link">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {gigs?.map(gig => (<tr key={gig._id}>
            <td>
              <img className="image" src={gig.cover} alt="" />
            </td>
            <td>{gig.shortTitle}</td>
            <td>{gig.price}</td>
            <td>{gig.sales}</td>
            <td>
              <img className="delete" onClick={() => handleDelete(gig.gigId)} src="/img/delete.png" alt="" />
            </td>
          </tr>))}
        </table>
      </div>)}
    </div>
  )
}

export default MyGigs;