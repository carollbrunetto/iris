import React from "react";
import img from './imgs/íris.png'


export default function Header ({isFeedback, setFeedback}) {

  return (
    <div className="chatbot-header">
      <div className="identificacao">
          {isFeedback 
          ? 
          <i className="material-icons return-btn" onClick={setFeedback}>chevron_left</i>
          :
          <div className='imagem'>
            <img src={img} alt='perfil' className='iris-perfil-header'/>
          </div>
          }
        <div className='nome'>
          <p>{isFeedback ? 'Feedback' : 'Íris'}</p>
        </div>
      </div>
      {!isFeedback && (

        <i className="large material-icons feedback-btn" onClick={setFeedback}>announcement</i>

      )}

    
    </div>
  )
}
