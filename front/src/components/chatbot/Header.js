import React from "react";
import img from './imgs/íris.png'


export default function Header ({isFeedback}) {

  return (
    <div className="chatbot-header">
      <div className='imagem'>
        <img src={img} alt='perfil' className='iris-perfil-header'/>
      </div>
      <div className='nome'>
        <p>{isFeedback ? 'Feedback' : 'Íris'}</p>
      </div>
    </div>
  )
}
