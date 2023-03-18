/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, memo} from 'react'
import Level from '../Level'
import ProgressBar from '../ProgressBar'
import Questions from '../Questions'
import {QuizMarvel} from '../quizMarvel'
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver'


function ajouterElement(tableau, nouvelElement) {
  if(Array.isArray(tableau)){
    tableau.push(nouvelElement);
  }
  return tableau;
}

const Quiz = ({error, userData,afficherNotif}) => {
  const [level, setLevel] = useState(0)
  const [numeroQuestion, setNumeroQuestion] = useState(0)
  const [questions, setQuestions] = useState({})
  const [selectedOption, setSelectedOption] = useState({
    prevReponse : [],
    actuelReponse : null,
    nextReponse : [],
    etat : false
  })
  const [firstLastQuestion, setFirstLastQuestion] = useState({
    firstQuestion : false,
    lastQuestion : false
  })
  const [answersUser, setAnswersUser] = useState({})
  const [score, setScore] = useState(0)
  const [notif, setNotif] = useState(false)

 

  useEffect(() => {
      if(userData.pseudo !== undefined){
        setNotif(true)
      }
      
  }, [userData])

  useEffect(() => {
    if(notif){
      afficherNotif(`Salut ${userData.pseudo} et bonne chance 😉`,'default')
      setNotif(false)
    }    
  },[notif])

  useEffect(() => {
    const questions = level === 0 ? QuizMarvel[0].quizz.debutant : (level === 1 ? QuizMarvel[0].quizz.confirme : QuizMarvel[0].quizz.expert)
    setQuestions(questions)

    if(numeroQuestion === 0){
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: true,
        lastQuestion: false
      }))
    }else if(numeroQuestion === questions.length-1){
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: false,
        lastQuestion: true
      }))
    }else{
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: false,
        lastQuestion: false
      }))
    }

  }, [level, numeroQuestion])

  const lesOptions = document.querySelectorAll('p.answerOptions')

  const precedent = () => {
    setNumeroQuestion(numeroQuestion - 1)
    setSelectedOption(prevState => ({
      ...prevState,
      nextReponse : ajouterElement(prevState.nextReponse, prevState.actuelReponse),
      actuelReponse : prevState.prevReponse.length === 0 ? null : prevState.prevReponse.pop(),
      etat : true
    }))
  }

  const niveauSuivant = () => {
    setLevel(level + 1)
    setNumeroQuestion(0)
  }

  const rejouer = () => {
    setNumeroQuestion(0)
  }

  const recommencer = () => {
    setLevel(0)
    setNumeroQuestion(0)
  }


  const suivant = () => {
    if(numeroQuestion === 9){
      setNumeroQuestion(numeroQuestion + 1)
      let sum = 0
      for(let i in answersUser){
        sum += (answersUser[i].toString() === questions[i].answer.toString())
      }
      setScore(sum)
    }else{
      setNumeroQuestion(numeroQuestion + 1)
    }
    
    setSelectedOption(prevState => ({
      ...prevState,
      prevReponse : ajouterElement(prevState.prevReponse, prevState.actuelReponse),
      actuelReponse : prevState.nextReponse.length === 0 ? null : prevState.nextReponse.pop()
    }))

    setSelectedOption(prevState => ({
      ...prevState,
      etat : prevState.actuelReponse === null ? false : true
    }))    
  }


  const handleSelectedOption = e => {
    e.target.style.backgroundColor = '#4f78a4'

    setSelectedOption(prevState => ({
      ...prevState,
      prevReponse: ajouterElement(prevState.prevReponse, e.target),
      actuelReponse: e.target,
      etat : true
    }))

    setAnswersUser(prevState => ({
      ...prevState,
        [numeroQuestion] : selectedOption.prevReponse.length === 0 ? null : selectedOption.prevReponse[selectedOption.prevReponse.length-1].textContent
      }
    ))
  }


    if(!selectedOption.actuelReponse){
      for(let i = 0; i < lesOptions.length; i++){
        lesOptions[i].style.backgroundColor = ''
      }
    }else{
      selectedOption.actuelReponse.style.backgroundColor = '#4f78a4'
      for(let i = 0; i < lesOptions.length; i++){
        if(lesOptions[i].style.backgroundColor === 'rgb(79, 120, 164)' && lesOptions[i] !== selectedOption.actuelReponse){
          lesOptions[i].style.backgroundColor = ''
        }
      }
    }

    return numeroQuestion === questions.length ? (
      <QuizOver questions={questions} answersUser={answersUser} 
        score={score} 
        niveauSuivant={niveauSuivant} 
        rejouer={rejouer}
        recommencer={recommencer}
        level={level}
        />
    ) : (
    <div>
      <Level level={level} />
      <ProgressBar numeroQuestion={numeroQuestion} questions={questions} />
      <Questions selectedOption={selectedOption} 
        suivant={suivant}
        precedent={precedent}
        firstLastQuestion={firstLastQuestion}
        handleSelectedOption={handleSelectedOption}
        question={questions[numeroQuestion]} />
    </div>
  )
  
}

export default memo(Quiz)