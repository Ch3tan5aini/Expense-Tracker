import React, { useContext, useEffect, useState } from "react";
import Summary from "../summary/Summary";
import ExpenseView from "../expense-view/ExpenseView";
import Chart from "../chart/Chart";
import AddTransaction from "../add-transaction/AddTransaction";
import { GlobalContext } from "../../context/globalContext";
import { FaPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import ProfileModal from "../userProfileModal/ProfileModal";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = ({ fetchUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);
  const uri = "http://localhost:4000";

  const navigate = useNavigate();

  const {
    totalIncome,
    totalExpense,
    setTotalIncome,
    setTotalExpense,
    userData,
    setBalance,
    balance,
    setIncomeHistory,
    setExpenseHistory,
    incomeHistory,
    expenseHistory,
  } = useContext(GlobalContext);

  function filterIncExp() {
    const income = userData.filter((data) => data.type === "Income");
    const expense = userData.filter((data) => data.type === "Expense");
    const totalExpense = expense.reduce(
      (acc, current) => acc + current.amount,
      0
    );
    const totalIncome = income.reduce(
      (acc, current) => acc + current.amount,
      0
    );
    setIncomeHistory(income);
    setExpenseHistory(expense);
    setTotalExpense(totalExpense);
    setTotalIncome(totalIncome);
  }

  const trackerReset = async function () {
    try {
      setLoading(true);
      await axios.delete(uri + "/transactions/reset", {
        withCredentials: true,
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const userLogout = async function () {
    try {
      setLoading(true);
      await axios.post(
        uri + "/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const deleteTransaction = async function (id) {
    try {
      setLoading(true);
      const res = await axios.delete(uri + "/transactions/delete/" + id, {
        withCredentials: true,
      });
      if (res) {
        console.log("Transaction Deleted");
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function handleLogout() {
    setOnConfirm(() => userLogout);
    setShowModal(true);
    setModalContent({
      heading: "Logout Confirmation",
      message: "Are You Sure You Want To Logout?",
    });
  }
  function handleReset() {
    setOnConfirm(() => trackerReset);
    setShowModal(true);
    setModalContent({
      heading: "Reset Confirmation",
      message: "Are You Sure You Want To Reset The Tracker?",
    });
  }
  function handleDeleteTransaction(id) {
    setOnConfirm(() => () => deleteTransaction(id));
    setShowModal(true);
    setModalContent({
      heading: "Delete Confirmation",
      message: "Are You Sure You Want To Delete This Transaction?",
    });
  }

  useEffect(() => {
    setBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  useEffect(() => {
    filterIncExp();
  }, []);

  return (
    <div className="relative min-h-screen">
      {loading ? (
        <div className="z-10 flex h-screen justify-center items-center">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center px-5 sm:px-10 py-4">
            <h1 className="text-blue-500 text-2xl font-bold sm:text-3xl cursor-pointer">
              Expense T₹acker
            </h1>
            <div className="flex gap-3 sm:gap-5">
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded-sm hidden sm:block"
                onClick={() => {
                  setIsOpen(true);
                  setIsClicked(false);
                }}
              >
                Add New Transaction
              </button>
              <button
                className="px-2 py-2 bg-blue-500 text-white rounded-full sm:hidden"
                onClick={() => {
                  setIsOpen(true);
                  setIsClicked(false);
                }}
              >
                <FaPlus />
              </button>
              <button onClick={() => setIsClicked(!isClicked)}>
                <FaUser size={25} className="text-blue-500" />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-evenly items-center p-4 ">
            <Chart data={{ totalIncome, totalExpense }} />
            <Summary data={{ balance, totalIncome, totalExpense }} />
          </div>

          <div className="flex w-full justify-between items-center px-4 md:px-28 sm:px-10 flex-col">
            <ExpenseView
              heading={"Income"}
              historyData={incomeHistory}
              deleteTransaction={handleDeleteTransaction}
            />
            <ExpenseView
              heading={"Expense"}
              historyData={expenseHistory}
              deleteTransaction={handleDeleteTransaction}
            />
          </div>
        </div>
      )}
      {isOpen && (
        <AddTransaction onClose={setIsOpen} fetchData={fetchUserData} />
      )}
      {isClicked && (
        <ProfileModal
          onClose={setIsClicked}
          onLogout={handleLogout}
          onReset={handleReset}
        />
      )}

      {showModal && (
        <ConfirmationModal
          heading={modalContent.heading}
          msg={modalContent.message}
          onClose={setShowModal}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
};

export default Main;
