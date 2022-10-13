import React from 'react'

const Message = ({speaks, text}) => {
  <div className='col s12 m8 offset-m2 offset-13'>
    <div className='card-panel grey lighten-5 z-depth-1'>
      <div className='row valign-wrapper'>
        {speaks==='Íris' &&
        <div className='col s2'>
          <a class="btn-floating btn-large waves-effect waves-light red">
            {speaks}
          </a>
        </div> 
        }
        <div className='col s10'>
          <span className='black-text'>
            {text}
          </span>
        </div>
        {speaks==='me' &&
        <div className='col s2'>
          <a class="btn-floating btn-large waves-effect waves-light red">
            {speaks}
          </a>
        </div>
        }
      </div>
    </div>
  </div>
};

export default Message;