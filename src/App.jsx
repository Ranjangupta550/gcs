import { useState } from 'react'

import MainPage from './Pages/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainPage />

    </>
  )
}

export default App
