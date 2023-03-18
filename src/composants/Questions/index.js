
import { memo } from "react"
import { FaChevronRight } from "react-icons/fa"

const Questions = ({suivant, precedent, question, selectedOption, firstLastQuestion,handleSelectedOption}) => {
    
  let bouton = null
  if(firstLastQuestion.firstQuestion === true && firstLastQuestion.lastQuestion === false ){
    bouton = <button disabled={!selectedOption.etat} className='btnSubmit' onClick={suivant}>Suivant</button>
  }else if(firstLastQuestion.firstQuestion === false && firstLastQuestion.lastQuestion === true){
    bouton = <>
      <button className='btnSubmit' onClick={precedent}>Précédent</button>
      <button disabled={!selectedOption.etat} className='btnSubmit' onClick={suivant}>Terminer</button>
    </>
  }else{
    bouton = <>
    <button className='btnSubmit' onClick={precedent}>Précédent</button>
    <button disabled={!selectedOption.etat} className='btnSubmit' onClick={suivant}>Suivant</button>
  </>
  }

  return (
      <div>
        <h2>{question?.question}</h2>
        {
         Array.isArray(question?.options) && 
         question?.options.map((option, index) => {
            return <p key={index} onClick={handleSelectedOption} className='answerOptions'><FaChevronRight />{option}</p>
          })
        } 
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          { bouton }
        </div>
      </div>
    );
}

export default memo(Questions)