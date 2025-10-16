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
        <h1 className="text-base text-center font-cooper font-medium pt-10" style={{color: '#0E1B22'}}>koottu.</h1>
        <Image 
          src="/assets/zig-zag.svg" 
          alt="Zigzag Line" 
          width={1920}
          height={1080}
          priority
          className="mt-2 mb-6 align-center scale-109"
          style={{filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))'}}
        />
        <p className="text-[26px] font-cooper font-bold text-center leading-tight mb-2" style={{color: '#0E1B22'}}>
          Rent your room to <br />
          Malayali students, <span className="font-cooper font-bold underline">easily</span>.
        </p>
        <p className="text-[14px] text-center opacity-60 geist-regular" style={{color: '#0E1B22'}}>
          Verified students. Faster fills. Less hassle.
        </p>
        <p className="w-38 h-10 bg-white text-base font-geist-semibold transition duration-300 flex items-center justify-center mt-6 mb-2 cursor-pointer" 
           style={{
             color: '#00C750',
             borderRadius: '14px',
             boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.15), 0 0 21.6px 0 #00FF6F'
           }}
           onClick={openPopup}
        >
          Join the waitlist
        </p>
        <p className="text-center text-[10px] text-white font-geist">
          <span className="dashed-underline mr-1">Verified tenants</span> <span className="mx-0.2">•</span> <span className="dashed-underline ml-1">Fast response time</span>
        </p>
      </div>
      <div className="w-full flex flex-col items-center py-10 px-4" style={{backgroundColor: '#DEEDE0'}}>
        <h2 className="text-3xl font-cooper font-light mb-4 text-[18px] underline" style={{color: '#0E1B22'}}>How It Works</h2>
        <div className="flex flex-col items-end text-center gap-5">
          <Image 
            src="/assets/1.svg" 
            alt="Step 1" 
            width={1920}
            height={1080}
            className="w-auto h-62 unselectable"
          />
          <Image 
            src="/assets/2.svg" 
            alt="Step 2" 
            width={1920}
            height={1080}
            className="w-auto h-62 unselectable"
          />
          <Image 
            src="/assets/3.svg" 
            alt="Step 3" 
            width={1920}
            height={1080}
            className="w-auto h-62 unselectable"
          />        
        </div>
      </div>

      <div className="w-full bg-[url('/assets/bg.svg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 pb-6">
        <h3 className="text-[18px] font-cooper font-light italic text-[#0E1B22] pt-[18px]">Interested?</h3>
        <p className="w-38 h-10 bg-white text-base font-geist-semibold transition duration-300 flex items-center justify-center mt-3 mb-4 cursor-pointer" 
           style={{
             color: '#00C750',
             borderRadius: '14px',
             boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.15), 0 0 21.6px 0 #00FF6F'
           }}
           onClick={openPopup}
        >
          Join the waitlist
        </p>
        <Image 
          src="/assets/zig-zag.svg" 
          alt="Zigzag Line" 
          width={1920}
          height={1080}
          priority
          className="scale-109"
          style={{filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))', stroke: '#ffffff'}}
        />
        <p className="text-sm text-[#0E1B22] font-cooper font-light mt-3">koottu © 2025</p>
        <p className="text-sm text-[#0E1B22] font-cooper font-light flex items-center gap-1 mb-4">Made with <Image src="/assets/love.svg" alt="love" width={16} height={16} className="w-4 h-4 inline-block pt-0.5" /> in Ireland</p>
      </div>
      {showPopup && <WaitlistPopup onClose={closePopup} />}
    </main>
  );
}
