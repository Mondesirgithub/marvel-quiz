/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, memo} from 'react'
import Level from '../Level'
import ProgressBar from '../ProgressBar'
import Questions from '../Questions'
import {QuizMarvel} from '../quizMarvel' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const properties = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "colored"
}

const afficherMessage =  (message, type) => {
  if(type === 'success'){
    toast.success(message, properties)
 }else if (type === 'warning'){
    toast.warn(message, properties)
  }else if (type === 'error'){
    toast.error(message, properties)
  } 
};


function ajouterElement(tableau, nouvelElement) {
  if(Array.isArray(tableau)){
    tableau.push(nouvelElement);
  }
  return tableau;
}

const Quiz = ({error, userData}) => {

  const selectedOptions = {
    prevReponse : [],
    actuelReponse : null,
    nextReponse : [],
    etat : false
  }

  const [level, setLevel] = useState(0)
  const [numeroQuestion, setNumeroQuestion] = useState(0)
  const [questions, setQuestions] = useState({})
  const [selectedOption, setSelectedOption] = useState({...selectedOptions})
  const [firstLastQuestion, setFirstLastQuestion] = useState({
    firstQuestion : false,
    lastQuestion : false
  })
  const [answersUser, setAnswersUser] = useState({})
  const [score, setScore] = useState(0)
  


  useEffect(() => {
      if(userData.pseudo !== undefined){
      afficherMessage(`Bonjour ${userData.pseudo}`,'warning')
      }
  }, [userData])

  useEffect(() => {
    const questions = level === 0 ? QuizMarvel[0].quizz.debutant : (level === 1 ? QuizMarvel[0].quizz.confirme : QuizMarvel[0].quizz.expert)
    setQuestions(questions)

    if(numeroQuestion === 0){
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: true,
        lastQuestion: false
      }))
    }else if(numeroQuestion === 9){
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

  const suivant = () => {
    if(numeroQuestion === 9){
      //setLevel(level + 1)
      //setNumeroQuestion(0)
      let sum = 0
      for(let i in answersUser){
        sum += (answersUser[i] === questions[i].answer.toString())
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

  
  useEffect(() => {
    if(!(questions[numeroQuestion] === undefined)){
      if(answersUser[numeroQuestion] === questions[numeroQuestion].answer){
        //afficherMessage('Bravo +1', 'success') 
      }else{
        //afficherMessage('Raté 0', 'error')     
      }
    }
  }, [answersUser])


  const handleSelectedOption = e => {
    e.target.style.backgroundColor = '#EB1D27'

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
      selectedOption.actuelReponse.style.backgroundColor = '#EB1D27'
      for(let i = 0; i < lesOptions.length; i++){
        if(lesOptions[i].style.backgroundColor === 'rgb(235, 29, 39)' && lesOptions[i] !== selectedOption.actuelReponse){
          lesOptions[i].style.backgroundColor = ''
        }
      }
    }

    return (
    <div>
      { error === '' ? null :  <span>{error.message}</span>}

      <Level level={level} />
      <ProgressBar numeroQuestion={numeroQuestion} questions={questions} />
      <Questions selectedOption={selectedOption} 
        suivant={suivant}
        precedent={precedent}
        firstLastQuestion={firstLastQuestion}
        handleSelectedOption={handleSelectedOption}
        question={questions[numeroQuestion]} />
      <ToastContainer />
    </div>
  )
  
}

export default memo(Quiz)