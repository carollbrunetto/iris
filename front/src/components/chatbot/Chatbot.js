import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';




const Chatbot = () => {
  let messagesEnd = useRef(null);
  const [messages, setMessages] = useState([])
  const [objMessage, setObjMessage] = useState([])

  const df_text_query = async (queryText) => {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: queryText
        }
      }
    }
    objMessage.push(says);
    setMessages({ messages:  objMessage});

    const res = await axios.post( '/api/df_text_query', { text: queryText })
    
    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'Íris',
        msg: msg
      }
      objMessage.push(says);
    }
    setMessages({messages: objMessage});

  }

  const df_event_query = async (eventName) => {
    const res = await axios.post( '/api/df_event_query',  {event: eventName});
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'Íris',
        msg: msg
      }
      objMessage.push(says);
    }
    setMessages({messages:  objMessage})
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect  ( () => {
    // df_event_query('Welcome')
    // df_event_query('Teste')
    scrollToBottom()
  }, [messages])

  function Test(stateMessages) {
    if (stateMessages.messages) {

      return Object.entries(stateMessages.messages).map((message, i) => {
       
        return <Message key={i} speaks={message[1]?.speaks} text={message[1]?.msg?.text?.text} />
      })
    } else {
      return null
    }
  }

  const handleInputKeyPress = ((e) => { 
      if (e.key === 'Enter') {
          df_text_query(e.target.value);
          e.target.value = '';
      }
    })


  return (
    <div style={{ height: 400, width: 400, float: 'right' }}>
      <div id='chatbot' style={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <h2>Chatbot</h2>

        {messages && Test(messages)}
        <div ref={messagesEnd} style={{float:"left", clear: "both"}}/>
        <input type="text" placeholder='Digite aqui...' onKeyUp={handleInputKeyPress}/>
      </div>
    </div>
  )
  };

export default Chatbot;