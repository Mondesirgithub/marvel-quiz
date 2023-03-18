import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Lading = () => {
  const refMain = useRef(null)
  const [boutons, setBoutons] = useState(false)

  useEffect(() => {
     // lors du montage, on ajoute les griffres
     refMain.current.classList.add('startingImg')
     setTimeout(() => {
        // Au bout de 1 seconde on retire les griffres
        refMain.current.classList.remove('startingImg')
        setBoutons(true)
     }, 500);
  }, [])

  const setLeftImage = () => {
    refMain.current.classList.add('leftImg')
  }

  const setRightImage = () => {
    refMain.current.classList.add('rightImg')
  }

  const clearImage = () => {
    if(refMain.current.classList.contains('leftImg')){
        refMain.current.classList.remove('leftImg')
    }else if(refMain.current.classList.contains('rightImg')){
        refMain.current.classList.remove('rightImg')
    }
  }

  const AfficherBoutons = boutons && <>
                <div onMouseOver={setLeftImage}
                onMouseOut={clearImage} className='leftBox'>
                    <Link className='btn-welcome' to='/signup'>Inscription</Link>
                </div>
                <div onMouseOver={setRightImage} onMouseOut={clearImage} className='rightBox'>
                    <Link className='btn-welcome' to='/login'>Connexion</Link>
                </div>
            </>
  
  return (
    <main ref={refMain} className='welcomePage'>
        {AfficherBoutons}
    </main>
  )
}

export default Lading