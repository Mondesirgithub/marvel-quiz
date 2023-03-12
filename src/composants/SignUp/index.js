import React, {useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';
import { user } from '../Firebase/firebase';

const SignUp = () => {
  
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [champsValides, setChampsValides] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();
  
  useEffect(() => {
    if(pseudo === '' || email === '' || password === '' || confirmPassword === ''){
      setChampsValides(false)
    }else{
      setMessage('')
      if(password === confirmPassword){
        setChampsValides(true)
        setMessage('')
      }else{
        setMessage("Les mots de passe ne correspondent pas !")
        setChampsValides(false)
      }
    }
  }, [pseudo, email, password, confirmPassword])

  const handlePseudo = e => {
    setPseudo(e.target.value)
  }
  
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then( authUser => {
        return setDoc(user(authUser.user.uid), {
            pseudo,
            email
        });
    })
    .then(() => {
        navigate('/welcome', { replace: true}) //rediriger vers le composant Welcome apres inscription et empecher que l'on revienne en arriere
        setError('')
        setPseudo('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    })
    .catch(error => {
        setError(error);
    })
}

  // gestion erreurs
  const errorMsg = error === '' ? null : (<span>{error.message}</span>);


  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftSignup'></div>
            <div className='formBoxRight'> 
              <div className='formContent'>
                {errorMsg}
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                  <div className='inputBox'>
                    <input value={pseudo} onChange={handlePseudo} type="text" id="pseudo" autoComplete='off' required />
                    <label htmlFor='pseudo'>Pseudo</label>
                  </div>
                  <div className='inputBox'>
                    <input value={email} onChange={handleEmail} type="email" id="email" autoComplete='off' required />
                    <label htmlFor='email'>Email</label>
                  </div>
                  <div className='inputBox'>
                    <input value={password} onChange={handlePassword} type="password" id="password" autoComplete='off' required />
                    <label htmlFor='password'>Mot de passe</label>
                  </div>
                  <div className='inputBox'>
                    <input value={confirmPassword} onChange={handleConfirmPassword} type="password" id="confirmPassword" autoComplete='off' required />
                    <label htmlFor='confirmPassword'>Confirmez le mot de passe</label>
                  </div>                  
                  <h3 style={{color: 'red'}}>{message}</h3>
                  <button disabled={!champsValides}>S'inscrire</button>
                </form>
                <div className='linkContainer'>
                  <Link className='simpleLink' to='/login'>Déjà inscrit ? connectew-vous</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp