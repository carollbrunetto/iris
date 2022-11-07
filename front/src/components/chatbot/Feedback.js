import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import './Chatbot.modules.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();

const Feedback = ({userId}) => {

  const [messages, setMessages] = useState([])
  let messagesEnd = useRef(null);
  const [objMessage, setObjMessage] = useState([])

  const df_event_query = async (eventName) => {
    const res = await axios.post( '/api/df_event_query',  {event: eventName, userId: cookies.get(userId)});
    console.log(res)
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'Íris',
        msg: msg
      }
      objMessage.push(says);
      console.log(says)
    }
    setMessages({messages:  objMessage})
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

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect  ( () => {
    df_event_query('Feedback')
    // df_event_query('Teste')
    // scrollToBottom()
  }, [])

  function handleQuickReplyPayload(e, payload, text) {
    df_text_query(text);
  }

  function messagesQuickReplies(stateMessages, i) {
    if (stateMessages[1]?.msg && stateMessages[1]?.msg?.text && stateMessages[1]?.msg?.text?.text) {
        console.log('entrou')
        return <Message key={i} speaks={stateMessages[1]?.speaks} text={stateMessages[1]?.msg?.text?.text} />
      } else if (stateMessages[1]?.msg &&
        stateMessages[1]?.msg?.payload &&
        stateMessages[1]?.msg?.payload?.fields &&
        stateMessages[1]?.msg?.payload?.fields?.quick_replies
        ) {
          console.log('entrou aqui')
          return <QuickReplies
            text={messages?.msg?.payload?.fields?.text ? messages?.msg?.payload?.fields?.text?.stringValue : null}
            key={i}
            replyClick={handleQuickReplyPayload}
            speaks={messages.speaks}
            payload={messages?.msg?.payload?.fields?.quick_replies?.listValue.values}/>
        }
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
    

  return (
      <div>
        <div className='mensagens' style={{paddingTop: '25px'}}>
          {messages && returnMessages(messages)}
          <div ref={messagesEnd} />
        </div>
      </div>
  )
}

export default Feedback;