const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')

const app = express()
app.use(bodyParser.json())
require('dotenv').config()

app.post('/sms', (req,res)=>{
    const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    if(req.body.phoneNumber){					 
        client.messages.create({
            to: '+252' + req.body.phoneNumber,
            //twilio provided phone Number
            from: process.env.FROM_PHONENUMBER,
            body: req.body.message
        })
        res.send('sms sent')
        
    }else{
        res.send('no phone number provided')
    }
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`server running on port${PORT}` )
})