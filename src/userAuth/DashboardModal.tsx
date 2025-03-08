"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DashboardModalProps {
  onClose: () => void;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ onClose }) => {
  const router = useRouter();

  // Define the modules with image and navigation paths
  const modules = [
    { name: "Omnisupport", image: "/images/Tuma_Omnisupport.png", path: "https://tuma-omnisupport.vercel.app/" },
    { name: "FX Navigator", image: "/images/Tuma_Fx_Navigator.png", path: "https://tuma-black.vercel.app/" },
    { name: "Campaign Manager", image: "/images/Tuma_Campaign_Manager.png", path: "/campaign-manager" },
    { name: "Back Office Suite", image: "/images/Tuma_Back_Office.png", path: "/backoffice" },
    { name: "Merchant Portal", image: "/images/Tuma_Merchant_Portal.png", path: "/https://promitto-backoffice.vercel.app/" },
    { name: "Access Manager", image: "/images/Tuma_Access_Manager.png", path: "/access-manager" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      <div className="relative bg-white px-6 py-16 rounded-2xl shadow-lg w-[650px] h-[700px] text-center">
        {/* Close Button (Top Right) */}
        <button onClick={onClose} className="absolute top-5 right-5">
          <Image src="/images/close.png" alt="Close" width={30} height={30} />
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-12">Select a module to proceed</h2>

        {/* Grid layout for buttons */}
        <div className="grid grid-cols-3  gap-3 gap-y-12">
          {modules.map((module, index) => (
            <button 
              key={index}
              onClick={() => router.push(module.path)}
              className="flex flex-col items-center justify-center transition py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-32 h-32 overflow-hidden rounded-full shadow-md">
                <Image 
                  src={module.image} 
                  alt={module.name} 
                  width={150} 
                  height={150} 
                  className="object-cover"
                />
              </div>
              <span className="mt-2 text-lg font-medium text-gray-800">{module.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
