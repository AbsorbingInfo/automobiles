import React from 'react'
import { Carousel as ImagesSlide } from 'flowbite-react';


function Carousel() {
  return ( 
    <div className='h-[600px] py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6'>
    <ImagesSlide>
    <img
      alt="..."
      src="img1.jpg"
    />
    <img
      alt="..."
      src="img2.jpg"
    />
    <img
      alt="..."
      src="img3.jpg"
    />
    <img
      alt="..."
      src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
    />
    <img
      alt="..."
      src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
    />
  </ImagesSlide>
  </div>  
  )
}

export default Carousel