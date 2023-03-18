import React from 'react'

const Loader = ({chargerMsg,styling, Mystyle}) => {
  return (
    <>
        <div className='loader' style={Mystyle}></div>
        <p style={styling}>
        {chargerMsg}
        </p>
    </>
  )
}

export default Loader