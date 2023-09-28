import React from 'react'
import { Link } from 'react-router-dom'

function ServiceBooked() {
  return (
    <section className="bg-[#001a33]">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 ">
        <div className="flex items-center justify-center h-[70vh]  text-gray-200 "> 
        <div className="flex flex-col items-center space-y-2 min-[320px]:p-5 min-[649px]:p-11 rounded-3xl bg-[#010917]">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="min-[320px]:text-2xl font-bold">You're all set! Your service has been booked successfully!</div>
          <p className="text-lg">You will receive a call from us shortly.</p>
          <div className="min-[320px]:text-xl font-meduim mt-3 text-[#ffc107]"><span className='font-bold'>Important:</span> Kindly remove all personal belongings, including vehicle documents, from your motorbike before pickup. We won't be liable for any misplaced items. Thank you!</div>
            <Link to='/' className="phone inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border rounded-lg focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800 bg-[#144B82]">
              Home
            </Link>
        </div>
    </div>
    </div>
</section>
    
  )
}

export default ServiceBooked