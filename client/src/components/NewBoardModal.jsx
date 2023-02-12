import { useState } from 'react'

const NewBoardModal = ({ setShowModal }) => {
    const [boardTitle, setBoardTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className="flex justify-center items-center h-screen fixed inset-0 z-50 outline-none focus:outline-none">
    <div
            className="overlay absolute inset-0 z-0 bg-gray-400 opacity-80"
        ></div>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-4/5 bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-2xl font-semibold">New board</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form action='' method='POST' onSubmit={handleSubmit}></form>
        <div className="relative p-6 flex-auto">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Board title
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="boardTitle"
            placeholder="boardTitle"
            onChange={(e) => setBoardTitle(e.target.value)}
            value={boardTitle}
          />
        </div>
        <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
          <button
            className="bg-emerald-400 text-white active:bg-emerald-600 uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewBoardModal
