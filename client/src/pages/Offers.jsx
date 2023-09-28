import React, { useState,useEffect } from 'react';
import { format } from 'date-fns';
import useFetchOffers from "../admin/scenes/offers/fetchOffers";

const Offers = () => {
  const Data = useFetchOffers();

  const currentDate = new Date();
  const currentOffers = Data.filter(offer => {
    const fromDate = new Date(offer.fromDate);
    const tillDate = new Date(offer.tillDate);
    return fromDate <= currentDate && currentDate <= tillDate;
  });
  const upcommingOffers = Data.filter(offer => {
    const fromDate = new Date(offer.fromDate);
    return fromDate >= currentDate;
  });

  return (
    <section className="bg-[#001a33]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-lg mb-8 lg:mb-16">
          <h3 className="text-2xl font-bold text-white border-b">Current Offers</h3>
          <div className="grid gap-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12 drop-shadow-2xl">
            {currentOffers.map(offer => (
              <a
                key={offer._id}
                className="flex flex-col items-center my-6 rounded-lg border-gray-700 bg-[#010917] hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={offer.imageLink}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {offer.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-400">
                    {offer.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white border-b">Upcoming Offers</h3>
          <div className="grid gap-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12 drop-shadow-2xl">
            {upcommingOffers.map(offer => (
              <a
                key={offer._id}
                className="flex flex-col items-center my-6 rounded-lg border-gray-700 bg-[#010917] hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={offer.imageLink}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {offer.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-400">
                    {offer.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
