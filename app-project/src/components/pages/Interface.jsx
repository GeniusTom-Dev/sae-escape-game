import { useContext,useState,useEffect } from "react"
import { UserContext } from "../../context/userContext"
import FileExplorer from "../FileExplorer"
import Terminal from "../Terminal"
import Fingerprint from "../Fingerprint"
import Quiz from "../Quiz"
import Chrome from "../Chrome"
import Vision from "../Vision"
import { battery, chrome, cross, fingerprint, home_folder, oeil, quiz, robot, terminal, volume, wifi } from "../../assets"

function Interface() {

  const {username,showedApp, setShowedApp,showedIcon,showIntructionBot,setShowIntructionBot,timestamp,showNotif,setShowNotif,showHelpBot,setShowHelpBot,looseGame, setLooseGame,resetGame,showInterfaceHelpBot,setShowInterfaceHelpBot} = useContext(UserContext)
  

  const [showTimer,setShowTimer] = useState(false)
  const [update,setUpdate] = useState(false)

  const showApp = (e) => {
    if(!e.target.dataset.app_name){
      if(e.target.parentElement.dataset.app_name){
        setShowedApp(e.target.parentElement.dataset.app_name)
        setShowHelpBot(false)
      }
    }else{
      setShowedApp(e.target.dataset.app_name)
      setShowHelpBot(false)
    }
  }

  useEffect(() => {
    if(!showInterfaceHelpBot){
      setShowHelpBot(true)
      setShowInterfaceHelpBot(true)
    }

    let timer = setInterval(() => {
      if(timestamp){
        let value = Math.round(((30 * 60000) - (Date.now() - timestamp))/1000)
        if(value > 0){
          if(value > 60 ){
            let minutes = Math.floor(value / 60)
            let secondes = value % 60
            setShowTimer(`${minutes}:${secondes}`)
            setUpdate({})
          }else{
            setShowTimer(value)
            setUpdate({})
          }
        }else{
          clearInterval(timer)
          setLooseGame(true)
          setShowedApp(false)
          setUpdate({})
        }

      }
    }, 1000)
  })

  const hideBot = () => {
    setShowHelpBot(false)
    setShowIntructionBot(false)
  }

  const hideNotif = () => {
    setShowNotif(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.key == "Enter"){
        if(looseGame){
          resetGame()
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  })

  return (
    <div className="relative w-4/5 h-4/5 rounded-lg bg-no-repeat bg-[url(./assets/ubuntu-background.png)] bg-cover bg-bottom top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">

        {looseGame &&
          <div className="w-full h-full bg-black z-20 rounded-lg">
            <h1 className="mt-2 ml-4">Temps écoulé....</h1>
            <h1 className="mt-2 ml-4">press enter to restart</h1>
          </div>
        }


        <div className='bg-[#181818] absolute top-0 w-full h-8 rounded-t-lg'>
            <div className='absolute top-[2px] left-1/2 -translate-x-1/2'>{showTimer}</div>
            <div className='absolute right-4 top-2 w-16 flex justify-between items-center'>
                <img src={wifi} alt="battery" className='w-4'/>
                <img src={volume} alt="battery" className='w-4'/>
                <img src={battery} alt="battery" className='w-4 -rotate-90'/>
            </div>
        </div>

        <div className='bg-[#181818] absolute left-0 w-16 h-full opacity-50 rounded-l-lg'></div>

        <div className='absolute left-0 w-16 h-full'>
          {showedIcon.map((nav, i) =>{
              switch (nav) {
                case "terminal.png":
                  return(<img key={i} src={terminal} alt="terminal" data-app_name={"terminal"} className={`${i === 0 ? `mt-10`: `mt-2`} scale-90 cursor-pointer`} onClick={showApp}/>)
                  break;

                case "chrome.png":
                  return(<img key={i} src={chrome} alt="chrome" data-app_name={"chrome"} className={`${i === 0 ? `mt-10`: `mt-2`} scale-90 cursor-pointer`} onClick={showApp}/>)
                  break;

                case "fingerprint.png":
                  return(<img key={i} src={fingerprint} alt="fingerprint" data-app_name={"fingerprint"} className={`${i === 0 ? `mt-10`: `mt-2`} scale-90 cursor-pointer`} onClick={showApp}/>)
                  break;
                case "quiz.png":
                  return(<img key={i} src={quiz} alt="quiz" data-app_name={"quiz"} className={`${i === 0 ? `mt-10`: `mt-2`} scale-90 cursor-pointer`} onClick={showApp}/>)
                  break;
              }
          }
          )
          
          }
            
            
        </div>

        <div className="absolute bottom-12 right-12 flex flex-col items-center cursor-pointer" data-app_name={"fileexplorer"} onClick={showApp}>
          <img src={home_folder} alt="dossier" className=" w-10 h-10 opacity-80" />
          <h1>Dossier</h1>
          <h1>Personnel</h1>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer" data-app_name={"vision"} onClick={showApp}>
          <img src={oeil} alt="dossier" className=" w-10 h-10 opacity-80" />
          <h1>Vision</h1>
        </div>

        {showedApp == "terminal" && <Terminal/>}
        {showedApp == "fileexplorer" && <FileExplorer/>}
        {showedApp == "fingerprint" && <Fingerprint/>}
        {showedApp == "quiz" && <Quiz/>}
        {showedApp == "chrome" && <Chrome/>}
        {showedApp == "vision" && <Vision/>}

        {showHelpBot &&
          <div className="absolute bottom-0 left-4  flex flex-col items-center">
            <div className="bg-white w-full mb-6 rounded-lg p-4">
            <h1 className="text-black mb-4">Nickel tu as réussi à te connecter !<br/>La première chose à faire est de te créer un Utilisateur !<br/>Vas dans le terminal pour le créer.</h1>
                <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
            </div>
            <img src={robot} alt="robot" />
          </div>
        }

        {showIntructionBot &&
          <div className="absolute bottom-0 left-4  flex flex-col items-center">
            <div className="bg-white w-full mb-6 rounded-lg p-4">
            <h1 className="text-black mb-4">Parfait ton utilisateur est créé {username} !</h1>
            </div>
            <div className="bg-white w-full mb-6 rounded-lg p-4">
            <h1 className="text-black mb-4">Nous avons reçu une notification d'intrusion sur vison !<br/>Tu as très peu de temps pour la neutraliser !<br/>Tu peux voir ton temps en haut de ton écran.<br/>Tu avais verouillé le logiciel,<br/>cherche dans tes fichiers si tu as laissé<br/>les instructions pour le déverouiller !</h1>
                <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
            </div>
            <img src={robot} alt="robot" />
          </div>
        }

        {showNotif &&
          <div className="bg-[#292929] w-1/3 h-[10%] flex justify-around items-center absolute top-10 right-4 p-2 rounded-lg">
            <img src={oeil} alt="vison icon" className="h-4/5"/>
            <h1 className="text-sm w-3/5">Intrusion detectée ! Ouvrez vison pour la neutraliser !</h1>
            <img src={cross} alt="cross" className="h-4/5 cursor-pointer" onClick={hideNotif}/>
          </div>
        }

        
    </div>
  )
}

export default Interface