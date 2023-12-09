"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitLogin = async (formData) => {
    const res = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.status);
    const data = await res.json();
    if (res.status === 200) {
      toast.success("Logged In Successfully");
      router.push('/user/profile')
    } else if (res.status === 401) {
      toast.error(data.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId="252845577526-9eca68uj9juma6pnr7hs0qjhspk3d5fp.apps.googleusercontent.com">
      <div className="flex justify-center items-center bg-slate-300 min-h-screen">
        <Toaster position="top-center" />
        <div className="p-10 w-full md:w-1/2 lg:w-1/3 mx-10 rounded-md text-slate-800 bg-white shadow-xl">
          <h3 className="my-5 text-2xl text-center font-bold">LOGIN FORM</h3>

          <form onSubmit={handleSubmit(submitLogin)}>
            <label htmlFor="">Email Address</label>
            {errors.exampleRequired && (
              <span className="text-red-500">Email is required</span>
            )}
            <input
              {...register("email", { required: true })}
              className="w-full border border-slate-300 rounded p-2 mb-5 mt-2"
              type="text"
            />
            <label htmlFor="">Secure Password</label>
            <input
              {...register("password", { required: true })}
              className="w-full border border-slate-300 rounded p-2 mb-5 mt-2"
              type="password"
            />
            <a href="#" className="mt-5 block">
              Forgot Password
            </a>
            <button className="bg-slate-800 rounded-md text-white px-5 py-2 mt-5 w-full">
              Submit
            </button>
            <a href="#" className="mt-5 block text-center font-bold">
              Register Account
            </a>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
