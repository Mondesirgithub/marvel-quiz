import React from 'react'

const Level = ({level}) => {
  return (
    <div className='levelsContainer'>
      <h2 className='headingLevels'>
        {level === 0 ? 'Débutant' : (level === 1 ? 'Confirmé' : 'Expert')}
      </h2>
    </div>
  )
}

export default Level