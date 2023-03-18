/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';
import Loader from '../Loader';


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');
  const [showLoader,setShowLoader] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {

    if(password !== '' && email !== '' && validateEmail(email) === true && password.length > 5){
        setBtn(true)
        setMessage('')
    }else{
        setBtn(false)
        setMessage('')
    }

    if (password !== '') {
        if(password.length > 5){
            setMessage('')
        }else{
            if(password.length <= 5){
            setBtn(false)
            setMessage('Le mot de passe doit avoir au moins 6 caractères')
            }
        }
    }else{
        setBtn(false)
        setMessage('')
    }
}, [password])

useEffect(() => {
    if(password !== '' && email !== '' && validateEmail(email) === true && password.length > 5){
        setBtn(true)
        setMessage('')
    }else{
        setBtn(false)
        setMessage('')
    }

    if(email !== ''){
        if(!validateEmail(email)){
            setBtn(false)
            setMessage('Veuillez entrer une adresse email valide')
        }
    }else{
        setBtn(false)
        setMessage('')
    }
}, [email])

  const handleSubmit = e => {
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
      .then(user => {
          navigate('/welcome', { replace: true}); // replace: true, pour empecher de revenir en arriere
          setError('')
          setEmail('');
          setPassword('');
      })
      .catch(error => {
          setError({
            ...error,
            message : 'Mot de passe et/ou adresse email incorrect(s), réessayer !'
          });
          setShowLoader(false)
      })

  }

  const errorMsg = error === '' ? null : <span>{error.message}</span>

  const handleShowLoader = () => {
    setShowLoader(true)
  }
  return (
      <div className="signUpLoginBox">
          <div className="slContainer">
              <div className="formBoxLeftLogin">
              </div>
              <div className="formBoxRight">
                  <div className="formContent">

                      {errorMsg}

                      <h2>Connexion</h2>
                      <form onSubmit={handleSubmit}>

                          <div className="inputBox">
                              <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                              <label htmlFor="email">Email</label>
                          </div>

                          <div className="inputBox">
                              <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                              <label htmlFor="password">Mot de passe</label>
                          </div>
                          <h6 style={{color: 'red'}}>{message}</h6>
                          <button disabled={!btn} onClick={handleShowLoader}>{showLoader ? 'Chargement...' : 'Connexion'}</button>
                          {
                            showLoader && <Loader Mystyle={{width: '15px', height: '15px'}} />
                          }

                      </form>
                      <div className="linkContainer">
                          <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.</Link><br />
                          <Link className="simpleLink" to="/forgotPassword">Mot de passe oublié</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login