import { request } from "@/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/token-slice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    terms: yup
      .boolean()
      .oneOf([true], "You must agree to the Privacy Policy and Terms of Use"),
  })
  .required();

const Register = () => {
  const [eye, setEye] = useState({
    password: false,
    confirm_password: false,
  });
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

  const onSignUp = (data) => {
    delete data.terms;
    console.log(data);
    request

      .post("/auth/signup-admin", data)
      .then((res) => {
        console.log(res);
        dispatch(signIn(res.data.access_token));
        navigate("/admin");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full max-[850px]:grid-cols-1 min-h-screen grid grid-cols-2">
      <div className='bg-[url("src/assets/images/register.png")] max-[850px]:hidden bg-cover bg-no-repeat bg-center'></div>
      <div className="flex max-[1100px]:p-10 max-[500px]:p-5 items-center pl-[87px]">
        <form
          onSubmit={handleSubmit(onSignUp)}
          className="max-w-[456px] w-full max-[850px]:max-w-full"
        >
          <p className="text-[40px] font-medium mb-6">Sign up</p>
          <p className="text-[#6C7275] mb-8">
            Already have an account?{" "}
            <Link className="text-green-500" to={"/login"}>
              {" "}
              Sign in
            </Link>
          </p>

          <label className="mb-8 block max-[500px]:mb-4">
            <input
              {...register("name")}
              className="w-full border-b h-10 outline-none focus:border-green-500"
              type="text"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </label>

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
            <div className="relative ">
              <input
                {...register("password")}
                type={eye.password ? "text" : "password"}
                className="w-full border-b h-10 outline-none focus:border-green-500"
                placeholder="Password"
              />
              {watch("password") && (
                <span
                  onClick={() =>
                    setEye((prev) => ({ ...prev, password: !prev.password }))
                  }
                  className="absolute select-none top-[50%] translate-y-[-50%] right-[30px] text-xl cursor-pointer"
                >
                  {eye.password ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </label>
          <label className="block mb-8 max-[500px]:mb-4" htmlFor="">
            <div className="relative ">
              <input
                {...register("confirm_password")}
                type={eye.confirm_password ? "text" : "password"}
                className="w-full border-b h-10 outline-none focus:border-green-500"
                placeholder="Confirm Password"
              />
              {watch("confirm_password") && (
                <span
                  onClick={() =>
                    setEye((prev) => ({
                      ...prev,
                      confirm_password: !prev.confirm_password,
                    }))
                  }
                  className="absolute select-none top-[50%] translate-y-[-50%] right-[30px] text-xl cursor-pointer"
                >
                  {eye.confirm_password ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </span>
              )}
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </label>

          <label className="mb-8 flex max-[500px]:mb-4 items-center gap-1">
            <input
              {...register("terms")}
              id="register-check"
              type="checkbox"
              className="w-6 h-6 border-[#6C7275] border-[1.5px] max-[500px]:h-4 max-[500px]:w-4"
            />
            <span>
              I agree with{" "}
              <b className="hover:underline cursor-pointer">Privacy Policy</b>{" "}
              and <b className="hover:underline cursor-pointer">Terms of Use</b>
            </span>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          <button className="w-full h-12 bg-black text-white rounded-md hover:opacity-70">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
