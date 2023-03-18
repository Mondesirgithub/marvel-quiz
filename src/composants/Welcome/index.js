/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/firebase';
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout'
import Quiz from '../Quiz'
import Loader from '../Loader';


const Welcome = ({afficherNotif}) => {
        
    const navigate = useNavigate();

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    const [error , setError] = useState('')
    const [notif, setNotif] = useState(false)


    const afficherMonMessage = () => {
        afficherNotif('Déconnexion réussie', 'info')
    }

    useEffect(() => {
        //verifier si le user est authentifié
        const listener = onAuthStateChanged(auth, user => {
            if(user){
                setUserSession(user)
            }else{
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
            afficherNotif('Vous devez vous connecter d\'abord', 'warning')
            navigate('/')
        }
    }, [notif])

    return userSession === null ? (
        <Loader chargerMsg={'Authentification...'} styling={{textAlign: 'center', color: '#4f78a4'}} />
    ) 
    :
    (
        <div className="quiz-bg">
            <div className="container">
                <Logout afficherMonMessage={afficherMonMessage} />
                <Quiz afficherNotif={afficherNotif} error={error} userData={userData}/>
            </div>
        </div>
    )
}

export default Welcome
