import { request } from '@/api';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '@/redux/slices/token-slice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
}).required();

const Register = () => {
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    request
      .post("/auth/register", data)
      .then((res) => {
        dispatch(signIn(res.data.access_token));
        navigate("/admin");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Registration failed.");
      });
  };

  return (
    <div className="w-full max-[850px]:grid-cols-1 min-h-screen grid grid-cols-2">
      <div className='bg-[url("src/assets/images/register.png")] max-[850px]:hidden bg-cover bg-no-repeat bg-center'></div>
      <div className="flex max-[1100px]:p-10 max-[500px]:p-5 items-center pl-[87px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[456px] w-full max-[850px]:max-w-full"
        >
          <p className="text-[40px] font-medium mb-6">Sign up</p>
          <p className="text-[#6C7275] mb-8">
            Already have an account?{" "}
            <a className="text-green-500" href={"/register"}>
              Sign up
            </a>
          </p>

          <label className="mb-8 block max-[500px]:mb-4">
            <input
              {...register("email")}
              className="w-full border-b h-10 outline-none focus:border-green-500"
              type="email"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </label>

          <label className="block mb-8 max-[500px]:mb-4" htmlFor="">
            <div className="relative">
              <input
                {...register("password")}
                type={eye ? "text" : "password"}
                className="w-full border-b h-10 outline-none focus:border-green-500"
                placeholder="Password"
              />
              {watch("password") && (
                <span
                  onClick={() => setEye((prev) => !prev)}
                  className="absolute select-none top-[50%] translate-y-[-50%] right-[30px] text-xl cursor-pointer"
                >
                  {eye ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </label>

          <button className="w-full h-12 bg-black text-white rounded-md hover:opacity-70">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
