import React from 'react'
import LoaderIcon from 'assets/img/loader.svg'
function Loader({ text, size }) {
   return (
      <div className='text-center'>
         <img src={LoaderIcon} alt='loading...' width={size} />
      </div>
   )
}

export default Loader
