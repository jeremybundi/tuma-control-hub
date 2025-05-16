"use client";

import React, { useState, useRef, useEffect } from "react";

const RegistrationSpinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [participants, setParticipants] = useState([]);
  const wheelRef = useRef(null);
  const animationTimeout = useRef(null);
  const currentRotation = useRef(0);

  const colors = [
    "#F6A6A6", "#DCC6F6", "#FDF1C1", "#A37AFC",
    "#B5EAEA", "#98D8C8", "#FDF1C1", "#B5EAEA"
  ];

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching partictoipants:", error);
        // Fallback 
        setParticipants(["John", "Jane", "Mike", "Sarah", "David", "Emily", "Robert", "Lisa"]);
      }
    };

    fetchParticipants();
  }, []);

  const spinWheel = () => {
    if (isSpinning || participants.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    const rotations = 15;
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = currentRotation.current + (360 * rotations) + randomAngle;
    const numberOfSectors = participants.length;
    const degreePerSector = 360 / numberOfSectors;

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(${currentRotation.current % 360}deg)`;
      void wheelRef.current.offsetWidth;
      wheelRef.current.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.21, 0.99)';
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    animationTimeout.current = setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = newRotation % 360;
      const winningIndex = Math.floor((360 - normalizedRotation + degreePerSector/2) / degreePerSector) % numberOfSectors;
      setWinner(participants[winningIndex]);
      currentRotation.current = newRotation;
    }, 5100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(animationTimeout.current);
    };
  }, []);

  // Calculate sector degrees based on current participants
  const numberOfSectors = participants.length;
  const degreePerSector = numberOfSectors > 0 ? 360 / numberOfSectors : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <div className="relative w-[550px] h-[550px] mb-10">
        {/* Spinner Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full relative overflow-hidden border-8 border-slate-500"
          style={{ 
            transform: 'rotate(0deg)',
            background: 'transparent'
          }}
        >
          {participants.map((name, index) => {
            const rotation = index * degreePerSector;
            const textRotation = - (currentRotation.current + rotation);
            
            return (
              <div
                key={index}
                className="absolute w-full h-full left-0 top-0 origin-center"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div
                  className="absolute left-1/2 top-0 w-1/2 h-1/2 origin-bottom"
                  style={{
                    backgroundColor: colors[index % colors.length],
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    transform: 'translateX(-50%)',
                    borderRight: '1px solid white',
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    className="absolute text-xl font-thin font-outfit text-gray-900 whitespace-nowr"
                    style={{
                      transform: `rotate(${textRotation}deg)`,
                      transformOrigin: 'center',
                      left: '30%',
                      bottom: '50%',
                      pointerEvents: 'none',
                      textShadow: '1px 1px 2px black',
                      zIndex: 10,
                      width: '100px',
                      textAlign: 'center'
                    }}
                  >
                    {name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning || participants.length === 0}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-10 flex border-8 border-white items-center justify-center text-white font-bold shadow-lg ${
            isSpinning || participants.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-400'
          }`}
        >
          <span className="text-xl text-[#C9503D]">SPIN</span>
        </button>

            {/* Pointer*/}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90px] h-36 z-20">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 100 L100 20 Q95 0 80 0 L20 0 Q5 0 0 20 L50 100 Z"
              fill="#C9503D"
              stroke="#FFF"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      {winner && (
        <div className="mt-2 px-12 py-2 bg-gray-800 rounded-lg text-center border-2 border-[#F1B80C]">
          <h3 className="text-xl font-bold text-yellow-500">WINNER!</h3>
          <p className="text-white text-2xl mt-1 font-extrabold">{winner}</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationSpinner;