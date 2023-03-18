import React from 'react'

const Modal = ({afficherModal, children}) => {
  return (
    afficherModal && (
    <div className='modalBackground'>
        <div className='modalContainer'>
            {children}
        </div>
    </div>)
  )
}

export default Modal