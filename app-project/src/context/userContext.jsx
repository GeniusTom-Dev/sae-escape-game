import { createContext, useState } from "react";

export const UserContext = createContext()

export function UserContextProvider(props){

    const [username, setUsername] = useState("Genius")

    const [modalState, setModalState] = useState(false)

    const [showedApp, setShowedApp] = useState(false)

    const [showData, setShowData] = useState([])
    const [value,setValue] = useState();
    

    const closeWindow = () => {
        setShowedApp(false)
    }

    const actionCommand = (command) => {
        if(command == "help"){
            let info = {
                command: command,
                returnText: 
                <div>
                    <p>UserInfo = &#123;</p>
                    <p className="ml-8">&#34;name&#34; : &#34;Even Tom&#34;,</p>
                    <p className="ml-8">&#34;age&#34; : &#34;18 ans&#34;,</p>
                    <p className="ml-8">&#34;name&#34; : &#34;Even Tom&#34;,</p>
                    <p className="ml-8">&#34;name&#34; : &#34;Even Tom&#34;,</p>
                    <p>&#125;</p>
                </div>
            }

            let tempData = showData
            tempData.push(info)
            setShowData(tempData)
            setValue({})
        }

        if(command == "clear"){
            setShowData([])
            setValue({})
        }
    }


    return(
        <UserContext.Provider value={{username, setUsername,modalState, setModalState,showedApp, setShowedApp, closeWindow,actionCommand,showData}}>
            {props.children}
        </UserContext.Provider>
    )
}