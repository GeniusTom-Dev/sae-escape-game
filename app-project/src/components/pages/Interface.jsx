import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import FileExplorer from "../FileExplorer"
import Terminal from "../Terminal"

function Interface() {

  const {showedApp, setShowedApp} = useContext(UserContext)

  let date = new Date()
  let timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`
  
  const showApp = (e) => {
    
    if(!e.target.dataset.app_name){
      if(e.target.parentElement.dataset.app_name){
        setShowedApp(e.target.parentElement.dataset.app_name)
      }
    }else{
      setShowedApp(e.target.dataset.app_name)
    }
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
            <img src="./src/assets/iconsSoftware/logo-cmd.png" alt="logo cmd" data-app_name={"terminal"} className='mt-10 scale-90 cursor-pointer' onClick={showApp}/>
            <img src="./src/assets/iconsSoftware/logo-chrome.png" alt="logo cmd" className='mt-4 scale-125 cursor-pointer'/>
        </div>

        <div className="absolute bottom-12 right-12 flex flex-col items-center cursor-pointer" data-app_name={"fileexplorer"} onClick={showApp}>
          <img src="./src/assets/iconsSoftware/home_folder.png" alt="dossier" className=" w-10 h-10 opacity-80" />
          <h1>Dossier</h1>
          <h1>Personnel</h1>
        </div>

        {showedApp == "terminal" && <Terminal/>}
        {showedApp == "fileexplorer" && <FileExplorer/>}

        
    </div>
  )
}

export default Interface