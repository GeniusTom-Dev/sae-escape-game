import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { linuxWiki, rigthSide } from '../constants'

function Chrome() {

    const {username, closeWindow} = useContext(UserContext)

  return (
    <div className='w-2/3 h-2/3  relative rounded-lg'>
        <div className='bg-[#181818] w-full h-6 absolute rounded-t-lg'>
            <div className='absolute left-1/2 -translate-x-1/2'>{username}: ~/Chrome</div>
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

        <div className='bg-black w-full h-[calc(100%-1.5rem)] mt-6 rounded-b-lg flex flex-col items-center justify-around pt-4'>
            <div className='bg-[#353535] absolute bottom-[89.9%] left-4 w-1/6 h-[calc(10%-1.5rem)] rounded-t-md flex items-center'>
                <img src="./src/assets/icons/wikipedia.svg" alt="wikipedia" className='w-4 h-4 mx-2 bg-white rounded-sm'/>
                <h1 className='text-lg'>Linux</h1>
                <img src="./src/assets/icons/cross.svg" alt="cross" className='absolute right-0 w-4 h-4 mx-2 rounded-sm'/>
            </div>
            <div className='bg-[#353535] w-full h-[7.5%] absolute bottom-[82.5%] flex items-center'>
                <div className='w-[10%] flex justify-around items-center'>
                    <img src="./src/assets/icons/arrow-left.svg" alt="arrow left" className="w-4 h-4"/>
                    <img src="./src/assets/icons/arrow-right.svg" alt="arrow right" className="w-4 h-4"/>
                    <img src="./src/assets/icons/arrow-rotate.svg" alt="arrow rotate" className="w-4 h-4"/>
                    <img src="./src/assets/icons/house.svg" alt="house" className="w-4 h-4"/>
                </div>
                <input type="text" value="https://fr.wikipedia.org/wiki/Linux" readOnly className='w-[80%] bg-[#202124] rounded-xl pl-4'/>

                <div className='w-[10%] flex justify-around items-center'>
                    <img src="./src/assets/icons/puzzle-piece.svg" alt="puzzle-piece" className="w-4 h-4"/>
                    <img src="./src/assets/icons/user.svg" alt="user" className="w-4 h-4"/>
                    <img src="./src/assets/icons/three-dot.svg" alt="three-dot" className="w-4 h-4"/>
                </div>

            </div>

            <div className='bg-white text-black h-[82.5%] w-full absolute bottom-0 rounded-b-lg overflow-y-scroll'>
                <div className='w-full flex h-[15%] items-center relative'>
                    <img src="./src/assets/icons/bars.svg" alt="bars" className="w-[10%] h-[40%]"/>
                    <img src="./src/assets/wikipedia-logo.png" alt="wikipedia-logo" className='w-1/5'/>
                    <input type="text" placeholder="Rechercher sur Wikipédia" className='w-2/5 h-2/5 border-2 pl-4'/>

                    <div className='absolute right-0 flex order-2 items-center'>
                        <a href="" className='mx-2 text-[#466cd1] hover:underline'>Crée un compte</a>
                        <a href="" className='mx-2 text-[#466cd1] hover:underline'>Se connecter</a>
                        <img src="./src/assets/icons/three-dot-black.svg" alt="three-dot" className="w-4 h-4 rotate-90 mx-2 mr-4"/>
                    </div>
                </div>

                <div className='w-full h-auto flex justify-center mt-12'>
                    <div className='w-3/5 h-auto flex'>
                        <div className='w-[70%] h-auto'>
                            <h1 className='text-2xl'>Linux</h1>
                            <div className='w-full h-[1px] bg-gray-400'></div>

                            <div className='w-full h-[1px] bg-gray-400'></div>

                            <div className='mt-4'>{linuxWiki[0]}</div>

                            <h1 className='text-2xl mt-8'>1991 : naissance du noyau Linux</h1>
                            <div className='w-full h-[1px] bg-gray-400'></div>

                            <div className='mt-4'>{linuxWiki[1]}</div>

                        </div>

                        <div className='w-[30%] h-auto border-[1px] flex flex-col items-center ml-2'>
                            <div className='w-[95%] h-[7.5%] p-4 bg-[#dddddd] flex flex-col justify-center items-center my-2'>
                                <h1>GNU/Linux</h1>
                                <h2>Linux</h2>
                            </div>
                            <img src="./src/assets/linux-logo.png" alt="GNU/Linux Logo" />
                            <img src="./src/assets/ubuntu-interface.png" alt="interface-ubuntu" className='w-[95%]'/>
                            <h3 className='text-center text-sm'><span className="text-[#466cd1]">Ubuntu</span>, une <span className="text-[#466cd1]">distribution GNU/Linux</span>.</h3>
                            <div className='w-[95%] h-1 bg-gray-400'></div>

                            <div className='w-[95%] flex flex-col'>
                                {rigthSide.map((nav, i) => (
                                    <div className='flex w-full mb-2' key={i}>
                                        <div className='w-2/5'>
                                            <h3 className='text-sm'><b>{nav.name}</b></h3>
                                        </div>

                                        <div className='w-3/5'>
                                            <span className="text-[#466cd1] text-sm">{nav.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chrome