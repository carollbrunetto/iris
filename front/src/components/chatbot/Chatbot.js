import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';

import img from './imgs/iris-perfile.png'
import './Chatbot.modules.css'

const cookies = new Cookies();


const Chatbot = () => {
  let messagesEnd = useRef(null);
  const [messages, setMessages] = useState([])
  const [objMessage, setObjMessage] = useState([])
  let userId;

  if  (cookies.get('userId') === undefined) {
    cookies.set('userId', uuid(), { path: '/' });
  }

  console.log(cookies.get('userId'))

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

    const res = await axios.post( '/api/df_text_query', { text: queryText, userId: cookies.get(userId) })
    
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
    const res = await axios.post( '/api/df_event_query',  {event: eventName, userId: cookies.get(userId)});
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
    <div className="teste">
      <div className='chatbot-card'>
        <div className="chatbot-header">
          <div className="iris-header">
            <div className='imagem'>
              <img src={img} alt='perfil' className='iris-perfil-header'/>
            </div>
            <div className='nome'>
              <p>Íris</p>
            </div>
          </div>
        </div>
        {messages && Test(messages)}
        <div ref={messagesEnd} style={{float:"left", clear: "both"}}/>
        <input type="text" placeholder='Digite aqui...' onKeyUp={handleInputKeyPress}/>
      </div>
    </div>
  )
  };

export default Chatbot;