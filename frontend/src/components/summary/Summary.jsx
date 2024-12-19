import React from "react";

const Summary = (props) => {
  return (
    <div className="flex flex-col justify-center items-center py-8">
      <h2 className="font-semibold">Total Balance is ₹ {props.data.balance}</h2>
      <div className="flex gap-6">
        <div className="flex flex-col justify-center items-center my-2">
          <h1 className="font-bold text-4xl sm:text-5xl">
            ₹ {props.data.totalIncome}
          </h1>
          <span className="text-gray-500 ">Total Income</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-4xl sm:text-5xl">
            ₹ {props.data.totalExpense}
          </h1>
          <span className="text-gray-500 ">Total Expense</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
