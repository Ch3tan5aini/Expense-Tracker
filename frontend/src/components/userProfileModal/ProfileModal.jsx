import React, { useContext, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../../context/globalContext";

const ProfileModal = ({ onClose, onLogout, onReset }) => {
  const { user } = useContext(GlobalContext);
  const uri = "https://expense-tracker-backend-rlia.onrender.com";
  return (
    <div>
      <div className="absolute z-30 top-16 right-5 md:right-10 backdrop-blur-md">
        <div className="bg-gray-300 opacity-60  rounded-md h-[250px] w-[250px] flex flex-col justify-center gap-2">
          <div className="flex justify-start px-4 items-center w-full">
            <FaUserCircle size={40} className="mr-2" />
            <h1>{user}</h1>
          </div>
          <div className="w-full flex flex-col p-4 jus gap-2">
            <button
              className="bg-red-600 py-2 rounded-sm text-white"
              onClick={onReset}
            >
              Reset
            </button>
            <form
              action={uri + `/download/` + user}
              method="get"
              className="bg-gray-600 py-2 rounded-sm text-white text-center"
            >
              <button>Download</button>
            </form>
            <button
              className="bg-blue-600 py-2 rounded-sm text-white"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
