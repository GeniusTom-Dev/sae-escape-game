import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"

function FileExplorer() {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showTerminalMessage, setShowTerminalMessage] = useState(false)
    const [openedFolder, setOpenedFolder] = useState("personalFolder")
    const [currentFolderName, setCurrentFolderName] = useState("Dossier Personel")
    const [currentFolderImage, setCurrentFolderImage] = useState("house")
    const { closeWindow,lockInstructionFile } = useContext(UserContext)

    const tryOpenFile = () => {
        if(lockInstructionFile){
            setShowErrorMessage(true)
        }else{
            setShowTerminalMessage(true)
        }
    }

    const hideMessage = () => {
        setShowErrorMessage(false)
        setShowTerminalMessage(false)
    }

    const closeFileExplorer = () => {
        closeWindow()
    }

    const setBarInfo = (info) => {
        
        if(info == "personalFolder"){
            setCurrentFolderName("Dossier Personnel")
            setCurrentFolderImage("house")

        }else if(info == "documentsFolder"){  
            setCurrentFolderName("Documents")
            setCurrentFolderImage("file-lines")

        }else if(info == "imageFolder"){            
            setCurrentFolderName("Images")
            setCurrentFolderImage("image")

        }else if(info == "musicFolder"){            
            setCurrentFolderName("Musiques")
            setCurrentFolderImage("music")
        }else if(info == "downloadFolder"){            
            setCurrentFolderName("Téléchargements")
            setCurrentFolderImage("download")
        
        }else if(info == "videoFolder"){
            setCurrentFolderName("Vidéos")
            setCurrentFolderImage("film")

        }else if(info == "trashFolder"){            
            setCurrentFolderName("Corbeille")
            setCurrentFolderImage("trash-can")
        }else if(info == "enigmes"){            
            setCurrentFolderName("Documents\u005CEnigmes")
            setCurrentFolderImage("gamepad")
            console.log("cououc")
        }
    }

    const catClick = (e) => {
        if(e.target.dataset.catname){
            setOpenedFolder(e.target.dataset.catname)
            setBarInfo(e.target.dataset.catname)            
        }else{
            setOpenedFolder(e.target.parentElement.dataset.catname)
            setBarInfo(e.target.parentElement.dataset.catname)
        }
    }

    const onpenGameFolder = (e) => {
        setOpenedFolder(e.target.parentElement.dataset.catname)
        setBarInfo(e.target.parentElement.dataset.catname)
    }

    const backFolder = () => {
        if(openedFolder === "enigmes"){
            setOpenedFolder("documentsFolder")
            setBarInfo("documentsFolder")
        }

        const link = ["documentsFolder", "imageFolder", "musicFolder", "downloadFolder", "videoFolder"]
        let search = link.find(element => element == openedFolder)
        if(search){
            setOpenedFolder("personalFolder")
            setBarInfo("personalFolder")
        }
    }

  return (
    <div className='w-2/3 h-2/3 bg-[#252525] relative rounded-lg flex'>
        {/* Navbar */}
        <div className='bg-[#181818] w-full h-8 absolute rounded-t-lg'>
            <div className='w-16 absolute left-0 flex flex-row justify-center top-1/2 -translate-y-1/2 cursor-pointer' >

                <div className='w-4 h-4 bg-[#373737] rounded-l-sm flex justify-center items-center' onClick={backFolder}>
                    <img src="./src/assets/icons/angle-left.svg" alt="angle-left" className='w-2' />
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-r-sm flex justify-center items-center ml-2'>
                    <img src="./src/assets/icons/angle-right.svg" alt="angle-right" className='w-2'/>
                </div>
            </div>

            <div className='bg-[#242424] w-1/2 h-2/3 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-sm flex items-center'>
                <img src={`./src/assets/icons/${currentFolderImage}.svg`} alt={currentFolderImage} className="w-4 h-4 ml-2"/>
                <h1 className="ml-4">{currentFolderName}</h1>
            </div>

            <div className='w-16 absolute right-2 flex flex-row justify-around top-1/2 -translate-y-1/2 cursor-pointer' >

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src="./src/assets/icons/minus.svg" alt="minus" className='w-2'/>
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center'>
                    <img src="./src/assets/icons/square.svg" alt="square" className='w-2'/>
                </div>

                <div className='w-4 h-4 bg-[#373737] rounded-full flex justify-center items-center' onClick={closeFileExplorer}>
                    <img src="./src/assets/icons/cross.svg" alt="cross" className='w-2'/>
                </div>
            </div>
            
        </div>

        {/* Left Menu */}

        <div className="bg-[#1b1b1b] h-full w-1/5 rounded-l-lg pt-10">
            <div className="flex flex-row items-center cursor-pointer" data-catname={"personalFolder"} onClick={catClick} >
                <img src="./src/assets/icons/house.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Dossier Personnel</h1>
            </div>

            <div className="flex flex-row items-center mt-4 cursor-pointer" data-catname={"documentsFolder"} onClick={catClick}>
                <img src="./src/assets/icons/file-lines.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Documents</h1>
            </div>

            <div className="flex flex-row items-center mt-4 cursor-pointer" data-catname={"imageFolder"} onClick={catClick}>
                <img src="./src/assets/icons/image.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Image</h1>
            </div>

            <div className="flex flex-row items-center mt-4 cursor-pointer" data-catname={"musicFolder"} onClick={catClick}>
                <img src="./src/assets/icons/music.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Musique</h1>
            </div>

            <div className="flex flex-row items-center mt-4 cursor-pointer" data-catname={"downloadFolder"} onClick={catClick}>
                <img src="./src/assets/icons/download.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Téléchargements</h1>
            </div>

            <div className="flex flex-row items-center mt-4 cursor-pointer" data-catname={"videoFolder"} onClick={catClick}>
                <img src="./src/assets/icons/film.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Vidéo</h1>
            </div>

            <div className="flex flex-row items-center mt-4 cursor-pointer" data-catname={"trashFolder"} onClick={catClick}>
                <img src="./src/assets/icons/trash-can.svg" alt="house" className="w-4 h-4 ml-2"/>
                <h1 className="text-sm ml-2">Corbeille</h1>
            </div>

            
            
        </div>

        {/* Main content */}

        <div className="w-4/5 h-full rounded-r-lg pt-12 flex">
            {openedFolder == "personalFolder" && 
                <div className="w-full">
                    <div className="w-full flex">
                        <div className="flex flex-col items-center cursor-pointer ml-5 " data-catname={"documentsFolder"} onClick={catClick} >
                            <img src="./src/assets/iconsSoftware/folder.png" alt="file" className="w-10 h-10"/>
                            <h1>Documents</h1>
                        </div>

                        <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"imageFolder"} onClick={catClick} >
                            <img src="./src/assets/iconsSoftware/folder.png" alt="file" className="w-10 h-10"/>
                            <h1>Images</h1>
                        </div>

                        <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"musicFolder"} onClick={catClick} >
                            <img src="./src/assets/iconsSoftware/folder.png" alt="file" className="w-10 h-10"/>
                            <h1>Musiques</h1>
                        </div>

                        <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"downloadFolder"} onClick={catClick} >
                            <img src="./src/assets/iconsSoftware/folder.png" alt="file" className="w-10 h-10"/>
                            <h1>Téléchargement</h1>
                        </div>

                        <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"videoFolder"} onClick={catClick} >
                            <img src="./src/assets/iconsSoftware/folder.png" alt="file" className="w-10 h-10"/>
                            <h1>Vidéo</h1>
                        </div>
                    </div>
                </div>
            
            }

            {openedFolder == "documentsFolder" && <div className="flex flex-row cursor-pointer ml-5">
                <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"enigmes"} onClick={onpenGameFolder}>
                    <img src="./src/assets/iconsSoftware/folder.png" alt="file" className="w-10 h-10"/>
                    <h1>Enigmes</h1>
                </div>

                <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"videoFolder"} onClick={tryOpenFile}>
                    <img src="./src/assets/iconsSoftware/file.png" alt="file" className="w-10 h-10"/>
                    <h1>instructions.txt</h1>
                </div>
                
                
            </div>}

            {openedFolder == "enigmes" &&
                <div className="flex flex-row cursor-pointer ml-5">
                    <div className="flex flex-col items-center cursor-pointer ml-5" data-catname={"videoFolder"} onClick={tryOpenFile}>
                        <img src="./src/assets/iconsSoftware/file.png" alt="file" className="w-10 h-10"/>
                        <h1>fingerprint.sh</h1>
                    </div>   
                </div>
            }

        </div>

         {/* Error Message */}

        {showErrorMessage && 
            <div className="bg-[#333333] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 rounded-lg flex justify-center">
                <div className="bg-[#1f1f1f] absolute w-full h-8 flex justify-center items-center rounded-t-lg">Error</div>
                <h1 className="w-4/5 mt-10">Le fichier que vous tentez d'ouvrir est verouiller.</h1>
                <button className="bg-[#1f1f1f] absolute bottom-2 right-4 py-1 px-2 rounded-md" onClick={hideMessage}>Fermer</button>
            </div>
        }

        {/* Assisstant */}

        {showErrorMessage && 
            <div className="absolute -bottom-1/2 left-0 -translate-x-[20rem] -translate-y-8 flex flex-col items-center">
                <div className="bg-white w-full h-20 mb-6 rounded-lg p-4">
                    <h1 className="text-black">Le fichier est verouiller !<br/>Tu devrais pouvoir le déverouiller avec ton termial</h1>
                </div>
                <img src="./src/assets/robot.png" alt="robot" />
            </div>
        }

        {showTerminalMessage && 
            <div className="bg-[#333333] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 rounded-lg flex justify-center">
                <div className="bg-[#1f1f1f] absolute w-full h-8 flex justify-center items-center rounded-t-lg">Error</div>
                <h1 className="w-4/5 mt-10">Le fichier que vous tentez d'ouvrir est dévérouiller mais ne peut être ouvert que dans le terminal.</h1>
                <button className="bg-[#1f1f1f] absolute bottom-2 right-4 py-1 px-2 rounded-md" onClick={hideMessage}>Fermer</button>
            </div>
        }



</div>

        
        
    
  )
}

export default FileExplorer