import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const AddTransaction = ({ onClose, fetchData }) => {
  const [discription, setDiscription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const uri = "https://expense-tracker-backend-rlia.onrender.com";

  const { user } = useContext(GlobalContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (discription.length === 0 || amount === 0 || type.length === 0) {
      setErrorMsg("Please Enter All The Details!");
      return;
    }
    const newTransaction = {
      username: user,
      date: date,
      discription: discription,
      amount: amount,
      type: type,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        uri + "/transactions/add",
        newTransaction,
        { withCredentials: true }
      );
      if (response) {
        // console.log(response, "added");
        setLoading(false);
        fetchData();
        onClose();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    const transactionDate = new Date().toLocaleDateString();
    setDate(transactionDate);
  }, []);

  return (
    <div className="z-20 w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 flex justify-center items-center">
      {loading ? (
        <div className="z-10 flex justify-center items-center h-screen">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : (
        <div className="h-screen absolute top-0 left-0 justify-center w-full flex items-center">
          <div className="z-40 bg-white px-12 py-8 h-[340px] w-[320px] sm:h-[380px] sm:w-[400px] rounded-sm relative">
            <h1 className="font-semibold text-xl mb-4">Transaction Details</h1>
            {errorMsg.length > 0 && (
              <span className="text-sm text-red-500">{errorMsg}</span>
            )}
            <form
              className="flex justify-start gap-4 flex-col"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-start gap-2 flex-col">
                <label htmlFor="Discription">Enter Discription</label>
                <input
                  type="text"
                  placeholder="Discription Here.."
                  className="outline-none rounded-sm px-4 py-2 bg-gray-200"
                  onChange={(e) => setDiscription(e.target.value)}
                  value={discription}
                  name="Discription"
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-start gap-2 flex-col">
                <label htmlFor="Amount">Enter Amount</label>
                <input
                  type="number"
                  placeholder="Amount Here.."
                  className="outline-none rounded-sm px-4 py-2 bg-gray-200"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  name="Amount"
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="type"
                  value="Income"
                  onClick={() => setType("Income")}
                />
                <label htmlFor="Income">Income</label>
                <input
                  type="radio"
                  name="type"
                  value="Expense"
                  onClick={(e) => setType("Expense")}
                />
                <label htmlFor="Expense">Expense</label>
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-8  flex gap-2">
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded-sm"
                  onClick={() => onClose(false)}
                >
                  Cancle
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-sm"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
