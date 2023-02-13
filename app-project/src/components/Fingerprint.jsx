import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'

function Fingerprint() {

    const {username,closeWindow,fingerprintIndex,setFingerprintIndex,fingerprintList,setFingerprintList, gameState, setGameState, listClicked, setListClicked} = useContext(UserContext)
   
    const [update,setUpdate] = useState({})
    
    const anwser = [
        [1,4,6,7],
        [1,2,3,4],
        [1,2,3,4],
        [1,2,3,4],
    ]

    const verifWin = () => {
        let hasAllValue = true

        for(let i = 0; i < anwser[fingerprintIndex[0] - 1].length; i++){
            if(listClicked.indexOf(anwser[fingerprintIndex[0] - 1][i]) < 0){
                hasAllValue = false
            }
        }

        if(hasAllValue){
            if(fingerprintIndex.length > 1){
                let newlist = fingerprintIndex
                newlist.splice(0,1)
                setFingerprintIndex(newlist)

                setFingerprintList([1,2,3,4,5,6,7,8].sort(function () {
                    return Math.random() - 0.5;
                }))

                setListClicked([])

                setUpdate({})

            }else{
                setGameState("win")
            }
        }else{
            setGameState("loose")
        }
    }

    const clickFinger = (e) => {
        if(listClicked.length < 4){
            if(listClicked.includes(parseInt(e.target.dataset.index))){
                const index = listClicked.indexOf(parseInt(e.target.dataset.index));
                let tempData = listClicked
                tempData.splice(index, 1);
                setListClicked(tempData)
                setUpdate({})
            }else{
                let tempData = listClicked
                tempData.push(parseInt(e.target.dataset.index))
                setListClicked(tempData)
                setUpdate({})
                if(listClicked.length == 4){
                    verifWin()
                }
            }
        }
    }

    const removeLastItem = (list) => {
        let newlist = list
        newlist.pop()
        return newlist
    }

    const restartQuiz = () => {
        setFingerprintIndex(removeLastItem([1,2,3,4].sort(function () {
            return Math.random() - 0.5;
        })))

        setFingerprintList([1,2,3,4,5,6,7,8].sort(function () {
            return Math.random() - 0.5;
        }))

        setListClicked([])

        setGameState(false)
    }

  return (
    <div className='w-2/3 h-2/3  relative rounded-lg'>
        <div className='bg-[#181818] w-full h-6 absolute rounded-t-lg'>
            <div className='absolute left-1/2 -translate-x-1/2'>{username}: ~/Fingerprint</div>
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

        <div className='bg-black w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex'>

            {!gameState && 
                <div className='w-full h-full flex'>
                    <div className='w-1/2 h-full flex items-center justify-center'>
                        <img src={`./src/assets/fingerprint/finger-${fingerprintIndex[0]}.webp`} alt="fingerprint" className='h-[90%]'/>
                    </div>

                    <div className='w-[70%] p-0 grid grid-cols-3 justify-center content-center'>
                    <h1 className='flex w-full justify-center text-lg font-hack mt-2'>Trouver les bout d'empreintre correspondantes</h1>
                        {fingerprintList.map(nav => (
                            <img src={`./src/assets/fingerprint/finger-${fingerprintIndex[0]}-${nav}.webp`} key={nav} data-index={nav} alt="fingerprint" className={`cursor-pointer  w-1/2 ${listClicked.indexOf(nav) >=0 && `border-[1px] border-green-500 -m-[1px]`}`} onClick={clickFinger}/>
                        ))}
                    </div>
                </div>
            }

            {gameState == "win" && 
                <div className='w-full h-full flex flex-col justify-center items-center font-hack text-6xl'>
                    <h1>Felicitation</h1>
                    <h1>Le code dechiffrer est : {import.meta.env.VITE_REACT_APP_FINGERPRINT_CODE}</h1>
                </div>
            }

            {gameState == "loose" && 
                <div className='w-full h-full flex flex-col justify-center items-center font-hack'>
                    <div className='font-hack flex flex-col justify-center text-center text-6xl'>
                        <h1>Dommage</h1>
                        <h1>Relancer le jeu pour retenter votre chance</h1>
                    </div>
                    <div className='font-hack border-[1px] p-4 rounded-lg cursor-pointer text-4xl mt-8' onClick={restartQuiz}>Relancer</div>
                </div>
            }


        </div>
        
    </div>
  )
}

export default Fingerprint