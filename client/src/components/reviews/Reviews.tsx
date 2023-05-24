import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, coerce, TypeOf } from "zod";
import Review from '../review/Review';
import { useFetchReviewsQuery, useAddReviewMutation } from "../../redux/query/reviews";
import "./Reviews.scss";

const Reviews = ({ gigId }: { gigId: string }) => {
  const [createError, setCreateError] = useState("");
  const { data, isFetching, error } = useFetchReviewsQuery(gigId);

  const createReviewSchema = object({
    desc: string().nonempty({
      message: "description is required",
    }).min(6, "description too short - should be 6 chars minimum"),
    star: coerce.number({
      required_error: "star rating is required"
    }).gte(1, { message: "Star rating must be greater than zero." }),
  });
  
  type CreateReviewInput = TypeOf<typeof createReviewSchema>;

  const { register, formState:{ errors }, handleSubmit } = useForm<CreateReviewInput>({ resolver: zodResolver(createReviewSchema) });
  const [ addReview, { isLoading } ] = useAddReviewMutation();
  console.log(errors);

  const onSubmit = async (values: CreateReviewInput) => {
    console.log(values);
    try {
      const payload = await addReview({...values, gigId }).unwrap();
      console.log("fulfilled", payload);
    } catch (error: any) {
      console.error("error", error);
      setCreateError(error.data);
    }
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {data?.map(review => (
        <Review review={review} key={review?._id} />
      ))}
      <div className="add">
        <h3>Add a review</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Write a review" {...register("desc")} />
          <p className="error">{errors.desc?.message?.toString()}</p>
          <select {...register("star") } defaultValue={0}>
            <option value={0} disabled>Select stars</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <p className="error">{errors.star?.message?.toString()}</p>
          <button type="submit">Send</button>
          {createError && (<p className="error">{createError}</p>)}
        </form>
      </div>
    </div>
  );
}

export default Reviews;