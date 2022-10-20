import React from 'react'
import img from './imgs/iris-perfile.png'



const Message = ({speaks, text}) => {

  return (
    <div className='col s12 m8 offset-m2 offset-13'>
      <div className='card-panel'>
        <div className='row valign-wrapper'>
          {speaks==="Íris" &&
          <div className='col s2'>
            <img src={img} alt='perfil' className='iris-perfil'/>
          </div> 
          }
          <div className='col s10'>
            <span className='black-text'>
              {text}
            </span>
          </div>
          {speaks==='me' &&
          <div className='col s2'>
            <a href= '/' className='btn-floating btn-large waves-effect waves-light red'>
              {speaks}
            </a>
          </div>
          }
        </div>
      </div>
    </div>
  )
};

export default Message;