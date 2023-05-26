import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, coerce, TypeOf } from "zod";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useCreateMessageMutation, useFetchMessagesQuery } from "../../redux/query/messages";
import "./Conversation.scss";

const Conversation = () => {
  const [createError, setCreateError] = useState("");
  const { currentUser } = useAppSelector((state) => state.user);
  const { convoId } = useParams();
  const { data: messages, error, isFetching, isLoading } = useFetchMessagesQuery(convoId ? convoId : skipToken);
  const [ createMessage, { isLoading: isCreatingMessage } ] = useCreateMessageMutation();
  console.log(messages);

  const createMessageSchema = object({
    desc: string().nonempty({
      message: "message input is required",
    }),
  });
  
  type CreateMessageInput = TypeOf<typeof createMessageSchema>;

  const { register, formState:{ errors }, handleSubmit } = useForm<CreateMessageInput>({ resolver: zodResolver(createMessageSchema) });
  console.log(errors);

  const onSubmit = async (values: CreateMessageInput) => {
    console.log(values);
    try {
      const payload = await createMessage({...values, convoId }).unwrap();
      console.log("fulfilled", payload);
    } catch (error: any) {
      console.error("error", error);
      setCreateError(error.data);
    }
  };

  return (
    <div className="conversation">
      <div className="container">
        <span className="breadCrumbs">
          <Link to={"/messages"} className="link">
            MESSAGES
          </Link>{" "}
          {`>`} JOHN DOE {`>`}
        </span>
        
        {isLoading ? "Loading" : error ? "Something went wrong :(" : (
        <div className="messages">
          {messages?.map((message) => (<div className={currentUser?._id === message.userId ? "item owner" : "item"} key={message._id}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>{message.desc}</p>
          </div>))}
        </div>)}

        <hr />

        <form onSubmit={handleSubmit(onSubmit)} className="write">
          <textarea {...register("desc")} placeholder="Write a message" id="" cols={30} rows={10}></textarea>
          <button type="submit">Send</button>
        </form>
        <p className="error">{errors.desc?.message?.toString()}</p>
        {createError && (<p className="error">{createError}</p>)}
      </div>
    </div>
  );
};

export default Conversation;
