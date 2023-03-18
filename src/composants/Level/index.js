import React from 'react'
import Stepper from 'react-stepper-horizontal'

const Level = ({level}) => {
  return (
    <div className='levelsContainer'>
      <Stepper steps={ [
        {title: 'Débutant'}, 
        {title: 'Confirmé'}, 
        {title: 'Expert'}, 
        ] 
        } 
        activeStep={ level }
        circleTop={0}
        activeTitleColor={'#4f78a4'}
        activeColor={'#4f78a4'}
        completeTitleColor={'#4f78a4'}
        defaultTitleColor={'#4f78a4'}
        completeColor={'#4f78a4'}
        completeBarColor={'#4f78a4'}
        barStyle={'dashed'}
        size={45}
        circleFontSize={20}
        />
    </div>
  )
}

export default Level