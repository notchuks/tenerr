import React, { useEffect, useReducer, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
// import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer';
import { store } from '../../redux/store';
import { AddGig } from '../../utils/types';
import { User } from "../../redux/user/userSlice"
import upload from '../../utils/upload';
import "./Add.scss";
import { useCreateGigMutation } from '../../redux/query/fetchGigs';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  if(!currentUser) {
    return null;
  } else {
    return <Pre currentUser={currentUser} />
  }
}

const Pre = ({ currentUser }: { currentUser: User}) => {
  const [cover, setCover] = useState<File>();
  const [images, setImages] = useState<FileList>();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [createGig, { isLoading, error }] = useCreateGigMutation();

  // const { currentUser } = useAppSelector((state) => state.user);
  const userId = currentUser?._id;
  
  // console.log(userId);
  console.log(cover);
  console.log(images);

  const INITIAL_STATE = {
    userId,
    title: "",
    cat: "",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: "",
  };

  type Action =
    | { type: "CHANGE_INPUT", payload: { name: string; value: string | number; } }
    | { type: "ADD_IMAGES", payload: { cover: string; images?: string[]; } }
    | { type: "ADD_FEATURE", payload: string }
    | { type: "REMOVE_FEATURE", payload: string }

  const gigReducer = (state: Partial<AddGig>, action: Action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        }
      case "ADD_IMAGES":
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images,
        }
      case "ADD_FEATURE":
        return {
          ...state,
          features: state.features && [...state?.features, action.payload],
        }
      case "REMOVE_FEATURE":
        return {
          ...state,
          features: state?.features?.filter((feature) => feature !== action.payload),
        }
      default:
        return state;
    }
  }

  // console.log(INITIAL_STATE);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  console.log(state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "price" || e.target.name === "deliveryTime" || e.target.name === "revisionNumber") {
      dispatch({ type: "CHANGE_INPUT", payload: { name: e.target.name, value: parseInt(e.target.value) }, })
    } else {
      dispatch({ type: "CHANGE_INPUT", payload: { name: e.target.name, value: e.target.value }, })
    }
  };

  const handleFeature = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURE", payload: e.currentTarget.features.value });
    e.currentTarget.features.value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      let coverUrl, imagesUrl
      if (cover) {
        coverUrl = await upload(cover);
      };

      if(images) {
        imagesUrl = await Promise.all([...images].map(async (img) => {
          const url = await upload(img);
          return url;
        }));
      };

      setUploading(false);
      console.log(coverUrl, imagesUrl)
      dispatch({ type: "ADD_IMAGES", payload: { cover: coverUrl, images: imagesUrl } })

    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    console.log(state);
    try {
      const payload = await createGig(state).unwrap();
      console.log("fulfilled", payload);
      navigate("/gigs");
    } catch (error: any) {
      console.error("error", error);
    }
  }

  return (
    <div className="add">
      <div className="container">
        <h1>Add new Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" name="title" onChange={handleChange} placeholder="e.g I will do something i'm really good at" />
            <label htmlFor="category">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imageInputs">
                <label htmlFor="">Cover Image</label>
                <input type="file" name="" id="" onChange={e => e.target.files && setCover(e.target.files[0])} />
                <label htmlFor="">Upload Images</label>
                <input type="file" name="" id="" multiple onChange={e => e.target.files && setImages(e.target.files)} />
              </div>
              <button onClick={handleUpload}>{uploading ? "Uploading" : "Upload"}</button>
            </div>
            <label htmlFor="">Description</label>
            <textarea name="desc" onChange={handleChange} id="" cols={30} rows={16} placeholder={"Brief description to introduce your service to your customers"}></textarea>
            <button onClick={handleSubmit} >Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" name="shortTitle" onChange={handleChange} id="" placeholder="e.g. One-page web design" />
            <label htmlFor="">Short Description</label>
            <textarea name="shortDesc" onChange={handleChange} id="" cols={30} rows={10} placeholder="A short description of your service"></textarea>
            <label htmlFor="">Delivery Time(e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} id="" min={1} />
            <label htmlFor="">Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange} id="" min={1} />
            <label htmlFor="features">Add Features</label>
            <form className="features" onSubmit={handleFeature}>
              <input type="text" id="features" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature: string) => (
                <div className="item" key={feature}>
                  <div className="name">{feature}</div>
                  <button onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: feature })} >X</button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} id="" min={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add;