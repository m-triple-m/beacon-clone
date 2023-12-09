"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitSignup = async (formData) => {
    const res = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.status);
    const data = await res.json();
    if (res.status === 201) {
      toast.success("User Registered Successfully");
    } else if (res.status === 401) {
    //   toast.error(data);
      console.log(data);
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-300 min-h-screen">
      <Toaster position="top-center" />
      <div className="p-10 w-full md:w-1/2 lg:w-1/3 mx-10 rounded-md text-slate-800 bg-white shadow-xl">
        <h3 className="my-5 text-2xl text-center font-bold">Signup Form</h3>

        <form onSubmit={handleSubmit(submitSignup)}>
          <label htmlFor="">Full Name</label>
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
          <input
            {...register("name", { required: true })}
            className="w-full border border-slate-300 rounded p-2 mb-5 mt-2"
            type="text"
          />
          <label htmlFor="">Email Address</label>
          {errors.email && (
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
          <button disabled={isSubmitting} className="bg-slate-800 rounded-md text-white px-5 py-2 mt-5 w-full">
            {isSubmitting ? 'Registering':'Submit'}
          </button>

          <a href="#" className="mt-5 block
           text-center font-bold">
            Register Account
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
