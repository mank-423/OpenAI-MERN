import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserAuthPage from './Pages/UserAuth'
import Chat from './Pages/Chat'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserAuthPage/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
