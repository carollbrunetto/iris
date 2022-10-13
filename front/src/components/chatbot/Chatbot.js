import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from './Message';




const Chatbot = () => {

  const [messages, setMessages] = useState([])

  // setMessages({
  //   speaks: "aaa",
  //   message:{
  //     msg: {
  //       txt: {
  //         txt: "inferno"
  //       }
  //     }
  //   }

  // })

  // console.log(messages)


  const df_text_query = async (queryText) => {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: queryText
        }
      }
    }

    setMessages({messages: [...messages, says]})

    const res = await axios.post('/api/df_text_query', {queryText})

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'Íris',
        msg:msg
      }
      setMessages({messages: [...messages, says]});
    }

  }

  const df_event_query = async (eventName) => {
    const res = await axios.post('/api/df_event_query', {eventName});

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'me',
        msg: msg
      }
      setMessages({messages: [...messages, says]})
    } 
  }


    // useEffect (() => {
    //   df_event_query('Welcome')
    // }, [])

    function Test (stateMessages) {
      if (stateMessages) {
        return stateMessages.map((message, i) => {
          return <Message key={i} speaks={message.speaks} text={message.msg.text.txt}/>
        })
      } else {
        return null
      }
    }

    console.log(messages)

  return (
    <div style={{height: 400, width: 400, float: 'right'}}>
      <div id='chatbot' style={{height: '100%', width: '100%', overflow: 'auto'}}>
          <h2>Chatbot</h2>
          {Test(messages)}
          <input type="text"/>
      </div>
    </div>
  )
};

export default Chatbot;