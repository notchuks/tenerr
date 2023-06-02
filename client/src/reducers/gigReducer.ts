import { store } from '../redux/store';
import { Gig } from "../utils/types";

const state = store.getState();
const currentUser = state.user.currentUser;


export const INITIAL_STATE: Partial<Gig> = {
  userId: currentUser?._id,
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

export const gigReducer = (state, action) => {
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
        features: [...state.features, action.payload],
      }
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter((feature) => feature !== action.payload),
      }
    default:
      return state;
  }
}

