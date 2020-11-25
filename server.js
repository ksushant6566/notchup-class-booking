const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ksushant6566@gmail.com',
      pass: 'Sushant@6566'
    }
  });


app.post('/submit', (req, res) => {
    // console.log(req.body)

    const mailOptions = {
        from: 'ksushant6566@gmail.com',
        to: `${req.body.parentEmail}`,
        subject: 'NothUp Trial Class Booked succeessfully',
        text: `Dear ${req.body.parentName}\n${req.body.childName}'s class at ${req.body.trialSlot} has been successfully booked.`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.json("unsuccessfull")
        } else {
            console.log('Email sent: ' + info.response);
            res.json("successfull")
        }
      });
})


app.get('/', (req, res) => {
    res.send("<h1>How you doing!</h1>")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("hello world");
})

