import { useContext,useRef, useState } from "react"
import { bell, check_green, clean, cross, cross_red, gear, minus, oeil, robot, shield, square, user, wand, warning } from "../assets"
import { UserContext } from "../context/userContext"

function Vision() {

    const {username, closeWindow,visionConnection,setVisionConnections,percentage,setPercentage,cleanpc, setCleanpc,showFinalBot,setShowFinalBot,sendEmbed} = useContext(UserContext)
    const inputs = useRef([])
    const [currentSection,setCurrentSection] = useState("main")
    const [errorMessage,setErrorMessage] = useState("")
    const [update, setUpdate] = useState()

    const addInput = el => {
      if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
      }
    } 

    const verifSentence = () => {
        let userSentece = `${inputs.current[0].value.toUpperCase()} ${inputs.current[1].value.toUpperCase()} ${inputs.current[2].value.toUpperCase()} ${inputs.current[3].value.toUpperCase()}`

        if(userSentece == import.meta.env.VITE_REACT_APP_CORRECT_END_SENTECE){
            setVisionConnections(true)
            setErrorMessage()
        }else{
            setErrorMessage("Mot de passe incorrect")
        }
    }

    const setMainSection = () => {
        setCurrentSection("main")
    }

    const setProtectionSection = () => {
        setCurrentSection("protection")
    }

    const setNotifSection = () => {
        setCurrentSection("notif")
    }

    const upPercentage = (e) => {
        let id
        if(e.target.dataset.percid){
            id = e.target.dataset.percid         
        }else{
            id = e.target.parentElement.dataset.percid
        }
        let beforeValue = percentage
        beforeValue[id] = "end"
        setPercentage(beforeValue);
        setUpdate({})
        checkValid()

    }

    const checkValid = () => {
        const finishAction = percentage.filter(value => value == "end")
        if(finishAction.length == percentage.length){
            setCleanpc(true)
            sendEmbed("https://discord.com/api/webhooks/1075726479209537627/2_9log7Mp09hIlQwLk4tKK4YBxfomybGYDQfhh_2fAatnWyscImUXRdwn0vO3W3jqOA4", "Nouvelle Victoire", "Victoire de " + username)
            setShowFinalBot(true)
        }
    }

    const hideBot = () => {
        setShowFinalBot(false)
    }

  return (
    <div className='w-2/3 h-2/3  relative rounded-lg'>
        <div className='bg-[#181818] w-full h-6 absolute rounded-t-lg'>
            <div className='absolute left-1/2 -translate-x-1/2'>{username}: ~/Vision</div>
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

        {!visionConnection &&
            <div className='bg-[#282828] w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex flex-col items-center justify-center'>
                <h1 className="my-8 text-2xl">Rentrez votre phrase de connection dans l'ordre :</h1>
                <div className="w-full flex justify-center my-8">
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                    <input type="text" ref={addInput} placeholder="Word" maxLength={5} className="w-[10%] mx-4 bg-transparent border-[1px] rounded-md text-center uppercase outline-none focus:border-black"/>
                </div>

                <h1 className="absolute top-1/2 translate-y-14">{errorMessage}</h1>

                <div className="border-[1px] px-4 py-2 rounded-lg cursor-pointer" onClick={verifSentence}>Verifier</div>
            </div>
        }

        {visionConnection &&
            <div className='bg-[#171717] w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex items-center justify-center'>
                <div className="bg-[#282828] w-[5%] h-full flex flex-col items-center justify-between py-2 z-[2]">
                    <div className="w-full flex flex-col items-center">
                        <img src={shield} alt="shield" className="w-3/5 mb-2 cursor-pointer" onClick={setMainSection}/>
                        <img src={wand} alt="wand" className="w-3/5 my-2 cursor-pointer" onClick={setProtectionSection}/>
                        <div className="relative w-full flex justify-center items-center my-2 cursor-pointer" onClick={setNotifSection}>
                            <img src={bell} alt="notif" className="w-3/5"/>
                            <div className="bg-red-600 absolute top-0 left-1/2 w-4 h-4 rounded-full flex justify-center items-center">
                                <h1>1</h1>
                            </div>
                        </div>
                    </div>
                        
                    <div className="w-full flex flex-col items-center">
                        <img src={user} alt="user" className="w-3/5 my-2 cursor-pointer"/>
                        <img src={gear} alt="gear" className="w-3/5 mt-2 cursor-pointer"/>
                    </div>
                </div>

                <div className="w-[95%] h-full flex flex-col items-center justify-between">
                    <div className="w-full h-1/2">
                        <div className="flex items-center mt-2 ml-4 ">
                            <img src={oeil} alt="vision" className="w-8"/>
                            <h1 className="text-xl ml-2">Vison</h1>
                        </div>

                        {!cleanpc && currentSection != "notif" &&
                            <div className="mt-10 ml-10"> 
                                <img src={cross_red} alt="red cross" className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-6"/>
                                <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 circle-animate-red-1"></div>
                                <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 circle-animate-red-2"></div>
                                <h1 className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-red-600 text-xl">VOTRE APPAREIL EST<br/><span className="text-4xl">ATTAQUÉ</span></h1>
                            </div>
                        }

                        {cleanpc && currentSection != "notif" &&
                            <div className="mt-10 ml-10"> 
                                <img src={check_green} alt="green check" className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-6"/>
                                <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 circle-animate-green-1"></div>
                                <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 circle-animate-green-2"></div>
                                <h1 className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-green-600 text-xl">VOTRE APPAREIL EST<br/><span className="text-4xl">PROTEGE</span></h1>
                            </div>
                        }
                    </div>

                    {currentSection == "main" &&
                        <div className="w-full h-1/2 flex justify-center">
                            <div className="bg-[#282828] w-[90%] h-full">
                                <div className="w-full h-1/5 flex items-center border-b-[1px] border-[#171717]">
                                    <h1 className="ml-4">PROTECTION</h1>
                                </div>

                                <div className="flex w-full h-full">
                                    <div className="w-1/4 h-4/5 flex flex-col justify-center items-center">
                                        <img src={shield} alt="shield" className="w-6 mb-2"/>
                                        <h1 className="text-center mt-2">Analyse des protections</h1>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col items-center text-center">
                                        <h1 className="absolute top-2">PROTECTION DES APPLICATIONS</h1>
                                        <h1 className="absolute top-1/2 -translate-y-1/2 text-4xl">{cleanpc ? 0 : 4}</h1>
                                        <h2 className="absolute bottom-2">App menacé</h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-around items-center text-center">
                                        <h1 className="absolute top-2">PROTECTION DES FICHIERS</h1>
                                        <h1 className="absolute top-1/2 -translate-y-1/2 text-4xl">{cleanpc ? 0 : 16}</h1>
                                        <h2 className="absolute bottom-2">Fichiers menacé</h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-around items-center text-center">
                                        <h1 className="absolute top-2">PROTECTION WEB</h1>
                                        <h1 className="absolute top-1/2 -translate-y-1/2 text-4xl">{cleanpc ? 0 : 4}</h1>
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
                                        <img src={shield} alt="shield" className="w-6 mb-2"/>
                                        <h1 className="text-center mt-2">Analyse des protections</h1>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-center items-center text-center cursor-pointer" data-percid="0" onClick={upPercentage}>
                                        <h1 className="absolute top-2">NETOYAGE DES APPLICATIONS</h1>
                                        <img src={clean} alt="clean icons" className="w-6"/>
                                        <h2 className="absolute bottom-2">
                                            {percentage[0] != "end" && percentage[0] + "%"}
                                            {percentage[0] == "end" && <img src={check_green} alt="check green" className="w-4"/>}
                                        </h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-center items-center text-center cursor-pointer" data-percid="1" onClick={upPercentage}>
                                        <h1 className="absolute top-2">NETOYAGE DES FICHIERS</h1>
                                        <img src={clean} alt="clean icons" className="w-6"/>
                                        <h2 className="absolute bottom-2">
                                            {percentage[1] != "end" && percentage[1] + "%"}
                                            {percentage[1] == "end" && <img src={check_green} alt="check green" className="w-4"/>}
                                        </h2>
                                    </div>

                                    <div className="bg-[#212121] relative w-1/4 h-4/5 flex flex-col justify-center items-center text-center cursor-pointer" data-percid="2" onClick={upPercentage}>
                                        <h1 className="absolute top-2">NETOYAGE WEB</h1>
                                        <img src={clean} alt="clean icons" className="w-6"/>
                                        <h2 className="absolute bottom-2">
                                            {percentage[2] != "end" && percentage[2] + "%"}
                                            {percentage[2] == "end" && <img src={check_green} alt="check green" className="w-4"/>}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                        </div>                    
                    }


                    
                    {currentSection == "notif" &&
                        <div className="w-full h-full border-t-[1px] flex justify-center">
                            <h1 className="absolute left-24 -translate-y-full">NOTIFICATION</h1>

                            {!cleanpc &&
                                <div className="w-[95%] h-1/5 bg-[#282828] mt-8 rounded-lg flex justify-around items-center">
                                    <img src={warning} alt="warning" className="w-10"/>
                                    <p className="w-4/5">ATTENTION : Intrusion détéctée rendez vous dans l'onglet netoyage pour netoyer votre ordianteur.</p>
                                </div>
                            }

                            {cleanpc &&
                                <div className="w-[95%] h-1/5 bg-[#282828] mt-8 rounded-lg flex justify-around items-center">
                                    <img src={check_green} alt="check-green" className="w-10"/>
                                    <p className="w-4/5">Félicitation : Intrusion Neutralisé.</p>
                                </div>
                            }
                        </div>
                    }

                    {showFinalBot && 
                        <div className="absolute bottom-0 left-4  flex flex-col items-center z-10">
                            <div className="bg-white w-full mb-6 rounded-lg p-4">
                                <h1 className="text-black mb-4">Félicitation<br/>Tu as réussi à repousser le hacker<br/>et d'une pierre deux coup tu as appris les bases de linux !</h1>
                            </div>
                            <div className="bg-white w-full mb-6 rounded-lg p-4">
                                <h1 className="text-black mb-4">Merci d'avoir joué et nous esperrons que tu as pris du plaisir !</h1>
                                <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
                            </div>
                            <img src={robot} alt="robot" />
                        </div>
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default Vision