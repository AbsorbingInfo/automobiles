import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="p-4 bg-[#010917]">
      <div className="mx-auto max-w-screen-xl text-center">
          <Link to="/" className="flex justify-center items-center text-2xl font-semibold text-white">
            Sai Automobiles
          </Link>   
          <p className="my-6  text-gray-400">Motorcycle repair store with vast collection of premium spare parts and relaible service.</p>
          <p className="my-1 text-gray-400">Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p>
          <Link to="/admin" className="my-6  text-gray-400">
            Admin
          </Link>
          <span className="text-sm sm:text-center text-gray-400"> © 2023 <a href="#" className="hover:underline">Sai Automobiles™</a>. All Rights Reserved.</span>
      </div>
    </footer> 
  )
}
export default Footer