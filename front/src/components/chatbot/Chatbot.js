import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from './Message';




const Chatbot = () => {

  const [messages, setMessages] = useState([])


  const df_text_query = async (queryText) => {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: queryText
        }
      }
    }

    setMessages({ messages: [...messages, says] })

    const res = await axios({ 
      method: 'post', 
      url: '/api/df_text_query', 
      data: { queryText },  
      headers: { 'Content-Type': 'text; charset=UTF-8' } 
    })

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'Íris',
        msg: msg
      }
      setMessages({ messages: [...messages, says] });
    }

  }

  const df_event_query = async (eventName) => {
    const res = 
    await axios.post( '/api/df_event_query',  {event: eventName});
    let objMessage = []
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'Íris',
        msg: msg
      }
      objMessage.push(says);
    }
    setMessages({messages: objMessage})
  }


  useEffect  ( () => {
    df_event_query('Welcome')
    df_event_query('Teste')
  }, [])

  function Test(stateMessages) {
    if (stateMessages.messages) {

      return Object.entries(stateMessages.messages).map((message, i) => {
       
        return <Message key={i} speaks={message[1]?.speaks} text={message[1]?.msg?.text?.text} />
      })
    } else {
      return null
    }
  }

  // handleInputKeyPress((e) => { 
     
  // })


  return (
    <div style={{ height: 400, width: 400, float: 'right' }}>
      <div id='chatbot' style={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <h2>Chatbot</h2>

        {messages && Test(messages)}
        <input type="text" />
      </div>
    </div>
  )
  };

export default Chatbot;