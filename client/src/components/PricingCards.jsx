import React,{useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const PricingCards = () => {
  const [isServicePointsPopupOpen, setServicePointsPopupOpen] = useState(false);
  const [isLoyaltyOfferPopupOpen, setIsLoyaltyOfferPopupOpen] = useState(false);
  const [isTermsAndConditonsOpen, setIsTermsAndConditonsOpen] = useState(false);

  const handlePopupOpen = () => {
    setServicePointsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setServicePointsPopupOpen(false);
  };

  const handleTandCOpen = () => {
    setIsTermsAndConditonsOpen(true);
  };

  const handleTandCClose = () => {
    setIsTermsAndConditonsOpen(false);
  };

  const handleLoyaltyPopupOpen = () => {
    setIsLoyaltyOfferPopupOpen(true);
  };

  const handleLoyaltyPopupClose = () => {
    setIsLoyaltyOfferPopupOpen(false);
  };


  return (
  <div className="bg-image">
  <main className="max-w-6xl mx-auto pt-10 pb-36 px-3">
  {isTermsAndConditonsOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-[#BAF4DD] p-6 rounded w-full sm:w-96">
            <div className="flex justify-between">
              <span className="text-xl text-black font-bold popup-title mr-1">
                Service Warranty Terms and Conditions
              </span>
              <span className='bg-[#3F6D67] p-1 rounded-lg h-[35px]'>
                <CloseIcon 
                style={{ color: 'white', cursor: 'pointer', fontSize: '28px' }}
                onClick={handleTandCClose}
                />
              </span>
            </div>
            <div className="text-base leading-5 font-semibold text-black mb-3 reveal-effect popup-content">
            <div className='mb-1'><span className='font-bold underline'>Covered Services: </span>The warranty applies exclusively to issues related to the specific repair or servicing work performed by us during the service appointment. This includes any repairs, replacements, adjustments, or maintenance tasks.</div>
            <div className='mb-1'><span className='font-bold underline'>Exclusions: </span>
              <ol>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4 }}/>The warranty does not cover any issues unrelated to the work we performed during the service appointment.</li>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4 }}/>Accidents and Damage: Any damage caused by accidents, collisions, misuse, abuse, neglect, theft, vandalism, or natural disasters.</li>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4 }}/>Third-Party Repairs: Any repairs, modifications, adjustments, or servicing performed by third parties after our service appointment.</li>
              </ol>
            </div>
            <div className='mb-2'><span className='font-bold underline'>Eligibility: </span>
              Our team will schedule an inspection to verify the issue and determine if it is directly related to the work we performed.
              If the issue is found to be related to our service, we will honor the warranty and undertake the necessary repairs or adjustments at no additional cost to you.
            </div>
            By availing our two-wheeler service, you acknowledge and agree to the terms and conditions outlined above. This warranty is designed to ensure the quality and integrity of the services we provide. 
          </div>
        </div>
      </div>
      )}
  {isServicePointsPopupOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-[#BAF4DD] p-6 rounded w-full sm:w-96">
            <div className="flex justify-between">
              <span>
                <span className="text-xl text-black font-bold popup-title mr-1">22 Points of Service</span>
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
              </span>
              <span className='bg-[#3F6D67] p-1 rounded-lg'>
                <CloseIcon 
                style={{ color: 'white', cursor: 'pointer', fontSize: '28px' }}
                onClick={handlePopupClose}
                />
              </span>
            </div>
            <ul className="text-lg leading-6 font-semibold text-black mb-2 reveal-effect popup-content">
            <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Engine Oil level & density check</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Oil filter inspection</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Brake fluid inspection</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Gear Oil inspection</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Front & Rear Suspension Check-up</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Engine Tuning</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Headlamp Focus Adjustment</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Horn Tuning</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>All Switches and Electrical check up</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>All Nuts and Bolts Tightening</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>MC & Caliper Piston Seal Check-up</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>General Lubrication</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Drive Chain Adjustment & Lubrication</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Clutch Play Adjustment</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Throttle Play Adjustment</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Brake Play Adjustment</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Air Filter Cleaning</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Spark Plug Cleaning and gap adjustment</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Carburetor Cleaning & Adjustment</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>All cables inspection</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Tyre pressure check</li>
              <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/>Shampoo Wash</li>
            </ul>
          </div>
        </div>
      )}
      {isLoyaltyOfferPopupOpen && (
        <div className="fixed inset-0 flex z-10 justify-center items-center bg-black bg-opacity-50">
          <div className="bg-[#98EECC] p-6 rounded w-full sm:w-96">
            <div className="flex justify-between popup-title">
            <span className="text-xl leading-6 text-black font-bold">SaiAuto's VIP Rider Program!</span>
              <span className='bg-[#3F6D67] p-1 rounded-lg'>
                <CloseIcon 
                  style={{ color: 'white', cursor: 'pointer', fontSize: '28px' }}
                  onClick={handleLoyaltyPopupClose}
                />
              </span>
              
            </div>
            
            <div className='text-black text-base leading-4 font-[501] popup-content'>
              <p className='pb-2'>
                Become a SaiAuto VIP Rider and unlock a world of exclusive benefits and privileges.
                Our loyalty program is designed to reward your commitment to regular bike maintenance while adding a touch of luxury to your journey.
              </p>
              <p className='font-[601] text-lg leading-5 pb-1'>How to become a SaiAuto VIP Rider?</p>
              <p className='pb-2'>
                It's simple! All you need to do is get your bike serviced before the specified duration ends.
                The duration varies depending on the type of bike you own:
              </p>
              <ul className='pb-3'>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/><span className='font-[601]'>Regular Bikes:</span> Keep your bike in top-notch condition by getting it serviced every <span>60 days</span>.</li>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/><span className='font-[601]'>Royal Enfield:</span> For the royal treatment, ensure your Royal Enfield gets serviced every <span>75 days</span>.</li>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/><span className='font-[601]'>Sport Bikes:</span> Stay ahead of the pack with our sport bikes maintenance interval of <span>70 days</span>.</li>
              </ul>
              <p className='font-[601] text-lg leading-5 pb-2'>What are the perks of being a SaiAuto's VIP Rider?</p>
              <ul>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/><span className='font-[601]'>Labour Discounts:</span> Enjoy a fantastic <span>10%</span> off on labour charges for any additional work required on your bike.</li>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/><span className='font-[601]'>Special Savings on Spare Parts and Lubricants:</span> Keep your bike running smoothly with generous discounts of <span>5%-10%</span> on spare parts and lubricants.</li>
                <li><FiberManualRecordIcon style={{ fontSize: 6, marginRight: 4}}/><span className='font-[601]'>Wholesale Prices on Tyres:</span> As a VIP Rider, you get access to exclusive <span>wholesale prices</span> on a wide range of high-quality tyres.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    <div className="max-w-md mx-auto mb-5 sm:mb-14 text-center">
      <h1 className="text-4xl font-semibold mb-6 lg:text-5xl typewriter-effect"><span className="text-[#98EECC]">Tailored</span> Pricing</h1>
      <p className="text-xl text-gray-500 font-medium">Affordable Servicing with a 22-Point Exclusive Checkup.</p>
    </div>
    
    <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start ">

      <div className="w-full flex-1 mt-8 p-8 order-2 shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 bg-[url('/pricing1.svg')] bg-cover">
        <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
          <div className="w-full">
            <div className="flex items-center text-white">
              <div className='w-7/12 pb-2 flex-grow'>
                <span className="block text-3xl font-semibold">Basic Care</span>
                <span className="block text-lg font-semibold">for Regular bikes</span>
              </div>
              <div className='max-[396px]:w-4/12 w-5/12 flex-shrink'> 
              <span><span className="font-medium text-gray-500 text-xl align-top">₹&thinsp;</span><span className="text-3xl font-bold ">450 </span></span><span className="text-gray-300 font-medium">/ service</span>
              </div>
            </div>
            <div className='bg-[#022838] p-2 rounded-xl flex items-center cursor-pointer hover:underline' onClick={handleLoyaltyPopupOpen}>
              <div className='w-7/12 flex-grow' >
                <span className="block text-base font-normal text-[#8BE8E5]">For <span className='text-lg font-bold'>SaiAuto's  <InfoIcon className='text-gray-400 pb-1 blink'/><br/> VIP Riders</span></span>
              </div>
              <div className='max-[396px]:w-4/12 w-5/12 flex-shrink'>
                <span><span className="font-medium text-xl align-top">₹&thinsp;</span><span className="text-3xl font-bold text-white">380 </span></span><span className="font-medium">/service</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="mb-7 font-medium text-xl text-gray-400">
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] cursor-pointer hover:underline" onClick={handlePopupOpen}><span className="text-white">22 point service<InfoIcon className='text-gray-400 pb-1 blink'/></span>(click here)</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">15 Day Service Warranty<span className='cursor-pointer hover:underline text-gray-400' onClick={handleTandCOpen}>( T&C apply)</span></span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Free doorstep pickup and delivery</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Engine bush inspection (front & rear)</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Wax Polish</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white"><span className='line-through'>Cash</span>less Insurance Claims</span>
          </li>
        </ul>
        <Link 
          to={{
            pathname: '/service',
            search: `?category=regular`,
          }}
          className="flex justify-center items-center bg-[#98EECC] rounded-xl py-5 px-4 text-center text-black font-semibold text-2xl"
        >
          Book Service
          <ArrowForwardIcon className="ml-2" />
        </Link>
      </div>

      <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-[url('/pricing3.svg')] bg-cover text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
        <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
          <div className="w-full ">
            <div className="flex items-center">
              <div className='w-7/12 pb-2 flex-grow'>
                <span className="block text-3xl font-semibold text-white">Royal Care</span>
                <span className="block text-lg font-semibold text-white">for Royal Enfield</span>
              </div>
              <div className='max-[396px]:w-4/12 w-5/12 flex-shrink'> 
                <span><span className="font-medium text-xl align-top">₹&thinsp;</span><span className="text-3xl font-bold text-white">700 </span></span><span className="font-medium">/service</span>
              </div>
            </div>
            <div className='bg-[#1f0010] p-2 rounded-xl flex items-center cursor-pointer hover:underline' onClick={handleLoyaltyPopupOpen}>
              <div className='w-7/12 flex-grow' >
                <span className="block text-base font-normal text-[#8BE8E5]">For <span className='text-lg font-bold '>SaiAuto's <InfoIcon className='text-gray-400 pb-1 blink'/><br/> VIP Riders</span></span>
              </div>
              <div className='max-[396px]:w-4/12 w-5/12 flex-shrink'>
                <span><span className="font-medium text-xl align-top">₹&thinsp;</span><span className="text-3xl font-bold text-white">555 </span></span><span className="font-medium">/service</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="mb-10 font-medium text-xl">
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-gray-400 cursor-pointer hover:underline" onClick={handlePopupOpen}><span className="text-white">22 point service<InfoIcon className='text-gray-400 pb-1 blink'/> </span>(click here)</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">15 Day Service Warranty<span className='cursor-pointer hover:underline text-gray-400' onClick={handleTandCOpen}>( T&C apply)</span></span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Free doorstep pickup and delivery</span>
          </li>
          <li className="flex text-lg mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Wax Polish</span>
          </li>
          <li className="flex text-lg mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white"><span className='line-through'>Cash</span>less Insurance Claims</span>
          </li>
        </ul>
        <Link 
          to={{
            pathname: '/service',
            search: `?category=royalenfield`,
          }}
          className="flex justify-center items-center bg-[#98EECC] rounded-xl py-5 px-4 text-center text-black font-semibold text-2xl"
        >
          Book Service
          <ArrowForwardIcon className="ml-2" />
        </Link>
      </div>
      
      <div className="w-full flex-1 mt-8 p-8 order-3 bg-[url('/pricing2.svg')] bg-cover shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3">
        <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
        <div className="w-full">
            <div className="flex items-center">
              <div className='w-7/12 pb-2 flex-grow'>
                <span className="block text-3xl font-semibold text-white">Speed Care</span>
                <span className="block text-lg font-semibold text-white">for Sport Bikes</span>
              </div>
              <div className='max-[396px]:w-4/12 w-5/12 flex-shrink'> 
                <span><span className="font-medium text-gray-300 text-xl align-top">₹&thinsp;</span><span className="text-3xl font-bold text-white">600 </span></span><span className="text-gray-300 font-medium">/ service</span>
              </div>
            </div>
            <div className='bg-[#1d2700] p-2 rounded-xl flex items-center cursor-pointer hover:underline' onClick={handleLoyaltyPopupOpen}>
              <div className='w-7/12 flex-grow'>
                <span className="block text-base font-normal text-[#8BE8E5]">For <span className='text-lg font-bold'>SaiAuto's  <InfoIcon className='text-gray-400 pb-1 blink'/>
                <br/> VIP Riders</span></span>
              </div>
              <div className='max-[396px]:w-4/12 w-5/12 flex-shrink'>
                <span><span className="font-medium text-xl align-top">₹&thinsp;</span><span className="text-3xl font-bold text-white">500 </span></span><span className="font-medium">/service</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="mb-7 font-medium text-xl text-gray-400">
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] cursor-pointer hover:underline" onClick={handlePopupOpen}><span className="text-white">22 point service<InfoIcon className='text-gray-400 pb-1 blink'/> </span>(click here)</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">15 Day Service Warranty<span className='cursor-pointer hover:underline text-gray-400' onClick={handleTandCOpen}>( T&C apply)</span></span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Free doorstep pickup and delivery</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white">Wax Polish</span>
          </li>
          <li className="flex mb-1.5">
            <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
            <span className="ml-3 font-[501] text-white"><span className='line-through'>Cash</span>less Insurance Claims</span>
          </li>
        </ul>
        <Link 
          to={{
            pathname: '/service',
            search: `?category=sport`,
          }}
          className="flex justify-center items-center bg-[#98EECC] rounded-xl py-5 px-4 text-center text-black font-semibold text-2xl"
        >
          Book Service
          <ArrowForwardIcon className="ml-2" />
        </Link>
      </div>

    </div>
  </main>
  </div>

  )
}

export default PricingCards