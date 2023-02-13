import { useContext,useState,useEffect } from "react"
import { UserContext } from "../../context/userContext"
import FileExplorer from "../FileExplorer"
import Terminal from "../Terminal"
import Fingerprint from "../Fingerprint"
import Quiz from "../Quiz"
import Chrome from "../Chrome"
import Vision from "../Vision"

function Interface() {

  const {username,showedApp, setShowedApp,showedIcon,showIntructionBot,setShowIntructionBot} = useContext(UserContext)
  
  const [showHelpBot,setShowHelpBot] = useState(false)

  let date = new Date()
  let timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`
  
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
    console.log(sessionStorage.getItem("showInterfaceHelpBot"))
    if(!sessionStorage.getItem("showInterfaceHelpBot")){
      setShowHelpBot(true)
      sessionStorage.setItem("showInterfaceHelpBot", true)
    }
  })

  const hideBot = () => {
    setShowHelpBot(false)
    setShowIntructionBot(false)
  }

  return (
    <div className="relative w-4/5 h-4/5 rounded-lg bg-no-repeat bg-[url(./assets/ubuntu-background.png)] bg-cover bg-bottom top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">

        <div className='bg-[#181818] absolute top-0 w-full h-8 rounded-t-lg'>
            <div className='absolute top-[2px] left-1/2 -translate-x-1/2'>{timestamp}</div>
            <div className='absolute right-4 top-2 w-16 flex justify-between items-center'>
                <img src="./src/assets/icons/wifi.svg" alt="battery" className='w-4'/>
                <img src="./src/assets/icons/volume.svg" alt="battery" className='w-4'/>
                <img src="./src/assets/icons/battery.svg" alt="battery" className='w-4 -rotate-90'/>
            </div>
        </div>

        <div className='bg-[#181818] absolute left-0 w-16 h-full opacity-50 rounded-l-lg'></div>

        <div className='absolute left-0 w-16 h-full'>
          {showedIcon.map((nav, i) => (
            <img key={i} src={`./src/assets/iconsSoftware/${nav}`} alt="logo icon sofware" data-app_name={nav.split(".")[0]} className={`${i === 0 ? `mt-10`: `mt-2`} scale-90 cursor-pointer`} onClick={showApp}/>
          ))}
            
            
        </div>

        <div className="absolute bottom-12 right-12 flex flex-col items-center cursor-pointer" data-app_name={"fileexplorer"} onClick={showApp}>
          <img src="./src/assets/iconsSoftware/home_folder.png" alt="dossier" className=" w-10 h-10 opacity-80" />
          <h1>Dossier</h1>
          <h1>Personnel</h1>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer" data-app_name={"vision"} onClick={showApp}>
          <img src="./src/assets/iconsSoftware/oeil.png" alt="dossier" className=" w-10 h-10 opacity-80" />
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
            <h1 className="text-black mb-4">Nickel tu as réussi à te connecter !<br/>La première chose à faire est de te créer un Utilisateur !<br/>Va dans le terminal pour le créer.</h1>
                <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
            </div>
            <img src="./src/assets/robot.png" alt="robot" />
          </div>
        }

        {showIntructionBot &&
          <div className="absolute bottom-0 left-4  flex flex-col items-center">
            <div className="bg-white w-full mb-6 rounded-lg p-4">
            <h1 className="text-black mb-4">Parfait ton utilisateur est crée {username} !<br/>Cherche dans tes fichiers si tu n'a pas laisser d'indication<br/>sur la démarche à suivre pour retrouver ton mot de passe.</h1>
                <button className='text-black absolute right-2 -translate-y-1/2' onClick={hideBot}>Fermer</button>
            </div>
            <img src="./src/assets/robot.png" alt="robot" />
          </div>
        }

        
    </div>
  )
}

export default Interface