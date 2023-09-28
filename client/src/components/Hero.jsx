import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom';
function Hero() {
    function updateButtonText() {
        const button = document.getElementById('homeButton');
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        if (screenWidth < 400) {
          button.innerText = 'Service';
        }else{
            button.innerText = 'Book a Service'
        }
      }
      // Update button text on page load
       //updateButtonText();
      // Update button text on window resize
     //window.addEventListener('resize', updateButtonText);
  return (
    <div>
        <section>
            <div className="grid max-w-screen-xl py-4 pt-8 mx-auto mt-25 lg:gap lg:pt-16 lg:grid-cols-12">
            <div className="m-auto place-self-center lg:col-span-7  pt-7 px-7 lg:pt-5 rounded-3xl">
                    <h1 className="max-w-2xl mb-4 text-xl font-bold tracking-tight leading-none md:text-5xl hero-title text-[#C9CED8]">Your One-Stop Destination for Motorcycle Servicing, Spare Parts and Washing! </h1>
                    <p className="hero-subtitle-hide sm:block max-w-2xl mb-6 font-light lg:mx-auto md:text-lg lg:text-xl text-gray-400">Looking for trusted and reliable motorcycle repair services and premium spare parts? Experience our unparalleled expertise and commitment to excellence.</p> 
                    <Link to='/service' id='serviceButton' className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium phone text-center text-white rounded-lg bg-[#144B82] hover:bg-[#0C3157] focus:outline-none focus:ring-[#0C3157]">
                            Book a service
                            {/* <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
                    </Link>
                    <Link to='/spareparts' className="phone inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  border  rounded-lg  focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800">
                            Spare Parts
                    </Link>
                    <h1 className="max-w-2xl pt-2 mb-4 text-sm font-bold tracking-tight leading-none md:text-1xl hero-offer text-green-400">Enjoy our free pick-up and drop-off service when you make a booking today!</h1>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
                    <Logo src="logo.png"/>
                </div>                 
            </div>
        </section>
    </div>
  )
}

export default Hero

