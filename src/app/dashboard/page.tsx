"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import User from "../access-manager/components/User"; // Import the User component

const DashboardPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  // Log current user roles when component mounts
  React.useEffect(() => {
    console.log("Current user roles from store:", user?.roles);
  }, [user?.roles]);

  // Define all possible modules with their required roles
  const allModules = [
    { 
      name: "Omnisupport", 
      image: "/user-access/images/omni.png", 
      path: "https://tuma-omnisupport.vercel.app/",
      roles: ["ADMIN", "OMNISUPPORT"] 
    },
    { 
      name: "FX Navigator", 
      image: "/user-access/images/Tuma_Fx_Navigator.png", 
      path: "/fx-navigator",
      roles: ["ADMIN", "TREASURY"] 
    },
    { 
      name: "Campaign Manager", 
      image: "/user-access/images/Tuma_Campaign_Manager.png", 
      path: "/campaign-manager",
      roles: ["ADMIN"] 
    },
    { 
      name: "Back Office Suite", 
      image: "/user-access/images/Tuma_Back_Office.png", 
      path: "/backoffice/dashboard/",
      roles: ["ADMIN"] 
    },
    { 
      name: "Merchant Portal", 
      image: "/user-access/images/Tuma_Merchant_Portal.png", 
      path: "/promitto/dashboard",
      roles: ["ADMIN", "MERCHANT"] 
    },
    { 
      name: "Access Manager", 
      image: "/user-access/images/Tuma_Access_Manager.png", 
      path: "/access-manager",
      roles: ["ADMIN"] 
    },
  ];

  // Filter modules based on user role
  const filteredModules = allModules.filter(module => {
    if (!user || !user.roles) {
      console.log("No user or roles found - denying access to all modules");
      return false;
    }
    
    if (user.roles.includes("ADMIN")) {
      console.log(`Admin access granted to: ${module.name}`);
      return true;
    }
    
    const hasAccess = module.roles.some(role => user.roles.includes(role));
    console.log(`${user.roles.join(", ")} ${hasAccess ? "can" : "cannot"} access ${module.name}`);
    return hasAccess;
  });

  const handleModuleClick = (path: string, moduleName: string) => {
    console.log(`Navigating to ${moduleName} with roles:`, user?.roles);
    
    if (path.startsWith('http')) {
      console.log(`Opening external: ${path}`);
      window.open(path, '_blank');
    } else {
      console.log(`Routing internally to: ${path}`);
      router.push(path);
    }
  };

  return (
    <div className="flex min-h-screen font-poppins items-center justify-center bg-blue-600/60 backdrop-blur-xl">
        {/* Add User component positioned at bottom left */}
        <div className="absolute  bottom-2 left-3">
          <User />
        </div>
      <div className="relative bg-white px-6 py-14 rounded-2xl shadow-lg w-4xl h-[700px] text-center">
      

        <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-12">Select a module to proceed</h2>

        {/* Grid layout for buttons */}
        <div className="grid grid-cols-3 gap-2 gap-y-16">
          {filteredModules.map((module, index) => (
            <button 
              key={index}
              onClick={() => handleModuleClick(module.path, module.name)}
              className="flex flex-col items-center justify-center transition py-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <div className="w-36 h-36 overflow-hidden rounded-full shadow-md">
                <Image 
                  src={module.image} 
                  alt={module.name} 
                  width={250} 
                  height={250} 
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

export default DashboardPage;