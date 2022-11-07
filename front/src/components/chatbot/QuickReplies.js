import React from "react";
import QuickReply from "./QuickReply";
import img from './imgs/íris.png'

const QuickReplies = (props) => {


  function handleClick(e, payload, text) {
    props.replyClick(e, payload, text);
  }

  function renderQuickReply (reply, i) {
    return <QuickReply key={i} click={handleClick} reply={reply}/>
  }


  function renderQuickReplies (quickReplies) {
    console.log(quickReplies)
    console.log('aqui entrou')
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return renderQuickReply(reply, i)
      })
    } else {
      return null;
    }
  }
  console.log(props.payload)
  return (
    <div className="wrapper">
      <div className="panel">
        <div className="panel-wrapper">
          <div className=''>
            <img src={img} alt='perfil' className='iris-perfil'/>
          </div> 
          <div className="quick-replies">
            <p>aqui tem quick reply</p>
            {props.text && 
              <p>
                {props.text.stringValue}
              </p>
            }
            {renderQuickReplies(props.payload)}
          </div>
        </div>
      </div>
    </div>
  )

}

export default QuickReplies;