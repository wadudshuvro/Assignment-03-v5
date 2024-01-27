// src/components/HeroSection.jsx

//import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#191D26] font-[Inter] text-white">
      <div className="container mx-auto w-10/12">
        <div className="grid md:grid-cols-2 items-center">
          <div>
            <h1 className="mb-1.5 text-[56px] font-bold leading-none text-[#F5BF42] lg:text-[73px]">
              Tasker
            </h1>
            <h1 className="text-lg my-2 opacity-60">
              Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker -
              Your Personal Productivity Ally for Seamless Goal Achievement and
              Stress-Free Task Management.
            </h1>
          </div>
          <img
            className="max-md:w-full flex justify-center md:order-2"
            src="/frame.png"
            width="326"
            height="290"
            alt="frame"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
