import React from "react";


const QuickReply = (props) => {

  if (props.reply.structValue.fields.payload) {
    return (
      <button className= 'quick-replies' href='/' 
        onClick={(e) => props.click(
          e,
          props.reply?.structValue?.fields?.payload?.stringValue,
          props.reply?.structValue?.fields?.text?.stringValue
        )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </button>
    )

  } else {
    return (
      <button href={props.reply.structValue.fields.link.stringValue}>
        {props.reply.structValue.fields.text.stringValue}
      </button>
    )
  }
}

export default QuickReply;