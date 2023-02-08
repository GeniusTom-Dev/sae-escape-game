import React from 'react'
import { useContext, useRef } from 'react'
import { UserContext } from '../context/userContext'

function Terminal() {

    const {username,closeWindow,actionCommand,showData,currentFolder} = useContext(UserContext)
    const inputs = useRef([])

    const addInput = (el) => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }

    const updateScroll = () => {
        var terminalScreen = document.getElementById("screen");
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    const keyDown = async (e) => {
        if(e.key == "Enter"){
            actionCommand(e.target.value)
            inputs.current[0].value = ""
            setTimeout(updateScroll,1);
        }
    }

    

    

  return (
    <div className='w-2/3 h-2/3 bg-[#300a24] relative rounded-lg'>
        <div className='bg-[#181818] w-full h-6 absolute rounded-t-lg'>
            <div className='absolute left-1/2 -translate-x-1/2'>{username}: ~/escape-game</div>
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

        <div className='w-full h-[calc(100%-1.5rem)] absolute bottom-0 p-4 overflow-y-scroll' id='screen'>
            <h1>Pour connaitre les commande disponible utiliser la commande <code className='text-red-700'>help</code>.</h1>

            {showData && showData.map((nav,i) => (
                <div key={i}>
                    <div className='mt-8 flex'>
                            <h1 className='text-[#26a269]'>{username}:{nav.currentFolder}$</h1>
                        <p className='ml-4'>{nav.command}</p>
                    </div>

                    
                    <code className=''>{nav.returnText}</code>

                </div>

                
            ))}

            <div className='mt-8 flex'>
                <h1 className='text-[#26a269]'>{username}:{currentFolder}$</h1>
                <input autoFocus type="text" spellCheck={false} className='bg-transparent outline-none ml-4 w-full' ref={addInput} onKeyDown={keyDown}/>
            </div>
        </div>
        
    </div>
  )
}

export default Terminal