import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

const ConfirmationModal = ({ heading, onClose, onConfirm, msg }) => {
  return (
    <div className="h-full bg-black bg-opacity-70 absolute top-0 left-0 w-full z-30 flex justify-center items-center">
      <div className="h-screen absolute top-0 left-0 justify-center w-full flex items-center">
        <div className="h-[250px] w-[320px] sm:w-[350px] z-50 rounded-sm bg-slate-300 px-10 gap-4 flex justify-center items-center flex-col">
          <div className="flex justify-center flex-col items-center">
            <h1>
              <IoAlertCircleOutline size={50} />
            </h1>
            <h1 className="font-semibold text-lg">{heading}</h1>
          </div>
          <span className="text-sm text-center">{msg}</span>
          <div className="flex gap-4 text-sm sm:text-base">
            <button
              className="px-4 py-1 bg-red-500 rounded-sm text-white"
              onClick={onConfirm}
            >
              Yes! I'm Sure
            </button>
            <button
              className="px-4 py-1 bg-blue-500 rounded-sm text-white"
              onClick={() => onClose(false)}
            >
              No! Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
