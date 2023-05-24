/**
 * Defining second interfaces to avoid the undefined problem caused by adding ?
 * to interface properties. When creating, some properties are not required, but
 * are present when were fetching them. So different interfaces help solve this discrepancy.
 */

// Check gig model for more info. only features & images have required: false and no default value. Hence can be undefined.
/**
 * Interface for fetching a Gig from API. Different from interface creating a gig.
 */
export interface Gig {
  title: string;
  desc: string;
  totalStars: number;
  starNumber: number;
  cat: string;
  price: string;
  cover: string;
  images?: string[];
  shortTitle: string;
  shortDesc: string;
  deliveryTime: number;
  revisionNumber: number;
  features?: string[];
  sales: number;
  userId: string;
  gigId: string;
};

/**
 * Interface for fetching a Review from API. Could just write one review interface and use partials though.
 */
export interface Review {
  _id: string;
  userId: string;
  gigId: string;
  star: number;
  desc: string;
}

/**
 * Interface for orders.
 */
export interface Order {
  _id: string
  gigId: string;
  img: string;
  title: string;
  price: string;
  payment_intent: string;
  sellerId: string;
  buyerId: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for conversations.
 */
export interface Conversation {
  _id: string;
  convoId: string;
  sellerId: string;
  buyerId: string;
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage: string;
}