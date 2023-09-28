import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  return (
    <section>
    <div className="py-8 pr-2 sm:py-16">
        <div className="mx-auto max-w-screen-md sm:text-center text-[#98EECC]">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold  sm:text-4xl text-white">Follow us for exclusive offers.</h2>
            <div className='hover:underline hover:cursor-pointer mb-4 font-bold text-lg' >
                <Link to="https://www.facebook.com/profile.php?id=61550191114576" target='_blank' >
                      <span style={{ "--layers": 3 }} className='glitch-effect'>
                        <span style={{ "--index": 0 }}><FacebookIcon size='large' sx={{color : '#4267B2', fontSize: "30px"}}/> Sai Automobiles Page</span>
                        <span style={{ "--index": 1 }}><FacebookIcon sx={{color : '#4267B2', fontSize: "30px"}}/> Sai Automobiles Page</span>
                        <span style={{ "--index": 2 }}><FacebookIcon sx={{color : '#4267B2', fontSize: "30px"}}/> Sai Automobiles Page</span>
                      </span>
                </Link>
            </div>
            <div className="text-2xl tracking-tight font-bold text-white mb-2">Your review can make a difference! Please leave us a positive one.</div>
                <Link className='hover:underline hover:cursor-pointer' to="https://g.page/r/CZmNd4OXc2WBEBM/review" target='_blank' >
                    <span style={{ "--layers": 3 }} className='glitch-effect text-lg'>
                      <span style={{ "--index": 0 }}><img src='src/assets/icon-google.png' className='h-7 inline' /> Rate Us</span>
                      <span style={{ "--index": 1 }}><img src='src/assets/icon-google.png' className='h-7 inline' /> Rate Us</span>
                      <span style={{ "--index": 2 }}><img src='src/assets/icon-google.png' className='h-7 inline' /> Rate Us</span>
                    </span>
                </Link>
            </div>
            <div className="text-2xl tracking-tight font-bold text-white mt-10 mb-2"><CallIcon sx={{fontSize: "30px"}} /> Contact Number </div>
            <div className='grid grid-cols-3 gap-x-1 tracking-wider text-lg mb-4 max-w-[1001px] pl-5'>
              <div className='font-bold col-span-3 sm:col-span-1'>1111111111</div>
              <div className='font-bold col-span-3 sm:col-span-1'>1111111111</div>
              <div className='font-bold col-span-3 sm:col-span-1'>1111111111</div>
            </div>
            <div className='mt-10 font-bold '>
            <div>
              <div className='text-2xl tracking-tight font-bold text-white mt-10 mb-2'>
                <LocationOnIcon sx={{fontSize: "30px"}} />Address
              </div >
              <div className='text-xl font-semibold pl-5'>
                Shop Number 28, Chandresh Regency ABC, Casa Rio Main road, Lodha Heaven, Dombivli (E), 421204
              </div>
            </div>
        </div>
    </div>
  </section>
  )
}

export default Contact

