import { useState } from 'react'

import Board from '../components/Board'
import HamburgerMenu from '../components/HamburgerMenu'
import NewBoardModal from '../components/NewBoardModal';

const DashBoard = () => {
    const [showModal, setShowModal] = useState(false);
    
    const handleNewBoard = () => {
        setShowModal(true)
    }


  return (
    <div className="flex relative h-full min-h-screen w-fit min-w-full md:h-screen p-4">
        <div
            className="overlay absolute inset-0 z-0 bg-gradient-to-r from-teal-400 to-yellow-200 opacity-20"
        ></div>
        <div className='w-full flex flex-col z-40'>
            <div className='flex justify-between items-center'>
                <div className='md:order-2'></div>
                <div className='md:order-1'>
                    <HamburgerMenu />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full pt-3 md:flex-row md:w-fit'>
                <Board key={1}/>
                <Board key={2}/>
                <Board key={3}/>
                {/* <Board key={4}/>
                <Board key={5}/> */}
            </div>
            <div className='flex justify-center mt-7 md:hidden'>
                <button onClick={handleNewBoard} type='button' className='flex w-40 items-center justify-center inline-block p-1 border-2 border-gray-400 text-gray-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    New board
                </button>
            </div>
        </div>
        {showModal && (
            <NewBoardModal setShowModal={setShowModal} />
        )}
    </div>
  )
}

export default DashBoard