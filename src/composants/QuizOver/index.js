/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import { useState, memo, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa'
import {GiTrophyCup} from 'react-icons/gi'
import Loader from '../Loader';
import Modal from '../Modal';

const QuizOver = ({questions , answersUser, score, niveauSuivant,rejouer,recommencer, level}) => {

  const [ouvrirModal, setOuvrirModal] = useState(false)
  const [caracterInfos, setCaracterInfos] = useState([])
  const [loading, setLoading] = useState(true)

  const bravo = <FaCheckCircle color='green'/>
  const rate = <FaTimesCircle color='red' />

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_APP_KEY
  const hash = 'ab221b7acbc4b8caf1638489c621dfcb'
  
  useEffect(() => {

    if(localStorage.getItem('MarvelStorageDate')){
      const date = localStorage.getItem('MarvelStorageDate')
      checkDataAge(date)
    }

  }, [])
  

  const checkDataAge = date => {
    const today = Date.now()
    const timeDifference = today - date
    const daysDifference = timeDifference/(1000*3600*24)
    if(daysDifference < 15){
      //si les donnees sont agees de plus de 15jours
      localStorage.clear()
      localStorage.setItem('MarvelStorageDate', Date.now())
    }
  }

  const afficherModal = id => {

    setOuvrirModal(true)

    if(!localStorage.getItem(id)){
      axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
      .then(response => {
        setCaracterInfos(response.data)
        setLoading(false)
  
        localStorage.setItem(id, JSON.stringify(response.data))
  
        if(!localStorage.getItem('MarvelStorageDate')){ //si la cle n'existe pas dans le localStorage
          localStorage.setItem('MarvelStorageDate', Date.now())
        }
      
      })
      .catch(error => console.log("Erreur : ",error))
    }else{
      setCaracterInfos(JSON.parse(localStorage.getItem(id)))
      setLoading(false)
    }
  }


  const masquerMoal = () => {
    setOuvrirModal(false)
    setLoading(true)
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase()+string.slice(1)
  }

  const resultInModal = !loading ? (
      <Modal afficherModal={ouvrirModal}>
        <div className='modalHeader'>
          <h2>{caracterInfos.data.results[0].name}</h2>
        </div>
        <div className='modalBody'>
          <div className='comicImage'>
            <img src={`${caracterInfos.data.results[0].thumbnail.path}.${caracterInfos.data.results[0].thumbnail.extension}`} alt={`Image de ${caracterInfos.data.results[0].name}`}/>
            <p>{caracterInfos.attributionText}</p>
          </div>
          <div className='comicDetails'>
            <h3>Description</h3>
            {
              caracterInfos.data.results[0].description ?
              <p>{caracterInfos.data.results[0].description}</p>
              : <p>Description indisponible ...</p>
            }
            <h3>Plus d'infos</h3>
            {
              caracterInfos.data.results[0].urls && 
              Array.isArray(caracterInfos.data.results[0].urls) &&
              caracterInfos.data.results[0].urls.map((url, index) =>{
                return <a key={index} href={url.url} target='_blank' rel='noopener noreferrer'>
                  {capitalizeFirstLetter(url.type)}
                </a>
              })
            }
          </div>
        </div>
        <div className='modalFooter'>
          <button className='modalBtn' onClick={masquerMoal}>Fermer</button>
        </div>
    </Modal>
  )
  :
  (
    <>
      <Modal afficherModal={ouvrirModal}>
        <div className='modalHeader'>
        </div>
        <div className='modalBody'>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h2 style={{textAlign: 'center'}}>En attente des informations du site de Marvel ...</h2>
            <Loader />
          </div>
        </div>
        <div className='modalFooter'>
          <button className='modalBtn' onClick={masquerMoal}>Fermer</button>
        </div>
      </Modal>
    </>
  )




  return (
    <>
    <div className='stepsBtnContainer'>
      {
        score < 5 ? (
          <>
          <p className='failureMsg' style={{textAlign: 'center'}}>Désolé, vous avez échoué 😭</p>
          <button className='btnResult success' onClick={rejouer}>Rejouer</button>
          </>
        ) 
        : 
        (
        level < 2 ? (
          <>
          <p className='successMsg'>Bravo, passez au niveau suivant 😊</p>
          <button className='btnResult success' onClick={niveauSuivant}>Niveau suivant</button>
          </>
        ) 
        : 
        (
          <>
          <p className='successMsg'><GiTrophyCup size='50px' /> Excéllent, vous avez terminé tout le quiz 😎</p>
          <button className='btnResult success' onClick={recommencer}>Recommencez le quizz</button>
          </>
        )
        )
      }
    </div>
    <div className='percentage container-fluid'>
      <div className='progressPercent'>Réussite: { score * 10 }%</div>
      <div className='progressPercent'>Note {score}/10</div>
    </div>
    <hr />
    <p>Les réponses aux questions posées :</p>
    <div className='answerContainer' style={{overflow: 'scroll'}}>
      <center>
      <table className='answers'>
        <thead>
          <tr>
            <th>Question</th>
            <th>Réponses</th>
            <th>Vos réponses</th>
            <th>Infos</th>
          </tr>
        </thead>
        <tbody>
          {
            score >= 5 ?
            (Array.isArray(questions) &&
            questions.map(question => {
              return <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}  </td>
                <td>{answersUser[question.id]} {answersUser[question.id].toString() === question.answer.toString() ? bravo : rate} </td>
                <td>
                  <button onClick={() => afficherModal(question.heroId)} className='btnInfo'>Infos</button>
                </td>
                
              </tr>
            }))
            :
            (
              <tr>
                <td colSpan="4">
                  <p style={{textAlign: 'center', color: 'red'}}>Vous ne pouvez pas voir les réponses ! car vous n'avez pas eu la moyenne</p>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      </center>
    </div>
    {ouvrirModal && resultInModal}
    </>
  )
}

export default memo(QuizOver)