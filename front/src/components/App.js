import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './pages/Landing';
import Chatbot from './chatbot/Chatbot'

console.log('loucura')

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Landing />}/>
          </Routes>
          <Chatbot/>
        </div>
      </BrowserRouter>
      <button>aaaaaaa</button>
    </div>
  )
} 

export default App;