import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/firebase';
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout'
import Quiz from '../Quiz'


const Welcome = ({afficher}) => {
        
    const navigate = useNavigate();

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    const [error , setError] = useState('')
    const [notif, setNotif] = useState(false)


    const afficherMonMessage = () => {
        afficher('Déconnexion réussie')
    }

    useEffect(() => {
        //verifier si le user est authentifié
        const listener = onAuthStateChanged(auth, user => {
            if(user){
                setUserSession(user)
            }else{
                //navigate('/')
                setNotif(true)
            }
        })

        if (!!userSession) {
            const colRef = user(userSession.uid);

            getDoc(colRef) //recuperer les donnees du documents
            .then( data => {
                if (data.exists()) {
                    const docData = data.data(); // objet
                    setUserData(docData);
                }
            })
            .catch( error => {
                setError(error)
            })
        }

        return listener(); //clear le listener, phase de demontage
    }, [userSession])

    useEffect(() => {
        if(notif){
            //navigate('/') 
            afficher('Vous devez vous connecter d\'abord')
        }
    }, [notif, afficher, navigate])

    // return userSession === null ? (
    //     <Fragment>
    //         <div className="loader"></div>
    //         <p className="loaderText">Chargenent ...</p>
    //     </Fragment>
    // ) :
    return  (
        <div className="quiz-bg">
            <div className="container">
                <Logout afficherMonMessage={afficherMonMessage} />
                <Quiz error={error} userData={userData}/>
            </div>
        </div>
    )
}

export default Welcome
