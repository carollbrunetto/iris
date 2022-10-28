import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import './Chatbot.modules.css'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Feedback = ({userId}) => {

  const [messages, setMessages] = useState([])
  let messagesEnd = useRef(null);
  const [objMessage, setObjMessage] = useState([])

  const df_event_query = async (eventName) => {
    const res = await axios.post( '/api/df_event_query',  {event: eventName, userId: cookies.get(userId)});
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

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect  ( () => {
    df_event_query('Feedback')
    // df_event_query('Teste')
    // scrollToBottom()
  }, [])


  function returnMessages(stateMessages) {
    
    if (stateMessages.messages) {

      return Object.entries(stateMessages.messages).map((message, i) => {
        console.log(message)
        return <Message key={i} speaks={message[1]?.speaks} text={message[1]?.msg?.text?.text} />
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