import { createContext, useState } from "react";
import { commands } from "../constants";

export const UserContext = createContext()

export function UserContextProvider(props){

    const [username, setUsername] = useState("Genius")
    const [currentFolder, setCurrentFolder] = useState("~/Documents/Enigmes")

    const [modalState, setModalState] = useState(false)

    const [showedApp, setShowedApp] = useState("fingerprint")

    const [lockInstructionFile, setLockInstructionFile] = useState(true)

    const [showData, setShowData] = useState([])
    const [value,setValue] = useState();
    

    const closeWindow = () => {
        setShowedApp(false)
    }

    const addInfo = (command,returnText) => {
        let info
        if(returnText){
            info = {
                command: command,
                returnText: returnText,
                currentFolder: currentFolder    
            }
        }else{
            info = {
                command: command,
                returnText: commands.find(element => element.command == command).returnText,
                currentFolder: currentFolder    
            }
        }

        let tempData = showData
        tempData.push(info)
        setShowData(tempData)
        setValue({})
    }

    const commandLs = (command) => {
        if(currentFolder == "~"){
            addInfo(command)
        }else if(currentFolder == "~/Documents"){
            addInfo(command, <div className="flex"><p>Enigmes</p><p className="ml-4">instructions.txt</p></div>)
        }else if(currentFolder == "~/Documents/Enigmes"){
            addInfo(command, <div className="flex"><p>fingerprint.sh</p></div>)
        }else{
            addInfo(command, <div><p>Aucun fichiers trouvés</p></div>)
        }
    }

    const commandChmod = (command) => {
        if(currentFolder == "~/Documents"){
            setLockInstructionFile(false)
            addInfo(command)
        }else{
            addInfo(command, <div><p>File not found</p></div>)
        }
        
    }

    const commandCd = (command) => {
        const link = ["Documents", "Image", "Musique", "Téléchargements", "Vidéo"]
        if(command == "cd"){
            setCurrentFolder(`~`)
            addInfo(command, <div></div>)
            return
        }else if(command.split(' ')[1] == ".."){
            if(currentFolder == "~/Documents/Enigmes"){
                setCurrentFolder(`~/Documents`)
                return
            }else if(currentFolder == "~"){
                addInfo(command, <div><p>Folder not found</p></div>)
                return
            }else{
                setCurrentFolder(`~`)
                return
            }
        }      
        else if(currentFolder == "~"){
            let search = link.find(element => element == command.split(' ')[1])
            if(search){
                setCurrentFolder(`~/${search}`)
                return
            }else{
                addInfo(command, <div><p>Folder not found</p></div>)
            }
        }else if(currentFolder == "~/Documents"){
            if(command.split(' ')[1] == "Enigmes"){
                setCurrentFolder(`~/Documents/Enigmes`)
                return
            }else{
                addInfo(command, <div><p>Folder not found</p></div>)
            }
        }else{
            addInfo(command, <div><p>Folder not found</p></div>)
        }
    } 

    const commandCat = (command) => {
        if(command === "cat"){
            addInfo(command, <div><p>File/Folder name not found</p></div>)
        }
        
    }

    const startFile = (command) => {
        if(currentFolder == "~/Documents/Enigmes"){
            if(command == "./fingerprint.sh"){
                setShowedApp("fingerprint")
            }
        }
    }

    const actionCommand = (command) => {
        switch(command){
            case "clear":
                setShowData([])
                setValue({})
                return

            case "ls":
                commandLs(command)
                return
            case "chmod 777 instructions.txt":
                commandChmod(command)
                return

            case "help":
                addInfo(command)
                return
        }

        if(command.split(' ')[0] == "cd"){
            commandCd(command)
            return
        }

        if(command.split(' ')[0] == "cat"){
            commandCat(command)
            return
        }

        if(command.substr(0,2) == "./"){
            startFile(command)
            return
        }

        addInfo(command, <div><p>Command not found</p></div>)
        return

        
    }


    return(
        <UserContext.Provider value={{username, setUsername,modalState, setModalState,showedApp, setShowedApp, closeWindow,actionCommand,showData,lockInstructionFile, setLockInstructionFile, currentFolder}}>
            {props.children}
        </UserContext.Provider>
    )
}