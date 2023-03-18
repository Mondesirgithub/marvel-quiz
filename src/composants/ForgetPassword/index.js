// Firebase 9
import React, { useState, useEffect } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader';

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [showLoader,setShowLoader] = useState(false)
    const [message, setMessage] = useState('')
    const [btn, setBtn] = useState(false)

    useEffect(() => {
        if(email !== ''){
            if(!validateEmail(email)){
                setMessage('Veuillez entrer une adresse email valide')
                setBtn(false)
            }else{
                setBtn(true)
                setMessage('')
            }
        }else{
            setBtn(false)
            setMessage('')
        }
    }, [email])

    const handleSubmit = e => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError(null);
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
            setTimeout(() => {
                navigate('/login')
            }, 5000)
        })
        .catch(error => {
            setError(error);
            setError({
                ...error,
                message : 'l\'utilisateur est introuvable, réessayer !'
              });
              setShowLoader(false)
        })

    }
    const handleShowLoader = () => {
        setShowLoader(true)
      }
    

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {
                            success && <span
                                style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <h3 style={{color: 'red'}}>{message}</h3>
                            <button disabled={!btn} onClick={handleShowLoader}>{showLoader ? 'Envoi du mail...' : 'Récupérer'}</button>
                            {
                                showLoader && <Loader Mystyle={{width: '15px', height: '15px'}} />
                            }
                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
