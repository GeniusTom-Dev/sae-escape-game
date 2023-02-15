import { useContext,useRef, useState } from "react"
import { UserContext } from "../context/userContext"

function Vision() {

    const {username, closeWindow,visionConnection,setVisionConnections} = useContext(UserContext)
    const inputs = useRef([])
    const [currentSection,setCurrentSection] = useState("main")
    const [percentage,setPercentage] = useState([0,0,"end"])
    const [update, setUpdate] = useState()

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

    const setMainSection = () => {
        setCurrentSection("main")
    }

    const setProtectionSection = () => {
        setCurrentSection("protection")
    }

    const upPercentage = (e) => {
        let id
        if(e.target.dataset.perc){
            id = e.target.dataset.percid         
        }else{
            id = e.target.parentElement.dataset.percid
        }

        let upValue = setInterval(() => {
            let beforeValue = percentage
            console.log(id);
            console.log(beforeValue[id]);
            if(beforeValue[id] + 1 < 100){
                console.log("ici");
                let newValue = beforeValue[id] 
                newValue += 1
                beforeValue[id] = newValue
                console.log(beforeValue);
                setPercentage(beforeValue);
                setUpdate({})

            }else{
                console.log(percentage);
                beforeValue[id] = "end"
                setPercentage(beforeValue);
                clearInterval(upValue)
            }
        }, 100)

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

        {!visionConnection &&
            <div className='bg-[#9472d9] w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex flex-col items-center justify-center'>
                <h1 className="my-8">Rentrez votre phrase de connection dans l'ordre :</h1>
                <div className="w-full flex justify-center my-8">
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                </div>

                <div className="border-[1px] px-4 py-2 rounded-lg cursor-pointer" onClick={verifSentence}>Verifier</div>
            </div>
        }

        {visionConnection &&
            <div className='bg-[#171717] w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex items-center justify-center'>
                <div className="bg-[#282828] w-[5%] h-full flex flex-col items-center justify-between py-2 z-[2]">
                    <div className="w-full flex flex-col items-center">
                        <img src="./src/assets/icons/shield.svg" alt="shield" className="w-3/5 mb-2 cursor-pointer" onClick={setMainSection}/>
                        <img src="./src/assets/icons/wand.svg" alt="wand" className="w-3/5 my-2 cursor-pointer" onClick={setProtectionSection}/>
                        <img src="./src/assets/icons/bell.svg" alt="notif" className="w-3/5 my-2 cursor-pointer"/>
                    </div>
                        
                    <div className="w-full flex flex-col items-center">
                        <img src="./src/assets/icons/user.svg" alt="user" className="w-3/5 my-2 cursor-pointer"/>
                        <img src="./src/assets/icons/gear.svg" alt="gear" className="w-3/5 mt-2 cursor-pointer"/>
                    </div>
                </div>

                <div className="w-[95%] h-full flex flex-col items-center justify-between">
                    <div className="w-full h-1/2">
                        <h1 className="mt-2 ml-4 text-xl">Vison</h1>

                        <div className="mt-10 ml-10"> 
                            <img src="./src/assets/icons/cross-red.svg" alt="red cross" className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-6"/>
                            <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 circle-animate-red-1"></div>
                            <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 circle-animate-red-2"></div>
                            <h1 className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-red-600 text-xl">VOTRE APPAREIL EST<br/><span className="text-4xl">ATTAQUÉ</span></h1>
                        </div>
                    </div>

                    {currentSection == "main" &&
                        <div className="w-full h-1/2 flex justify-center">
                            <div className="bg-[#282828] w-[90%] h-full">
                                <div className="w-full h-1/5 flex items-center border-b-[1px] border-[#171717]">
                                    <h1 className="ml-4">PROTECTION</h1>
                                </div>

                                <div className="flex w-full h-full">
                                    <div className="w-1/4 h-4/5 flex flex-col justify-center items-center">
                                        <img src="./src/assets/icons/shield.svg" alt="shield" className="w-6 mb-2"/>
                                        <h1 className="text-center mt-2">Analyse des protections</h1>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col items-center text-center">
                                        <h1 className="absolute top-2">PROTECTION DES APPLICATIONS</h1>
                                        <h1 className="absolute top-1/2 -translate-y-1/2 text-4xl">4</h1>
                                        <h2 className="absolute bottom-2">App menacé</h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-around items-center text-center">
                                        <h1 className="absolute top-2">PROTECTION DES FICHIERS</h1>
                                        <h1 className="absolute top-1/2 -translate-y-1/2 text-4xl">16</h1>
                                        <h2 className="absolute bottom-2">Fichiers menacé</h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-around items-center text-center">
                                        <h1 className="absolute top-2">PROTECTION WEB</h1>
                                        <h1 className="absolute top-1/2 -translate-y-1/2 text-4xl">43</h1>
                                        <h2 className="absolute bottom-2">Attaque bloqué</h2>
                                    </div>
                                </div>
                            </div>

                        </div>                    
                    }

                    {currentSection == "protection" &&
                        <div className="w-full h-1/2 flex justify-center">
                            <div className="bg-[#282828] w-[90%] h-full">
                                <div className="w-full h-1/5 flex items-center border-b-[1px] border-[#171717]">
                                    <h1 className="ml-4">PROTECTION</h1>
                                </div>

                                <div className="flex w-full h-full">
                                    <div className="w-1/4 h-4/5 flex flex-col justify-center items-center">
                                        <img src="./src/assets/icons/shield.svg" alt="shield" className="w-6 mb-2"/>
                                        <h1 className="text-center mt-2">Analyse des protections</h1>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-center items-center text-center cursor-pointer" data-percid="0" onClick={upPercentage}>
                                        <h1 className="absolute top-2">NETOYAGE DES APPLICATIONS</h1>
                                        <img src="./src/assets/icons/clean.svg" alt="clean icons" className="w-6"/>
                                        <h2 className="absolute bottom-2">
                                            {percentage[0] != "end" && percentage[0] + "%"}
                                            {percentage[0] == "end" && <img src="./src/assets/icons/check-green.svg" alt="check green" className="w-4"/>}
                                        </h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-center items-center text-center cursor-pointer" data-percid="1" onClick={upPercentage}>
                                        <h1 className="absolute top-2">NETOYAGE DES FICHIERS</h1>
                                        <img src="./src/assets/icons/clean.svg" alt="clean icons" className="w-6"/>
                                        <h2 className="absolute bottom-2">
                                            {percentage[1] != "end" && percentage[1] + "%"}
                                            {percentage[1] == "end" && <img src="./src/assets/icons/check-green.svg" alt="check green" className="w-4"/>}
                                        </h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-center items-center text-center cursor-pointer" data-percid="2" onClick={upPercentage}>
                                        <h1 className="absolute top-2">NETOYAGE WEB</h1>
                                        <img src="./src/assets/icons/clean.svg" alt="clean icons" className="w-6"/>
                                        <h2 className="absolute bottom-2">
                                            {percentage[2] != "end" && percentage[2] + "%"}
                                            {percentage[2] == "end" && <img src="./src/assets/icons/check-green.svg" alt="check green" className="w-4"/>}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                        </div>                    
                    }

                    <div>

                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Vision