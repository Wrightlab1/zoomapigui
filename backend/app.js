import fetch from "node-fetch";
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import winston from 'winston'
import { generate_token } from './token.js'

const app = express()
const port = 3000
const base_url = 'https://api.zoom.us/v2/'


//Setup Winston for logging
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// use it before all route definitions
app.use(cors({ origin: '*' }));
app.use(bodyParser.json())

async function send_to_zoom(action, url, data) {
  const token = await generate_token()
  logger.info('Sending API request to Zoom');
  logger.debug(`ACTION: ${action}, URL: ${url}, BODY: ${data}`)
  const res = await fetch(base_url + url, {
    method: action,
    mode: 'no-cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }

  })
  logger.info(`RESPONSE STATUS: ${res.status}`);
  if (res.status == 204) {

    let response = "204"
    return response
  } else if (res.status == 200 || res.status == 201) {
    let response = await res.json()
    return [res.status, response]
  } else if (res.status == 400 || res.status == 401 || res.status == 403 || res.status == 404 || res.status == 409) {
    let response = await res.json()
    logger.debug(`ERROR: ${res.status}, RESPONSE: ${response}`)
    return [res.status, response]
  } else if (res.status == 429) {
    let response = await res.json()
    logger.debug(`ERROR: ${res.status}, RESPONSE: ${response}`)
    return [res.status, response]
  } else {
    let response = await res.json()
    logger.debug(`ERROR: ${res.status}, RESPONSE: ${response}`)
    return [res.status, response]
  }
  //console.log(response)

}


app.get('/', (req, res) => {
  logger.info("GET request received from frontend")
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  let action = req.query.action
  let url = req.query.zoomurl
  let data = req.query.data
  send_to_zoom(action, url, data)
    //.then(result => res.send(JSON.stringify(result, null, 4)))
    .then(result => {
      let message = `Status : ${result[0]}, RESPONSE: ${JSON.stringify(result[1], null, 4)}`
      res.send(message)
    })
    .catch(err => res.status(500).send(err))
})

app.post('/', (req, res) => {
  logger.info("POST request received from frontend")
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  let action = req.query.action
  let url = req.query.zoomurl
  let data = req.body
  console.log(action, url, data)
  send_to_zoom(action, url, data)
    .then(result => {
      let message = `Status : ${result[0]}, RESPONSE: ${JSON.stringify(result[1], null, 4)}`
      res.send(message)
    })
    .catch(err => res.status(500).send(err))
})




app.listen(port, () => { console.log(`App is listening on port ${port}`) })