import React from "react";
import Image from "next/image";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed font-poppins inset-0 my-12 backdrop-blur-xs  bg-opacity-10 flex justify-center items-center z-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative text-center">
        {/* Close Button (Top Right) */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <Image src="/images/close.png" alt="Close" width={40} height={40} />
        </button>

        {/* Tick Icon (Top Center) */}
        <div className="flex mt-8 justify-center">
          <Image src="/images/tick.png" alt="Success" width={60} height={60} />
        </div>

        <h2 className="text-2xl font-bold mx-8 text-gray-600 mt-7">
          Request Submitted Successfully
        </h2>
        <p className="text-gray-500 text-xl px-12 mt-5">
          Thanks for submitting your access request. You will receive an email
          with instructions once access is granted.
        </p>
        <button
          onClick={onClose}
          className="mt-10 border mb-5 font-normal py-2  text-xl px-8 text-gray-700 rounded-lg transition hover:bg-gray-500 hover:text-white"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default Popup;
