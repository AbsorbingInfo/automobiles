import React from 'react'

function ProductListing() {
  return (
    <section className="bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <img className="w-[500px] h-[500px] phone-product small-phone-product mx-auto" src='products.png'/>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">Coming soon...</h1>
      </div>
    </section>
  )
}

export default ProductListing