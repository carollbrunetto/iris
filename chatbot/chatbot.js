'use strict'
const dialogflow = require('@google-cloud/dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');
const {struct} = require('pb-util')

const projectId = config.googleProjectId;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
// const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);

module.exports = {
  textQuery: async function(text, userId, parameters = {}) {
    let sessionPath = sessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogFlowSessionId + userId)
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
          text: {
              text: text,
              languageCode: config.dialogFlowSessionLanguageCode
          },
      },
      queryParams: {
        payload: {
            data: parameters
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, userId, parameters = {}) {
    let sessionPath = sessionClient.projectAgentSessionPath(config.googleProjectId, config.dialogFlowSessionId + userId)
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
          event: {
              name: event,
              parameters: struct.encode(parameters),  
              languageCode: config.dialogFlowSessionLanguageCode
          },
      },
    };
    let responses = await sessionClient.detectIntent(request);
    responses = self.handleAction(responses);
    return responses;
  },
  handleAction: function(responses){
    return responses;
  }
}