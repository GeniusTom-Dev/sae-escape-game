import { useState } from 'react'
import { useContext, useEffect } from 'react'
import {Connection, Interface} from './components'
import { UserContext } from './context/userContext'
import { indice1, mobile, robot } from './assets'

const App = () => {

  const {modalState, setModalState, connected} = useContext(UserContext)
  const [showIndice, setShowIndice] = useState(false)
  const [showHelpBot,setShowHelpBot] = useState(true)

  const showConnectionPanel =  () => {
    if(connected){
      setModalState("interface")
      setShowHelpBot(false)
      setShowIndice(false)
    }else{
      setModalState("connectionPanel")
      setShowHelpBot(false)
      setShowIndice(false)
    }
  }

  const visibleIndice = () => {
    setShowIndice(true)
    setShowHelpBot(false)
  }

  const hideConnectionPanel =  () => {
    setModalState(false)
    setShowIndice(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.key == "Escape"){
        hideConnectionPanel()
      }
    };

    window.addEventListener("keydown", handleKeyDown);

  }, []);

  const hideBot = () => {
    setShowHelpBot(false)
  }


  return(
    <div className='w-full h-[100vh] bg-no-repeat bg-[url(./assets/pc-background.jpg)] bg-cover bg-bottom text-white'>
      <div className='bg-gradient-to-r from-[#139dff] to-[#c27bff] w-full h-full flex flex-col justify-center items-center lg:hidden'>
        <img src={mobile} alt="movile" className='w-1/3 mb-24'/>
        <h1 className='text-center text-2xl'>Escape the code n'est pas disponible sur votre appareil pour le moment rendez vous sur un ordinateur.</h1>
      </div>
      <div className='absolute w-[55%] h-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 cursor-pointer z-0 hidden lg:flex' onClick={showConnectionPanel}></div>
      <div className='absolute bottom-[5%] left-1/4 w-[35%] h-[15%] cursor-pointer hidden lg:flex' onClick={visibleIndice}></div>
      {modalState === "connectionPanel" && <Connection/>}
      {modalState === "interface" && <Interface/>}
      {showIndice && 
        <img src={indice1} alt="indice 1" className='absolute w-1/4 h-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      }

      {showHelpBot &&
        <div className="absolute bottom-0 left-4 hidden lg:flex flex-col items-center">
          <div className="bg-white w-full mb-6 rounded-lg p-4">
              <h1 className="text-black mb-4">Bienvenue dans Escape The Code !<br/>Je te laisse cliquer sur l'écran pour ouvrir l'ordinateur.</h1>
              <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
          </div>
          <img src={robot} alt="robot" />
        </div>
      }
    </div>
  )
}


export default App