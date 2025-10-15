"use client";

import Image from "next/image";
import React, { useState } from 'react';
import WaitlistPopup from './components/WaitlistPopup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <main className="flex min-h-screen flex-col items-center" style={{backgroundColor: '#66BB6A'}}>
      <div className="w-full bg-[url('/assets/bg.svg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 pb-6">
        <h1 className="text-base font-bold text-center font-cooper-bt-medium pt-10" style={{color: '#0E1B22'}}>koottu.</h1>
        <img src="/assets/zig-zag.svg" alt="Zigzag Line" style={{filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))'}} className="mt-2 mb-6 align-center scale-109"/>
        <p className="text-[26px] font-bold text-center leading-tight font-cooper-bt-medium mb-2" style={{color: '#0E1B22'}}>
          Rent your room to <br />
          Malayali students, <span className="italic underline font-cooper-bt-medium">easily</span>.
        </p>
        <p className="text-[14px] text-center opacity-60 font-geist-regular" style={{color: '#0E1B22'}}>
          Verified students. Faster fills. Less hassle.
        </p>
        <p className="w-38 h-10 bg-white text-base font-geist-semibold transition duration-300 flex items-center justify-center mt-6 mb-2" 
           style={{
             color: '#00C750',
             borderRadius: '14px',
             boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.15), 0 0 21.6px 0 #00FF6F'
           }}
           onClick={openPopup}
        >
          Join the waitlist
        </p>
        <p className="text-center  text-[10px] text-white font-geist-regular">
          <span className="dashed-underline mr-1">Verified tenants</span> <span className="mx-0.2">•</span> <span className="dashed-underline ml-1">Fast response time</span>
        </p>
      </div>
      <div className="w-full flex flex-col items-center py-10 px-4" style={{backgroundColor: '#DEEDE0'}}>
        <h2 className="text-3xl font-bold mb-4 font-cooper-bt-light text-[18px]" style={{color: '#0E1B22'}}>How it works</h2>
          <div className="flex flex-col items-end text-center gap-5">
            <img src="/assets/1.svg" alt="Step 1" className="w-auto h-57" />
            <img src="/assets/2.svg" alt="Step 2" className="w-auto h-57" />
            <img src="/assets/3.svg" alt="Step 3" className="w-auto h-61" />        
          </div>
      </div>

      <div className="w-full bg-[url('/assets/bg.svg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 pb-6">
        <h3 className="text-[18px] font-cooper-bt-light-italic text-[#0E1B22] pt-[18px]">Interested?</h3>
        <p className="w-38 h-10 bg-white text-base font-geist-semibold transition duration-300 flex items-center justify-center mt-3 mb-4" 
           style={{
             color: '#00C750',
             borderRadius: '14px',
             boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.15), 0 0 21.6px 0 #00FF6F'
           }}
           onClick={openPopup}
        >
          Join the waitlist
        </p>
        <img src="/assets/zig-zag.svg" alt="Zigzag Line" style={{filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))', stroke: '#ffffff'}} className="scale-109"/>
        <p className="text-sm text-[#0E1B22] font-cooper-bt-light mt-3">koottu © 2025</p>
        <p className="text-sm text-[#0E1B22] font-cooper-bt-light flex items-center gap-1 mb-4">Made with <img src="/assets/love.svg" alt="love" className="w-4 h-4 inline-block pt-0.5" /> in Ireland</p>
      </div>
      {showPopup && <WaitlistPopup onClose={closePopup} />}
    </main>
  );
}
