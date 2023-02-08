import { useState } from 'react'
import { useContext, useEffect } from 'react'
import {Connection, Interface} from './components'
import { UserContext } from './context/userContext'

const App = () => {

  const {modalState, setModalState} = useContext(UserContext)
  const [showIndice, setShowIndice] = useState(false)

  const showConnectionPanel =  () => {
    if(sessionStorage.getItem("connected")){
      setModalState("interface")
    }else{
      setModalState("connectionPanel")
    }
  }

  const visibleIndice = () => {
    setShowIndice(true)
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


  return(
    <div className='w-full h-[100vh] bg-no-repeat bg-[url(./assets/pc-background.jpg)] bg-cover bg-bottom text-white'>
      <div className='absolute w-[55%] h-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 cursor-pointer' onClick={showConnectionPanel}></div>
      <div className='absolute bottom-[5%] left-1/4 w-[35%] h-[15%] cursor-pointer' onClick={visibleIndice}></div>
      {modalState === "connectionPanel" && <Connection/>}
      {modalState === "interface" && <Interface/>}
      {showIndice && 
        <img src="./src/assets/indice1.png" alt="indice 1" className='absolute w-1/4 h-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      }
    </div>
  )
}


export default App