import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';


import './Chatbot.modules.css'
import Feedback from './Feedback';
import Header from './Header';

const cookies = new Cookies();


const Chatbot = () => {
  let messagesEnd = useRef(null);
  const [messages, setMessages] = useState([])
  const [objMessage, setObjMessage] = useState([])
  const [show, setShow] = useState(true)
  const [fbOn, setFbOn] = useState(true)
  const [feedback, setFeedback] = useState(false)
  let userId;

  if  (cookies.get('userId') === undefined) {
    cookies.set('userId', uuid(), { path: '/' });
  }

 

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


  function handleQuickReplyPayload(e, payload, text) {
    df_text_query(text);
  }

  function returnMessages(stateMessages) {
    if (stateMessages.messages) {

      return Object.entries(stateMessages.messages).map((message, i) => {
       
        return <Message key={i} speaks={message[1]?.speaks} text={message[1]?.msg?.text?.text} />
      })
    } else {
      return null
    }
  }

  function Messages () {
    return (
      <>
        <div className='mensagens' style={{paddingTop: '25px'}}>
          {messages && returnMessages(messages)}
          <div ref={messagesEnd} />
        </div>
        <div className='div-input'>
          <input className='input-msg' type="text" placeholder='Digite aqui...' onKeyUp={handleInputKeyPress}/>
        </div>
      </>
    )
  }

  const handleInputKeyPress = ((e) => { 
      if (e.key === 'Enter') {
          df_text_query(e.target.value);
          e.target.value = '';
      }
    })


  const handleShowBot = () => {
    console.log(show)
    if (show) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  const handleShowFeedback = () => {
    if (feedback) {
      setFeedback(false)
    } else {
      setFeedback(true)
    }

  }

  return  (
    
    <div className='chat-all'>
      <label onClick={handleShowBot}>
        <i className="material-icons">insert_comment</i>
      </label>

      {show && (
        
        <div className='cont chatbot-card'>
          <Header isFeedback={feedback} setFeedback={handleShowFeedback}/>
          {feedback ? <Feedback userId={userId}/> :  <Messages/>}
        </div>
      )}

    </div>
  )
  };

export default Chatbot;