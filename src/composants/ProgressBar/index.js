import React from 'react'

const ProgressBar = ({numeroQuestion, questions}) => {
  
  const progression = (numeroQuestion+1) * 10
  return (
    <>
      <div className='percentage'>
        <div className='progressPercent'>
          Question {numeroQuestion+1}/{questions.length}
        </div>
        <div className='progressPercent'>
          Progression {progression}%
        </div>
      </div>
      <div className='progressBar'>
        <div className='progressBarChange' style={{width: `${progression}%`}}></div>
      </div>
    </>
  )
}

export default React.memo(ProgressBar)