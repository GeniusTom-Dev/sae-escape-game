import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { questions } from '../constants'

function Quiz() {

    const {username, closeWindow, progressBar,setProgressBar,questionIndex, setQuestionIndex,quizError, setQuizError} = useContext(UserContext)
    const [value, setValue] = useState()

    const shuffle = (list) => {
        list.sort(function () {
            return Math.random() - 0.5;
        })
        return list
    }

    const checkAnwser = (value) => {
        if(value == questions[questionIndex].correctAnwser){
            if(questionIndex == 4){
                setQuestionIndex('win')
            }else{
                let newIndex = questionIndex
                newIndex += 1
                setQuestionIndex(newIndex)
                setProgressBar(`w-${newIndex}/5`)
                setValue({})
            }
            
        }else{
            if(quizError < 2){
                let errorValue = quizError
                errorValue += 1
                setQuizError(errorValue)
            }else{
                setQuestionIndex('loose')
            }
        }
    }

    const selectAnwser = (e) => {
        if(!e.target.dataset.anwser){
            if(e.target.parentElement.dataset.anwser){
              checkAnwser(e.target.parentElement.dataset.anwser)
            }
        }else{
            checkAnwser(e.target.dataset.anwser)
        }
    }
    
    const restartQuiz = () => {
        setQuestionIndex(0)
        setQuizError(0)
        setProgressBar("w-[0%]")
    }

  return (
    <div className='w-2/3 h-2/3  relative rounded-lg'>
        <div className='bg-[#181818] w-full h-6 absolute rounded-t-lg'>
            <div className='absolute left-1/2 -translate-x-1/2'>{username}: ~/Quiz</div>
            <div className='w-16 absolute right-2 flex flex-row justify-around top-1/2 -translate-y-1/2 cursor-pointer' onClick={closeWindow}>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src="./src/assets/icons/minus.svg" alt="minus" className='w-2'/>
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src="./src/assets/icons/square.svg" alt="square" className='w-2'/>
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src="./src/assets/icons/cross.svg" alt="cross" className='w-2'/>
                </div>
            </div>
        </div>

        <div className='bg-[#181a20] w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex flex-col items-center justify-around pt-4'>

            {typeof questionIndex == "number" && <h1 className='absolute top-10 left-2 text-lg text-red-600'>Erreur : {quizError}</h1>}

            {typeof questionIndex == "number" &&
                <div className="bg-[#35383f] w-1/2 h-4 rounded-lg">
                    <div className={`bg-[#6949ff] h-full ${progressBar} transition-all duration-1000 rounded-lg`} ></div>
                </div>
            }

                {typeof questionIndex == "number" && <h1 className='mt-4 text-2xl'>{questions[questionIndex].question}</h1>}

                {typeof questionIndex == "number" &&
                        <div className='w-4/5 h-4/5 flex flex-col items-center justify-around'>
                            {questions[questionIndex].anwser.map((nav, i) => (
                                <div key={i} className='bg-[#1f222a] w-2/3 h-1/6 hover:border-[1px] rounded-lg flex items-center justify-center cursor-pointer' data-anwser={nav} onClick={selectAnwser}>
                                    <h1>{nav}</h1>
                                </div>
                            ))}
                        </div>
                }

                {questionIndex == "win" && 
                    <div className='w-full h-full flex flex-col justify-center items-center font-hack text-6xl'>
                        <h1>Felicitation</h1>
                        <h1>Le code dechiffrer est : {import.meta.env.VITE_REACT_APP_QUIZ_CODE}</h1>
                    </div>
                }

                {questionIndex == "loose" && 
                    <div className='w-full h-full flex flex-col justify-around items-center  text-6xl'>
                        <div className='w-full font-hack flex flex-col justify-center items-center'>
                            <h1>Dommage</h1>
                            <h1 className='w-2/3 text-center'>Relancer le jeu pour retenter votre chance</h1>
                        </div>

                        <div className='font-hack border-[1px] p-4 rounded-lg cursor-pointer' onClick={restartQuiz}>Relancer</div>
                    </div>
                }
            

        </div>
        
    </div>
  )
}

export default Quiz