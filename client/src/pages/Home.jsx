import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Map from '../components/Map';
import Contact from '../components/Contact';
import Carousel from '../components/Carousel';
import StoreTraffic from '../components/storeTraffic';
import PricingCards from '../components/PricingCards'


function Home() {
  const location = useLocation();
  const { pathname } = location;

  const smoothScrollToSection = (section, duration) => {
    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const scrollStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);

      if (elapsed < duration) {
        window.requestAnimationFrame(scrollStep);
      }
    };

    window.requestAnimationFrame(scrollStep);
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  useEffect(()=>{
    StoreTraffic();
  },[]);

  useEffect(() => {
    if (pathname === '/about') {
      const section = document.getElementById('about');
      if (section) {
        smoothScrollToSection(section, 1300);
      }
    }
  }, [pathname]);

  return (
    <div className='bg-[#001a33]'>
        <div>
          <PricingCards/>
        </div>
        <div className='bg-[#010917]'>
          <Features/>
        </div>
        <div id='about' className='flex flex-col items-center '>
          <div className="w-fit flex flex-col items-center mt-10 phone-contact bg-[#010917] rounded-xl">
            <div >
              <Map />
            </div>
            <div className=" px-3 w-auto">
              <Contact />
            </div>
          </div>
        </div>
        <div>
          <Carousel />
        </div> 
    </div>
  )
}

export default Home