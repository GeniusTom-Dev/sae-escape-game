import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { battery, casali, robot, ubuntu, volume, wifi } from '../../assets'
import { UserContext } from '../../context/userContext'

function Connection() {

  const { setModalState, username,setConnected,showConnectionHelpBot,setShowConnectionHelpBot } = useContext(UserContext)
  const [errorMessage,setErrorMessage] = useState("")
  const [showHelpBot,setShowHelpBot] = useState(false)

  const date = new Date()
  const timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`
  
  const keyDown = (e) => {
    if(e.key === "Enter"){
      if(e.target.value === import.meta.env.VITE_REACT_APP_COMPUTER_PASSWORD){
        setModalState("interface")
        setErrorMessage("")
        setConnected(true)
      }else{
        setErrorMessage("Mot de passe incorrect")
      }
    }else if(e.key == "Backspace"){
      setErrorMessage("")
    }
  }

  useEffect(() => {
    if(!showConnectionHelpBot){
      setShowHelpBot(true)
      setShowConnectionHelpBot(true)
    }
  })

  const hideBot = () => {
    setShowHelpBot(false)
  }

  return (
    <div className="relative w-4/5 h-4/5 bg-[#292929] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-lg">
        <div className='absolute top-0 left-1/2 -translate-x-1/2'>{timestamp}</div>

        <div className='absolute right-4 top-2 w-16 flex justify-between items-center'>
          <img src={wifi} alt="battery" className='w-4'/>
          <img src={volume} alt="battery" className='w-4'/>
          <img src={battery} alt="battery" className='w-4 -rotate-90'/>
        </div>

        <div className='w-60 h-96 flex flex-col justify-center items-center'>
          <img src={casali} alt="profileImg" className='w-24 h-24 rounded-full border-2'/>
          <h1 className='my-4'>{username}</h1>
          <input autoFocus type="password" placeholder='Mot de passe' className='bg-transparent border-orange-400 border-2 rounded-md outline-none pl-2 py-1' onKeyDown={keyDown}/>
          <div>{errorMessage}</div>
        </div>

        <img src={ubuntu} alt="ubuntu logo" className='absolute w-1/5 bottom-8 left-1/2 -translate-x-1/2'/>

        {showHelpBot &&
          <div className="absolute bottom-0 left-4  flex flex-col items-center">
            <div className="bg-white w-full mb-6 rounded-lg p-4">
            <h1 className="text-black mb-4">Mince l'ordinateur est verouillé !<br/>Cherche sur le bureau si tu n'a pas laissé<br/>un indice sur le mot de passe.</h1>
                <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
            </div>
            <img src={robot} alt="robot" />
          </div>
        }
    </div>
  )
}

export default Connection