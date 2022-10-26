import React from "react";


const QuickReply = (props) => {

  if (props.reply.structValue.fields.stringValue) {

    return (
      <button href='/' 
        onClick={(e) => props.click(
          e,
          props.reply.structValue.fields.payload.stringValue,
          props.reply.structValue.fields.text.stringValue
        )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </button>
    )

  }else {
    return (
      <button href=' '>{props.reply.structValue.fields.text.stringValue}</button>
    )
  }
}

export default QuickReply;