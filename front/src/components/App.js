import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './pages/Landing';
import Chatbot from './chatbot/Chatbot'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Landing />}/>
          </Routes>
          <Chatbot/>
        </div>
      </BrowserRouter>
      
    </div>
  )
} 

export default App;