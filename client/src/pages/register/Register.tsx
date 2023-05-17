import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, object, string, TypeOf } from "zod";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./Register.scss";
import { signUp } from "../../redux/user/userSlice";
import upload from "../../utils/upload";

const createUserSchema = object({
  username: string().nonempty({
    message: "username is required",
  }),
  email: string().nonempty({
    message: "email is required",
  }).email("Invalid email"),
  password: string().nonempty({
    message: "password is required",
  }).min(6, "Password too short - should be 6 chars minimum"),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  country: string().nonempty({
    message: "country is required",
  }),
  desc: string().nonempty({
    message: "description is required",
  }),
  isSeller: boolean().optional(),
  // countryCode: string().optional(),
  // phone: string().optional(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match :(",
  path: ["passwordConfirmation"],
}); 

type CreateUserInput = TypeOf<typeof createUserSchema>;
interface IPhone {
  raw: string;
  countryCode: string;
  formatted: string;
};

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isFetching, error, currentUser } = useAppSelector((state) => state.user);
  // const [country, setCountry] = useState(''); using rhf country value now.
  const [file, setFile] = useState<File>();
  const [phone, setPhone] = useState<IPhone>({
    raw: "",
    countryCode: "",
    formatted: "",
  });
  // const [phone, setPhone] = useState("");
  // const [countryCode, setCountryCode] = useState("");
  // const [formattedPhone, setformattedPhone] = useState("");
  const { register, setValue, formState:{ errors }, handleSubmit, control, trigger } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  console.log(phone.raw);
  console.log(phone.countryCode);
  console.log(phone.formatted);

  console.log(errors);
  console.log(file);
  // console.log(country);

  const onSubmit = async (values: CreateUserInput) => {
    try {
      console.log(values);
      if (file) {
        const url = await upload(file);
        const response = await dispatch(signUp({ ...values, countryCode: phone.countryCode, phone: phone.formatted, img: url }))
        
        if(response.type === "user/signUp/fulfilled" ) {
          return navigate("/")
        } else if (response.type === "user/signUp/rejected") {
          console.log("Sign up failed.")
        }
      } else {
        const response = await dispatch(signUp({ ...values, countryCode: phone.countryCode, phone: phone.formatted }))
        
        if(response.type === "user/signUp/fulfilled" ) {
          return navigate("/")
        } else if (response.type === "user/signUp/rejected") {
          console.log("Sign up failed.")
        }
      }
    } catch(e: any) {
      // setRegisterError(e.message);
      console.log(e);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="username"
              {...register("username")}
            />
            <p>{errors.username?.message?.toString()}</p>
            <label htmlFor="email">Email</label>
            <input placeholder="email" {...register("email")} />
            <p>{errors.email?.message?.toString()}</p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*******"
              {...register("password")}
            />
            <p>{errors.password?.message?.toString()}</p>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="*******"
              {...register("passwordConfirmation")}
            />
            <p>{errors.passwordConfirmation?.message?.toString()}</p>
            <label htmlFor="picture">Profile Picture</label>
            <input type="file" className="picture" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if(!e.target.files) return; setFile(e.target.files[0])}} />
            <label htmlFor="country">Country</label>
            {/* <input type="text" id="country" placeholder="usa" {...register("country")} /> */}
            <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CountryDropdown
                  value={value} // value={country} no need for this anymore as we can use rhf passed value
                  classes="country-input"
                  onChange={(val) => {
                    // setCountry(val);
                    // setValue("country", val);
                    onChange(val);
                  }}
                  onBlur={onBlur}
                  
                />
              )}
              name="country"
              control={control}
              
            />
            <p>{errors.country?.message?.toString()}</p>
            <button type="submit">Sign Up</button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="switch"
                  onChange={(e) => setValue("isSeller", e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="">Phone Number</label>
            {/* <input id="phone" type="tel" /> */}
            <PhoneInput
              country={"us"}
              countryCodeEditable={false}
              value={phone.raw}
              onChange={(phone: string, country: any) => {
                setPhone((prev: IPhone) => {
                  return {...prev, raw: phone}
                });
                setPhone((prev: IPhone) => {
                  return {...prev, formatted: phone.replace(country.dialCode, "")}
                });
                setPhone((prev: IPhone) => {
                  return {...prev, countryCode: country.dialCode}
                });
                // setformattedPhone(phone.replace(country.dialCode, ""));
                // setCountryCode(country.dialCode);
              }}
              inputStyle={{ padding: "1px 2px", paddingLeft: 48 }}
            />
            <label htmlFor="desc">Description</label>
            <textarea
              placeholder="A short description of yourself"
              cols={30}
              rows={10}
              id="desc"
              {...register("desc")}
            ></textarea>
            <p>{errors.desc?.message?.toString()}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
