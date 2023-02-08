import { createContext, useState } from "react";
import { commands } from "../constants";

export const UserContext = createContext()

export function UserContextProvider(props){

    const [username, setUsername] = useState("Genius")
    const [currentFolder, setCurrentFolder] = useState("~")

    const [modalState, setModalState] = useState(false)

    const [showedApp, setShowedApp] = useState(false)

    const [lockInstructionFile, setLockInstructionFile] = useState(true)

    const [showData, setShowData] = useState([])
    const [value,setValue] = useState();
    

    const closeWindow = () => {
        setShowedApp(false)
    }

    const actionCommand = (command) => {
        if(command == "clear"){
            setShowData([])
            setValue({})
            return
        }

        if(command == "ls"){
            if(currentFolder == "~"){
                
                let info = {
                    command: command,
                    returnText: commands.find(element => element.command == command).returnText,
                    currentFolder: currentFolder    
                }
        
                let tempData = showData
                tempData.push(info)
                setShowData(tempData)
                setValue({})
                return
            }else if(currentFolder == "documents"){
                let info = {
                    command: command,
                    returnText: <div><p>instructions.sh</p></div>,
                    currentFolder: currentFolder     
                }
        
                let tempData = showData
                tempData.push(info)
                setShowData(tempData)
                setValue({})
                return
            }else{
                let info = {
                    command: command,
                    returnText: <div><p>Aucun fichier trouver</p></div>,
                    currentFolder: currentFolder         
                }
        
                let tempData = showData
                tempData.push(info)
                setShowData(tempData)
                setValue({})
                return
            }

        }

        if(command == "chmod -R 777 instructions.sh"){
            setLockInstructionFile(false)

            let info = {
                command: command,
                returnText: commands.find(element => element.command == command).returnText,
                currentFolder: currentFolder         
            }
    
            let tempData = showData
            tempData.push(info)
            setShowData(tempData)
            setValue({})
            return
        }

        if(command.split(' ')[0] == "cd"){
            if(command === "cd"){
                setCurrentFolder(`~`)
                let info = {
                    command: command,
                    returnText: <div></div>,
                    currentFolder: currentFolder
                }
        
                let tempData = showData
                tempData.push(info)
                setShowData(tempData)
                setValue({})
                return
            }

            if(currentFolder == "~"){
                const link = ["Documents", "Image", "Musique", "Téléchargements", "Vidéo"]
                let search = link.find(element => element == command.split(' ')[1])
                if(search){
                    setCurrentFolder(`~/${search}`)
                    return
                }
            }

            let info = {
                command: command,
                returnText: <div><p>Folder not found</p></div>,
                currentFolder: currentFolder
            }
    
            let tempData = showData
            tempData.push(info)
            setShowData(tempData)
            setValue({})

            return

        }

        for (let index = 0; index < commands.length; index++) {
            if(commands[index].command == command){
                let info = {
                    command: command,
                    returnText: commands.find(element => element.command == command).returnText,
                    currentFolder: currentFolder         
                }
    
                let tempData = showData
                tempData.push(info)
                setShowData(tempData)
                setValue({})

                return
            }
            
        }

        

        let info = {
            command: command,
            returnText: 
            <div>
                <p>Command not found</p>
            </div>,
            currentFolder: currentFolder
    
        }

        let tempData = showData
        tempData.push(info)
        setShowData(tempData)
        setValue({})
        

        
    }


    return(
        <UserContext.Provider value={{username, setUsername,modalState, setModalState,showedApp, setShowedApp, closeWindow,actionCommand,showData,lockInstructionFile, setLockInstructionFile, currentFolder}}>
            {props.children}
        </UserContext.Provider>
    )
}