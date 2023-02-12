import { useContext,useRef } from "react"
import { UserContext } from "../context/userContext"

function Vision() {

    const {username, closeWindow} = useContext(UserContext)
    const inputs = useRef([])

    const addInput = el => {
      if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
      }
    } 

    const verifSentence = () => {
        let userSentece = `${inputs.current[0].value.toUpperCase()} ${inputs.current[1].value.toUpperCase()} ${inputs.current[2].value.toUpperCase()} ${inputs.current[3].value.toUpperCase()}`

        if(userSentece == import.meta.env.VITE_REACT_APP_CORRECT_END_SENTECE){
            console.log("correct")
        }else{
            console.log(userSentece, import.meta.env.VITE_REACT_APP_CORRECT_END_SENTECE)
            console.log("incorrect")
        }
    }


  return (
    <div className='w-2/3 h-2/3  relative rounded-lg'>
        <div className='bg-[#181818] w-full h-6 absolute rounded-t-lg'>
            <div className='absolute left-1/2 -translate-x-1/2'>{username}: ~/Vision</div>
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

        <div className='bg-[#9472d9] w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex flex-col items-center justify-center pt-4'>
            <h1 className="my-8">Set your login phrase in order :</h1>
            <div className="w-full flex justify-center my-8">
                <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
            </div>

            <div className="border-[1px] px-4 py-2 rounded-lg cursor-pointer" onClick={verifSentence}>Verifier</div>
        </div>
    </div>
  )
}

export default Vision