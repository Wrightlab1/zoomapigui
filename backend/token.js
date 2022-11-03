
import fetch from "node-fetch";
import * as dotenv from 'dotenv'
dotenv.config()
//console.log(process.env.API_KEY)
//console.log(process.env.API_SECRET)

const ACCOUNTID = process.env.s2s_account_id
const CLIENTID = process.env.s2s_key
const CLIENTSECRET = process.env.s2s_secret




async function generate_token() {
    //Generate Baisc Auth Credentials
    let message = (`${CLIENTID}:${CLIENTSECRET}`)
    let auth = Buffer.from(message).toString('base64')
    //URL must include the accountID
    let FINAL_URL = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ACCOUNTID}`
    //Send the request using fetch
    const res = await fetch(FINAL_URL, {
        method: 'post',
        headers: {
            'authorization': `Basic ${auth}`,
            'content-type': 'application/json'
        }

    })
    //console.log(res)
    const response = await res.json()
    //console.log(response['access_token'])
    return response['access_token']
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkZNdUM4dnhrUnlxWHRvNXRDSHpnVXciLCJleHAiOjE2NjgwOTIxNjAsImlhdCI6MTY2NzQ4Mzc2MH0.axubtKJhlixCKDK65gdfGkIbaBH3xmqyzM9nlJaBDys"
    //return token
}

export { generate_token }
