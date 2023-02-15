import React, { useContext, useEffect, useState } from 'react'
import { cross, finger_1, finger_2, finger_3, finger_4, minus, square,finger_1_1,finger_1_2,finger_1_3,finger_1_4,finger_1_5,finger_1_6,finger_1_7,finger_1_8,finger_2_1,finger_2_2,finger_2_3,finger_2_4,finger_2_5,finger_2_6,finger_2_7,finger_2_8,finger_3_1,finger_3_2,finger_3_3,finger_3_4,finger_3_5,finger_3_6,finger_3_7,finger_3_8,finger_4_1,finger_4_2,finger_4_3,finger_4_4,finger_4_5,finger_4_6,finger_4_7,finger_4_8, } from '../assets'
import { UserContext } from '../context/userContext'

function Fingerprint() {

    const {username,closeWindow,fingerprintIndex,setFingerprintIndex,fingerprintList,setFingerprintList, gameState, setGameState, listClicked, setListClicked} = useContext(UserContext)
   
    const [update,setUpdate] = useState({})
    
    const anwser = [
        [0,3,5,6],
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3],
    ]

    const fingerPrintAssets = [
        [finger_1_1,finger_1_2,finger_1_3,finger_1_4,finger_1_5,finger_1_6,finger_1_7,finger_1_8,],
        [finger_2_1,finger_2_2,finger_2_3,finger_2_4,finger_2_5,finger_2_6,finger_2_7,finger_2_8,],
        [finger_3_1,finger_3_2,finger_3_3,finger_3_4,finger_3_5,finger_3_6,finger_3_7,finger_3_8,],
        [finger_4_1,finger_4_2,finger_4_3,finger_4_4,finger_4_5,finger_4_6,finger_4_7,finger_4_8,]
    ]

    const fullFingerPrintAssets = [
        finger_1, finger_2, finger_3, finger_4
    ]

    const verifWin = () => {
        let hasAllValue = true

        for(let i = 0; i < anwser[fingerprintIndex[0]].length; i++){
            if(listClicked.indexOf(anwser[fingerprintIndex[0]][i]) < 0){
                hasAllValue = false
            }
        }

        if(hasAllValue){
            if(fingerprintIndex.length > 1){
                let newlist = fingerprintIndex
                newlist.splice(0,1)
                setFingerprintIndex(newlist)

                setFingerprintList([0,1,2,3,4,5,6,7].sort(function () {
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
        setFingerprintIndex(removeLastItem([0,1,2,3].sort(function () {
            return Math.random() - 0.5;
        })))

        setFingerprintList([0,1,2,3,4,5,6,7].sort(function () {
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
                    <img src={minus} alt="minus" className='w-2'/>
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src={square} alt="square" className='w-2'/>
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src={cross} alt="cross" className='w-2'/>
                </div>
            </div>
        </div>

        <div className='bg-black w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex'>

            {!gameState && 
                <div className='w-full h-full flex'>
                    <div className='w-1/2 h-full flex items-center justify-center'>
                        <img src={fullFingerPrintAssets[fingerprintIndex[0]]} alt="fingerprint" className='h-[90%]'/>
                    </div>

                    <div className='w-[70%] p-0 grid grid-cols-3 justify-center content-center'>
                    <h1 className='flex w-full justify-center text-lg font-hack mt-2'>Trouver les bouts d'empreinte correspondantes</h1>
                        {fingerprintList.map(nav => (
                            <img src={fingerPrintAssets[fingerprintIndex[0]][nav]} key={nav} data-index={nav} alt="fingerprint" className={`cursor-pointer  w-1/2 ${listClicked.indexOf(nav) >=0 && `border-[1px] border-green-500 -m-[1px]`}`} onClick={clickFinger}/>
                        ))}
                    </div>
                </div>
            }

            {gameState == "win" && 
                <div className='w-full h-full flex flex-col justify-center items-center font-hack text-6xl'>
                    <h1>Felicitation</h1>
                    <h1>Le code dechiffré est : {import.meta.env.VITE_REACT_APP_FINGERPRINT_CODE}</h1>
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