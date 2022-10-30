

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=>{
  res.sendFile(__dirname+"/signup.html");

})

app.post('/', (req,res)=>{
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.Email;
  const data = {
             email_address: email,
             status: "subscribed",
             merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName,

                 },
             };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/1211882ae9/members";
  const options = {
    method: "POST",
    auth: "aks:af5b7955b28bc84f4f868c3903ed4c4f-us21"
  }
  const request = https.request(url, options, (response)=>{
    if (response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    } else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", (data)=>{
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});


app.post('/failure',(req,res)=>{
  res.redirect('/');
})







app.listen(process.env.PORT || 3000, ()=>{
  console.log("server is listening on port 3000");
})


// af5b7955b28bc84f4f868c3903ed4c4f-us21
// 1211882ae9
