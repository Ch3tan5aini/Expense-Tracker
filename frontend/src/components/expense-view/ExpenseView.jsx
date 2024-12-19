import React from "react";
import capitalize from "lodash/capitalize";
import { IoMdClose } from "react-icons/io";

const ExpenseView = ({ heading, historyData, deleteTransaction }) => {
  return (
    <div className="w-full mx-4">
      <h1 className="text-blue-500 text-md font-bold">{heading}</h1>
      <div className="flex gap-1 px-6 py-2 mb-4 mt-3 rounded-md bg-gray-200 flex-col font-sans font-medium text-xs sm:text-sm sm:font-medium">
        <div className="flex justify-between w-full">
          <h1>Date</h1>
          <h1>Discription</h1>
          <h1>Amount</h1>
        </div>
        <hr className="bg-gray-700 h-0.5" />
        {historyData && historyData.length
          ? historyData.map((data, index) => (
              <div key={index} className="flex justify-between w-full">
                <div className="flex gap-2 ">
                  <span className="mr-2 sm:mr-5">{data.date} |</span>
                  <h1>{capitalize(data.discription)}</h1>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span>₹ {data.amount}</span>
                  <IoMdClose
                    className="cursor-pointer"
                    onClick={() => deleteTransaction(data._id)}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ExpenseView;
