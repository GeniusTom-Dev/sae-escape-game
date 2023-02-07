import { useEffect } from 'react'
import { useState } from 'react'
import {Connection, Interface} from './components'

const App = () => {

  const [showConnection, setShowConnection] = useState("interface")

  const showConnectionPanel =  () => {
    setShowConnection("connectionPanel")
  }

  const hideConnectionPanel =  () => {
    setShowConnection(false)
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
    <div className='w-full h-[100vh] bg-no-repeat bg-[url(./assets/pc-background2.jpg)] bg-cover bg-bottom text-white'>
      <div className='absolute w-[55%] h-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 cursor-pointer' onClick={showConnectionPanel}></div>
      {showConnection === "connectionPanel" && <Connection/>}
      {showConnection === "interface" && <Interface/>}
    </div>
  )
}


export default App