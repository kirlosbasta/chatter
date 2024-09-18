import React from 'react';
import Button from './Button';
import heroImage from '../assets/hero.svg';

const Hero = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 py-28 px-4 md:px-0">
      <div className="flex items-start justify-start bg-[#1F1F39] mt-8 rounded-xl">
        <span className="w-[94px] h-1"> </span>
      </div>
      <div>
        <h2 className="text-5xl md:text-7xl font-extrabold mb-12">
          Bringing People <br /> Together,
          <br /> One Message at a Time.
        </h2>

        <p className="mb-16 text-darkGrayishBlue">
          At Chatter, we’re dedicated to bringing people together, one message{' '}
          <br /> at a time.Our chat application is designed to connect friends,
          colleagues,
          <br /> and new acquaintances effortlessly. With a focus on seamless
          communication <br /> and meaningful interactions,we help you stay
          connected and engaged, no matter where you are. Discover a new way to
          chat and experience the joy of every conversation with Chatter.
        </p>
        <Button
          Link="/login"
          className="uppercase font-source-sans bg-[#1F1F39] text-white px-12 py-3 rounded-xl text-2xl"
          title="LET'S CHAT"
        />
      </div>
      <div className="w-full flex justify-center">
        <img
          src={heroImage}
          className="w-full md:w-[770px] md:h-[500px] object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
