import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

function Connection() {

  const { setModalState, username } = useContext(UserContext)
  const [errorMessage,setErrorMessage] = useState("")

  const date = new Date()
  const timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`
  
  const keyDown = (e) => {
    if(e.key === "Enter"){
      if(e.target.value === import.meta.env.VITE_REACT_APP_COMPUTER_PASSWORD){
        setModalState("interface")
        setErrorMessage("")
        sessionStorage.setItem("connected", true)
      }else{
        setErrorMessage("Mot de passe incorrect")
      }
    }else if(e.key == "Backspace"){
      setErrorMessage("")
    }
  }

  return (
    <div className="relative w-4/5 h-4/5 bg-[#292929] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-lg">
        <div className='absolute top-0 left-1/2 -translate-x-1/2'>{timestamp}</div>

        <div className='absolute right-4 top-2 w-16 flex justify-between items-center'>
          <img src="./src/assets/wifi.svg" alt="battery" className='w-4'/>
          <img src="./src/assets/volume.svg" alt="battery" className='w-4'/>
          <img src="./src/assets/battery.svg" alt="battery" className='w-4 -rotate-90'/>
        </div>

        <div className='w-60 h-96 flex flex-col justify-center items-center'>
          <img src="./src/assets/casali.jpg" alt="profileImg" className='w-24 h-24 rounded-full border-2'/>
          <h1 className='my-4'>{username}</h1>
          <input autoFocus type="password" placeholder='Mot de passe' className='bg-transparent border-orange-400 border-2 rounded-md outline-none pl-2 py-1' onKeyDown={keyDown}/>
          <div>{errorMessage}</div>
        </div>

        <img src="./src/assets/ubuntu.png" alt="ubuntu logo" className='absolute w-1/5 bottom-8 left-1/2 -translate-x-1/2'/>
    </div>
  )
}

export default Connection