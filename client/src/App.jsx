import { useEffect, useState } from 'react'
import './App.css'

console.log(port);

function App() {

  useEffect(() => {
    const fetchFn = async () => {
      const response = await fetch(import.meta.env.VITE_SERVER_PORT + '/api')
      const result = await response.json()
      console.log(result);
    }
    fetchFn()
  }, [])

  return (
    <>App</>
  )
}

export default App
