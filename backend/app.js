import fetch from "node-fetch";
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { generate_token } from './token.js'

const app = express()
const port = 3000
const base_url = 'https://api.zoom.us/v2/'

// use it before all route definitions
app.use(cors({ origin: '*' }));
app.use(bodyParser.json())

async function send_to_zoom(action, url, data) {
  const token = await generate_token()

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
  console.log('Status Code:', res.status);
  const response = await res.json()
  //console.log(response)
  return response
}


app.get('/', (req, res) => {
  console.log('get')
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  let action = req.query.action
  let url = req.query.zoomurl
  let data = req.query.data
  console.log(action, url, data)
  send_to_zoom(action, url, data)
    .then(result => res.send(JSON.stringify(result, null, 4)))
    .catch(err => res.status(500).send(err))
})

app.post('/', (req, res) => {
  console.log('post')
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  let action = req.query.action
  let url = req.query.zoomurl
  let data = req.body
  console.log(action, url, data)
  send_to_zoom(action, url, data)
    .then(result => res.status(200).send(JSON.stringify(result, null, 4)))
    .catch(err => res.status(500).send(err))
})


app.listen(port, () => { console.log(`App is listening on port ${port}`) })