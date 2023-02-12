import Board from '../components/Board'
import HamburgerMenu from '../components/HamburgerMenu'

const DashBoard = () => {

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
            </div>
        </div>
    </div>
  )
}

export default DashBoard