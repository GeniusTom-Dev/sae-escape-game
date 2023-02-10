import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'

function Fingerprint() {

    const {username,closeWindow} = useContext(UserContext)
    const [fingerprintIndex,setFingerprintIndex] = useState(Math.round(Math.random() * (4 - 1) + 1))
    const [fingerprintList,setFingerprintList] = useState([1,2,3,4,5,6,7,8].sort(function () {
        return Math.random() -0.5;
    }))
    const [listClicked, setListClicked] = useState([])
    const [update,setUpdate] = useState({})
    const [gameState, setGameState] = useState(false)
    const anwser = [
        [1,4,6,7],
        [1,2,3,4],
        [1,2,3,4],
        [1,2,3,4],
    ]

    const verifWin = () => {
        let hasAllValue = true

        for(let i = 0; i < anwser[fingerprintIndex - 1].length; i++){
            if(listClicked.indexOf(anwser[fingerprintIndex - 1][i]) < 0){
                hasAllValue = false
            }
        }

        if(hasAllValue){
            setGameState("win")
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
            {/* faire en sorte qu'on doit faire 3 / 4 empreint dans un temps impartit  */}

            {!gameState && 
                <div className='w-full h-full flex'>
                    <h1 className='flex w-full absolute justify-center text-5xl font-hack mt-2'>Find matching footprints</h1>
                    <div className='w-1/2 h-full flex items-center justify-center'>
                        <img src={`./src/assets/fingerprint/finger-${fingerprintIndex}.webp`} alt="fingerprint" />
                    </div>

                    <div className='w-1/2 h-full grid grid-cols-2 justify-center content-center'>
                        {fingerprintList.map(nav => (
                            <img src={`./src/assets/fingerprint/finger-${fingerprintIndex}-${nav}.webp`} key={nav} data-index={nav} alt="fingerprint" className={`cursor-pointer ${listClicked.indexOf(nav) >=0 && `border-[1px] border-green-500 -m-[1px]`}`} onClick={clickFinger}/>
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
                <div className='w-full h-full flex flex-col justify-center items-center font-hack text-6xl text-center'>
                    <h1>Dommage !</h1>
                    <h1>Relancer le jeu pour retenter votre chance</h1>
                </div>
            }
        </div>
        
    </div>
  )
}

export default Fingerprint