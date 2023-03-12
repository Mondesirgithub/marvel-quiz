import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';



const Logout = ({afficherMonMessage}) => {

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {
                setTimeout(() => {
                    navigate('/', {replace: true})
                }, 500);
            }).catch((error) => {
                setError(error)
            });
        }
    }, [checked, navigate]);

    const handleChange = event => {
        setChecked(event.target.checked);
    }

    return (
        <div className="logoutContainer">
            {
                error === '' ? null : <span>{error.message}</span>
            }
            <label className="switch">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    onClick={afficherMonMessage}
                    checked={checked}
                />
                <span className="slider round" data-tip="Déconnexion"></span>
            </label>
        </div>
    )
}

export default React.(Logout)
