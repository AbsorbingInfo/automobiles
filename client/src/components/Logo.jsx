import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';


function Logo({src}) {
  let shapes = [
    {
        d: `M39.1,-66C52,-60.2,64.9,-52.5,73.9,-41.2C83,-29.9,88.3,-15,87.6,-0.4C86.8,14.1,80.1,28.3,72.5,42C64.9,55.8,56.3,69.2,44.1,75.5C31.8,81.8,15.9,81,1.6,78.2C-12.7,75.4,-25.4,70.8,-38.9,65.2C-52.4,59.6,-66.6,53.1,-75.3,42.1C-84.1,31.1,-87.4,15.5,-85.4,1.1C-83.5,-13.3,-76.3,-26.6,-69.2,-40.4C-62,-54.2,-54.9,-68.6,-43.4,-75.2C-31.9,-81.8,-15.9,-80.8,-1.4,-78.3C13.1,-75.8,26.1,-71.8,39.1,-66Z`
    },
    {
        d: `M41.6,-73.1C54.7,-64.5,66.7,-54.9,75.8,-42.6C84.8,-30.3,91,-15.1,91.6,0.4C92.3,15.9,87.5,31.8,77,41.7C66.5,51.6,50.4,55.5,36.6,60.2C22.8,65,11.4,70.6,-0.9,72.2C-13.2,73.7,-26.4,71.1,-40.2,66.4C-54,61.7,-68.5,54.8,-73.1,43.4C-77.8,31.9,-72.6,16,-69.6,1.7C-66.7,-12.5,-65.9,-25.1,-61.7,-37.3C-57.5,-49.5,-49.9,-61.4,-39.1,-71.4C-28.2,-81.4,-14.1,-89.4,0.1,-89.5C14.2,-89.6,28.5,-81.8,41.6,-73.1Z`
    },
    {
        d: `M46.9,-79.8C61.2,-72.9,73.8,-61.3,76.8,-47.3C79.9,-33.2,73.5,-16.6,72.2,-0.7C70.9,15.1,74.8,30.3,70.6,42.5C66.5,54.7,54.4,64,41.3,72.4C28.2,80.8,14.1,88.3,0,88.3C-14,88.2,-28.1,80.6,-41.2,72.2C-54.3,63.8,-66.4,54.6,-72.1,42.4C-77.9,30.2,-77.2,15.1,-74.5,1.6C-71.8,-12,-67.1,-24,-60.1,-34C-53.2,-44,-43.9,-52.1,-33.5,-61.3C-23.1,-70.5,-11.6,-80.9,2.3,-85C16.2,-89,32.5,-86.7,46.9,-79.8Z`
    },
    {
      d:`M36,-61.9C50.3,-54.1,68.2,-51.9,77,-42.5C85.8,-33.1,85.7,-16.5,80.7,-2.9C75.8,10.8,66,21.6,57.1,30.8C48.1,40,40,47.6,30.6,55.1C21.2,62.6,10.6,69.9,-2.7,74.5C-15.9,79.1,-31.8,80.9,-43.3,74.7C-54.8,68.4,-61.9,54.1,-70.3,40.3C-78.6,26.5,-88.3,13.3,-90.8,-1.4C-93.2,-16.1,-88.4,-32.2,-79.8,-45.5C-71.1,-58.7,-58.5,-69.2,-44.6,-77.2C-30.6,-85.2,-15.3,-90.8,-2.2,-86.9C10.8,-83,21.7,-69.7,36,-61.9Z`
    }
  ]


  anime({
      targets: '.logo-bg',
      d: [
          {value: shapes[0].d},
          {value: shapes[1].d},
          {value: shapes[2].d},
          {value: shapes[3].d}
          
      ],
      duration: 9000,
      autoplay: true,
      direction:"alternate",
      easing: 'easeOutQuad',
      elasticity: 100,
      loop: true
  });
      
        
  return (
    <div>
      <svg viewBox="0 0 200 200"  width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <path className='logo-bg' fill="#FFF4F4" d="M39.1,-66C52,-60.2,64.9,-52.5,73.9,-41.2C83,-29.9,88.3,-15,87.6,-0.4C86.8,14.1,80.1,28.3,72.5,42C64.9,55.8,56.3,69.2,44.1,75.5C31.8,81.8,15.9,81,1.6,78.2C-12.7,75.4,-25.4,70.8,-38.9,65.2C-52.4,59.6,-66.6,53.1,-75.3,42.1C-84.1,31.1,-87.4,15.5,-85.4,1.1C-83.5,-13.3,-76.3,-26.6,-69.2,-40.4C-62,-54.2,-54.9,-68.6,-43.4,-75.2C-31.9,-81.8,-15.9,-80.8,-1.4,-78.3C13.1,-75.8,26.1,-71.8,39.1,-66Z" transform="translate(100 100)" />
        <image  href={src} width="100" height="100" x="50" y="50" />
      </svg>
    </div>
  )
}

export default Logo