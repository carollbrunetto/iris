import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';


import './Chatbot.modules.css'
import Feedback from './Feedback';
import Header from './Header';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();


const Chatbot = () => {
  let messagesEnd = useRef(null);
  const [messages, setMessages] = useState([])
  const [objMessage, setObjMessage] = useState([])
  const [show, setShow] = useState(true)
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

  const autoscroll = () => {
    const newMessage = messages.lastElementChild;

  }
  // const scrollToBottom = () => {
   
  // }

  useEffect  ( () => {
    // df_event_query('Welcome')
    // df_event_query('Teste')
    messagesEnd.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"})
  }, [messages])


  const messagesQuickReplies = ((stateMessages, i) => {
    if (stateMessages[1]?.msg && stateMessages[1]?.msg?.text && stateMessages[1]?.msg?.text?.text) {
      console.log('entrou')
      return <Message key={i} speaks={stateMessages[1]?.speaks} text={stateMessages[1]?.msg?.text?.text} />
    } else if (messages.msg &&
      messages.msg.payload &&
      messages.msg.payload.fields &&
      messages.msg.payload.fields.quick_replies
      ) {
        console.log('entrou aqui')
        return <QuickReplies
          text={messages.msg.payload.fields.text ? messages.msg.payload.fields.text : null}
          key={i}
          replyClick={handleQuickReplyPayload}
          speaks={messages.speaks}
          payload={messages.msg.payload.fields.quick_replies.listValue.values}/>
      }
  })

  function handleQuickReplyPayload(e, payload, text) {
    df_text_query(text);
  }

  function returnMessages(stateMessages) {
    // console.log(stateMessages)
    if (stateMessages.messages ) {
    
      return Object.entries(stateMessages.messages).map((message, i) => {
        // console.log('messages', messages)
        return messagesQuickReplies(message, i)
       
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