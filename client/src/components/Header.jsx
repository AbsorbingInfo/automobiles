import React, { useState, useEffect  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/') {
      setSelectedMenuItem('home');
    } else if (pathname === '/spareparts') {
      setSelectedMenuItem('spareparts');
    } else if (pathname === '/service') {
      setSelectedMenuItem('service');
    }else if (pathname === '/offers') {
      setSelectedMenuItem('offers');
    }else if (pathname === '/about') {
        setSelectedMenuItem('about');
    }else {
      setSelectedMenuItem('');
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-10">
      <nav className="min-[426px]:h-[72px] max-[425px]:h-[64px] items-center border-gray-200 bg-[#010917]">
        <div className="flex flex-wrap justify-between h-full mx-auto max-w-screen-xl pl-2">
            <Link to="/" className="flex items-center">
              <img src="../src/assets/title-icon.png" className="h-12" />
              <div className='grid grid-cols-1'>
                <img src="../src/assets/title.png" className="h-9" />
                <div className='since-title text-xl'>since 2007</div>
              </div>
            </Link>
        <div className="flex px-2 items-center lg:order-2">
            <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600 right-1"
            aria-controls="mobile-menu-2"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            >
                <span className="sr-only">Open main menu</span>
                <svg
                    className={`w-6 h-6 ${isMenuOpen ? 'hidden' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                    ></path>
                </svg>
                <svg
                    className={`w-6 h-6 ${isMenuOpen ? '' : 'hidden'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    ></path>
                </svg>
                <span className={`${isMenuOpen ? 'hidden' : 'absolute flex w-2 h-2 top-8 right-4 text-[#98EECC] tilt-shaking'}`}><LoyaltyIcon /></span>
            </button>
            
          </div>
          <div
            className={`${
              isMenuOpen ? 'flex fixed top-12' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className={`flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ${
              isMenuOpen ? 'dropdown-menu-right text-xl p-2' : ''
            }`}>
              <Link to="/" className={`block py-2 pr-4 pl-3 ${
                      selectedMenuItem === 'home'
                        ? 'text-black rounded bg-[#98EECC] lg:bg-transparent lg:text-[#98EECC] lg:p-0'
                        : ' border-b  lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white border-gray-700'
                    }`} aria-current="page">
                <li>                  
                    Home                 
                </li>
              </Link>
              <Link to="/spareparts" className={`block py-2 pr-4 pl-3 ${
                      selectedMenuItem === 'spareparts'
                        ? 'text-black rounded bg-[#98EECC] lg:bg-transparent lg:text-[#98EECC] lg:p-0'
                        : ' border-b    lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'
                    }`}>
                <li>                 
                    Spare parts
                </li>
              </Link>
              <Link to="/service" className={`block py-2 pr-4 pl-3 ${
                      selectedMenuItem === 'service'
                        ? 'text-black rounded bg-[#98EECC] lg:bg-transparent lg:text-[#98EECC] lg:p-0'
                        : ' border-b    lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'
                    }`}>
                <li>                  
                    Book a service
                </li>
              </Link >
              <Link to="/offers" className={`relative block py-2 pr-4 pl-3 ${
                    selectedMenuItem === 'offers'
                      ? 'text-black rounded bg-[#98EECC] lg:bg-transparent lg:text-[#98EECC] lg:p-0'
                      : ' border-b    lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'
                  }`}>
              <li>
                  Offers
                  <span className={`${!isMenuOpen ? 'hidden' : 'absolute flex w-2 h-2 top-6 right-20 text-[#98EECC] tilt-shaking'}`}><LoyaltyIcon /></span>
                  <span className={`${isMenuOpen ? 'hidden' : 'absolute flex w-2 h-2 top-3 right-0 text-[#98EECC] tilt-shaking'}`}><LoyaltyIcon /></span>
              </li>
              </Link>
              <Link to="/about" className={`block py-2 pr-4 pl-3 ${
                        selectedMenuItem === 'about'
                        ? 'text-black rounded bg-[#98EECC] lg:bg-transparent lg:text-[#98EECC] lg:p-0'
                        : ' border-b    lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'
                    }`}>
                <li>
                    About us
                </li>
              </Link>
            </ul>
            </div>
        </div>
    </nav>
</header>
    
  )
}

export default Header