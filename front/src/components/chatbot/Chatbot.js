import React, { useState } from 'react';
import axios from 'axios/index';

const Chatbot = () => {

  const [messages, setMessages] = useState[[]]

  const df_text_query = async (text) => {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: text
        }
      }
    }

    setMessages({messages: [...messages, says]})

    const res = await axios.post('/api/df_text_query', {text})

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: 'Íris',
        msg:msg
      }
      setMessages({messages: [...messages, says]});
    }

  }

  const df_event_query = async (text) => {
    const res = await axios.post('/api/df_evento_query', {evento});

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'me',
        msg: msg
      }
      setMessages({messages: [...messages, says]})
    } 
  }


  return (
    <div style={{height: 400, width: 400, float: 'right'}}>
      <div id='chatbot' style={{height: '100%', width: '100%', overflow: 'auto'}}>
          <h2>Chatbot</h2>
          <input type="text"/>
      </div>
    </div>
  )
};

export default Chatbot;