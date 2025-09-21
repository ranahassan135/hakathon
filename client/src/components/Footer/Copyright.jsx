import React from 'react'

const Copyright = () => {
  const year = new Date().getFullYear()
  return (
    <>
    <div className=" bg-dark">
      <div className="container ">
        <div className="row ">
          <div className="col bg-dark">
            <p className='text-center text-white'>&copy; Copyright {year}. All rights reserved.</p>

          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Copyright