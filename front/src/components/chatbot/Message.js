import React from 'react'
import img from './imgs/íris.png'



const Message = ({speaks, text}) => {

  return (
  <div className={`col s12 m8 offset-m2 offset-13 `}> 
      <div className={`col s10 ${speaks === "Íris" ? "balao-iris" : "balao-usuario" }`}>
        <div className={`${speaks === "Íris" ? "grandao-iris" : null }`}>
          {speaks==="Íris" &&
          <div className=''>
            <img src={img} alt='perfil' className='iris-perfil'/>
          </div> 
          }
          <div className={` ${speaks === "Íris" ? "msg-iris" : "msg-usuario" }`}>
            <span className={`black-text `}>
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Message;