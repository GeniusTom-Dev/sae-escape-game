import { createContext, useState } from "react";
import { commands } from "../constants";

export const UserContext = createContext()

export function UserContextProvider(props){

    const [username, setUsername] = useState("root")
    const [currentFolder, setCurrentFolder] = useState("~")
    const [showedIcon, setShowedIcon] = useState(["terminal.png","chrome.png"])

    const [modalState, setModalState] = useState()

    const [showedApp, setShowedApp] = useState("")

    const [showIntructionBot,setShowIntructionBot] = useState(false)

    const [lockInstructionFile, setLockInstructionFile] = useState(true)

    const [passwordCrypted, setPasswordCrypted] = useState(true)

    const [showData, setShowData] = useState([])
    const [value,setValue] = useState();

    // Quiz
    const [progressBar, setProgressBar] = useState("w-[0%]")
    const [questionIndex, setQuestionIndex] = useState(0)
    const [quizError, setQuizError] = useState(0)

    //FingerPrint

    const removeLastItem = (list) => {
        let newlist = list
        newlist.pop()
        return newlist
    }

    // Hidden Message

    const [nameExtractFile,setNameExtractFile] = useState(false)

    const [fingerprintIndex,setFingerprintIndex] = useState(removeLastItem([1,2,3,4].sort(function () {
        return Math.random() - 0.5;
    })))
    const [fingerprintList,setFingerprintList] = useState([1,2,3,4,5,6,7,8].sort(function () {
        return Math.random() - 0.5;
    }))
    const [listClicked, setListClicked] = useState([])
    const [gameState, setGameState] = useState(false)
    

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
            if(command === "ls -a"){
                addInfo(command, <div className="flex"><p>fingerprint.sh</p><p className="ml-4">cryptedpassword.txt</p><p className="ml-4">quiz.sh</p></div>)
            }else{
                addInfo(command, <div className="flex"><p>fingerprint.sh</p><p className="ml-4">cryptedpassword.txt</p></div>)
            }
        }else if(currentFolder == "~/Images"){
            if(nameExtractFile){
                addInfo(command, <div className="flex"><p>montagne.png</p><p className="ml-4">{nameExtractFile}</p></div>)
            }else{
                addInfo(command, <div><p>montagne.png</p></div>)
            }
        }else{
            addInfo(command, <div><p>Aucun fichiers trouvés</p></div>)
        }
    }

    const commandChmod = (command) => {
        let args = command.split(' ')
        if(command == "man"){
            addInfo(command, <div><p>Args not found ! Check the man.</p></div>)
        }
        if(currentFolder == "~/Documents"){
            if(args[1] == "777"){
                setLockInstructionFile(false)
                addInfo(command)
            }else{
                addInfo(command, <div><p>Args not correct ! Check the man.</p></div>)
            }
        }else{
            addInfo(command, <div><p>File not found</p></div>)
        }
        
    }

    const commandCd = (command) => {
        const link = ["Documents", "Images", "Musique", "Téléchargements", "Vidéo", "Documents/Enigmes"]
        if(command == "cd"){
            setCurrentFolder(`~`)
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
        let nameFile = command.split(' ')[1]
        if(command === "cat"){
            addInfo(command, <div><p>Args filename not given</p></div>)
        }
        if(nameFile == "instructions.txt"){
            if(currentFolder === "~/Documents"){
                if(lockInstructionFile){
                    addInfo(command, <div><p>Fichier Verouiller</p></div>)
                }else{
                    addInfo(command, <div><p>Content instructions</p></div>)
                }
                
            }else{
                addInfo(command, <div><p>File not found</p></div>)
            }
        }else if(nameFile == "cryptedpassword.txt"){
            if(currentFolder === "~/Documents/Enigmes"){
                if(passwordCrypted){
                    addInfo(command, <div><p>{import.meta.env.VITE_REACT_APP_CRYPTED_CODE}</p></div>)
                }else{
                    addInfo(command, <div><p>{import.meta.env.VITE_REACT_APP_UNCRYPTED_CODE}</p></div>)
                }
            }else{
                addInfo(command, <div><p>File not found</p></div>)
            }
        }else if(nameFile == nameExtractFile){
            if(currentFolder === "~/Images"){
                addInfo(command, <div><p>Le code dechiffrer est : {import.meta.env.VITE_REACT_APP_HIDDEN_MESSAGE_CODE}</p></div>)
            }else{
                addInfo(command, <div><p>File not found</p></div>)
            }
        }
        
    }

    const startFile = (command) => {
        if(command.split(".")[2] == "sh"){
            if(currentFolder == "~/Documents/Enigmes"){
                if(command == "./fingerprint.sh"){
                    if(!showedIcon.includes("fingerprint.png")){
                        let tempValue = showedIcon
                        tempValue.push("fingerprint.png")
                        setShowedIcon(tempValue)
                        setValue({})
                        setShowedApp("fingerprint")
                    }else{
                        setShowedApp("fingerprint")
                    }
                }else if(command == "./quiz.sh"){
                    if(!showedIcon.includes("quiz.png")){
                        let tempValue = showedIcon
                        tempValue.push("quiz.png")
                        setShowedIcon(tempValue)
                        setValue({})
                        setShowedApp("quiz")
                    }else{
                        setShowedApp("quiz")
                    }
                }
            }
        }else if(command.split(".")[2] == "txt"){
            addInfo(command, <div><p>Only .sh file can be start</p></div>)
        }else{
            addInfo(command, <div><p>Command not found</p></div>)
        }
        
    }

    const cesarCommand = (command) => {
        let nameFile = command.split(' ')[1]
        if(command == "cesar"){
            addInfo(command, <div><p>Args filename not given</p></div>)
        }else if(nameFile == "cryptedpassword.txt"){
            if(currentFolder == "~/Documents/Enigmes"){
                setPasswordCrypted(false)
                addInfo(command, <div><p>File décrypted</p></div>)
            }else{
                addInfo(command, <div><p>File not found</p></div>)
            }
        }else{
            addInfo(command, <div><p>File not found</p></div>)
        }
    }

    const manCommand = (command) => {
        let commandList = ['cd', 'ls', 'chmod', 'cat', 'cesar','steghide','useradd','./']
        let search = commandList.find(element => element == command.split(' ')[1])
        if(search){
            addInfo(command)
        }else{
            addInfo(command, <div><p>Args command unknow</p></div>)
        }
        
    }

    const commandAddUser = (command) => {
        let name = command.split(' ')
        if(name.length != 2){
            addInfo(command, <div><p>Args count Error. Check the man</p></div>)
            return
        }
        if(username == "root"){
            setUsername(name[1])
            setShowIntructionBot(true)
            addInfo(command, <div><p>User create with name: {name[1]}</p></div>)
        }else{
            addInfo(command, <div><p>User Already Create</p></div>)
        }
    }

    const commandStegHide = (command) => {
        let args = command.split(' ')
        if(args.length != 7){
            addInfo(command, <div><p>Args count Error. Check the man</p></div>)
            return
        }
        if(currentFolder == "~/Images"){
            if(args[0] == "steghide" && args[1] == "extract" && args[2] == "-sf" && args[3] == "montagne.png" && args[4] == "-xf" && args[6] == "-p" ){
                setNameExtractFile(args[5])
                addInfo(command, <div><p>File {args[5]} extract</p></div>)
            }
        }else{
            addInfo(command, <div><p>File can't be extract or found</p></div>)
        }
    }

    const actionCommand = (command) => {
        if(username == "root" && command.split(' ')[0].toLowerCase() != "useradd" && command.toLowerCase() != "help" && command.split(' ')[0].toLowerCase() != "man"){
            addInfo(command, <div><p>You must create user before use command. Check help command if you need help.</p></div>)
            return
        }

        switch(command){
            case "clear":
                setShowData([])
                setValue({})
                return

            case "help":
                addInfo(command)
                return
        }

        if(command.split(' ')[0] == "cd"){
            commandCd(command)
            return
        }

        if(command.split(' ')[0] == "chmod"){
            commandChmod(command)
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

        if(command.split(' ')[0] == "cat"){
            commandCat(command)
            return
        }

        if(command.split(' ')[0] == "cesar"){
            cesarCommand(command)
            return
        }

        if(command.split(' ')[0] == "man"){
            manCommand(command)
            return
        }

        if(command.split(' ')[0] == "ls"){
            commandLs(command)
            return
        }

        if(command.split(' ')[0] == "steghide"){
            commandStegHide(command)
            return
        }

        if(command.split(' ')[0] == "useradd"){
            commandAddUser(command)
            return
        }

        addInfo(command, <div><p>Command not found</p></div>)
        return

        
    }


    return(
        <UserContext.Provider value={{username, setUsername,modalState, setModalState,showedApp,
         setShowedApp, closeWindow,actionCommand,showData,lockInstructionFile, setLockInstructionFile,
          currentFolder, showedIcon,progressBar,setProgressBar,questionIndex, setQuestionIndex,quizError, setQuizError,
          fingerprintIndex,setFingerprintIndex,fingerprintList,setFingerprintList,gameState, setGameState, listClicked, setListClicked,
          nameExtractFile, showIntructionBot,setShowIntructionBot}}>
            {props.children}
        </UserContext.Provider>
    )
}