import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';


const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      if (password.length > 5 && email !== '' && password !== '') {
          setBtn(true)
      }else{
        setBtn(false)
      }
  }, [password, email])

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
          setError(error);
      })

  }

  const errorMsg = error === '' ? null : <span>{error.message}</span>

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

                          <button disabled={!btn}>Connexion</button>

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