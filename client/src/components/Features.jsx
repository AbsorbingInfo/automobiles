import React from 'react'

function Features() {
  return (
    <div>
        <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Get road-ready, 
                    <span className="waviy">
                        <span className='pl-2' style={{'--i': 1}}>s</span>
                        <span style={{'--i': 2}}>t</span>
                        <span style={{'--i': 3}}>o</span>
                        <span style={{'--i': 4}}>p</span>
                        <span className='pl-2' style={{'--i': 5}}>b</span>
                        <span style={{'--i': 6}}>y</span>
                        <span className='pl-2' style={{'--i': 7}}>n</span>
                        <span style={{'--i': 8}}>o</span>
                        <span style={{'--i': 9}}>w</span>
                        <span style={{'--i': 10}}>!</span>
                    </span>
                </h2>
                <p className="sm:text-xl text-gray-400">Here at Sai Automobiles, we provide comprehensive motorcycle repair services and offer a wide selection of high-quality spare parts to keep your ride running smoothly.</p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div className='p-4 rounded-lg flex flex-col items-center bg-[#001a33]'>
                    <div className="flex justify-center items-center mb-4 icon-container">
                        <img src='tool-box.png' className='h-[15rem]'/>
                    </div>
                    <div>
                        <h3 className="mb-2 text-xl font-bold text-white">Vast Selection of Quality Parts</h3>
                        <p className="text-gray-400">Find the perfect fit for your motorcycle.</p>
                    </div>
                </div>
                <div className='p-4 rounded-lg flex flex-col items-center bg-[#001a33]'>
                    <div className="flex justify-center items-center mb-4 icon-container">
                        <img src='tools.png' className='h-[15rem]'/>
                    </div>
                    <div>
                        <h3 className="mb-2 text-xl font-bold text-white">Expert Motorcycle Repair Services</h3>
                        <p className=" text-gray-400">Ensuring reliable performance for your bike.</p>
                    </div>
                </div>
                <div className='p-4 rounded-lg flex flex-col items-center bg-[#001a33]'>
                    <div className="flex justify-center items-center mb-4 icon-container">
                        <img src='save-money.png' className='h-[13rem] phone-icon'/>
                    </div>
                    <div>
                        <h3 className="mb-2 text-xl font-bold text-white">Saving You Money, Keeping You Riding</h3>
                        <p className="text-gray-400">Unbeatable prices for top-notch products and services.</p>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Features
