import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
// import { login } from '../../utils/api';
import { login } from '../../redux/user/userSlice';
import "./Login.scss";

const createSessionSchema = object({
  username: string().nonempty({
    message: "Username is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  })
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useAppSelector((state) => state.user);
  const { register, formState: { errors }, handleSubmit } = useForm<CreateSessionInput>({ resolver: zodResolver(createSessionSchema) });

  const onSubmit = async (values: CreateSessionInput) => {
    const response = await dispatch(login(values));

    if(response.type === "user/login/fulfilled" ) {
      return navigate("/")
    } else if (response.type === "user/login/rejected") {
      console.log("Invalid credentials")
    }
  }

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     navigate("/");
  //   }
  // }, [error]);
  



  // console.log({ errors });

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="" placeholder="username" {...register("username")} />
        <p>{errors.username?.message?.toString()}</p>
        <label htmlFor="password">Password</label>
        <input type="password" id="" placeholder="********" {...register("password")} />
        <p>{errors.password?.message?.toString()}</p>
        <button disabled={isFetching} >Sign In</button>
        {error && (<p>{error}</p>)}
      </form>
    </div>
  )
}

export default Login;