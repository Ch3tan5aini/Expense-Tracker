import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-5 sm:px-10 py-4">
        <h1 className="text-blue-500 text-2xl font-bold sm:text-3xl cursor-pointer">
          Expense T₹acker
        </h1>
      </div>
      <div className="flex justify-between items-center lg:items-start flex-col gap-4 pt-10 px-10 lg:pt-16 h-full">
        <div className="flex flex-col-reverse justify-center items-center lg:flex-row lg:justify-evenly">
          <div className="flex flex-col justify-center items-center lg:items-start lg:mr-16">
            <h1 className="lg:text-5xl sm:text-3xl text-2xl text-gray-600 font-bold">
              Track Your Expenses,
            </h1>
            <h1 className="font-bold lg:text-6xl sm:text-5xl text-4xl text-center sm:text-left text-blue-500">
              Master Your Budget
            </h1>
            <span className="text-gray-700 text-md text-center sm:text-xl md:text-left mt-4">
              Monitor your daily expenses and achieve your financial goals with
              ease.
            </span>

            <div className="flex mt-3 gap-5 justify-center items-center">
              <Link to={"/users/sign-up"}>
                <button className="border-2 bg-blue-500 px-3 py-2 text-white rounded-sm">
                  SignUp Now
                </button>
              </Link>
              <Link to={"/users/login"}>
                <button className="border-2 bg-blue-500 px-3 py-2 text-white  rounded-sm">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className=" h-[200px] w-[320px] sm:h-[250px] sm:w-[400px] lg:h-[350px] lg:w-[550px]">
            <img
              src="../public/img1.png"
              alt="Lading Page Image"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
