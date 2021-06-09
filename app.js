const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // to support JSON-encoded bodies  
app.use(cors()); // to enable cors to use api
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


const mongoUrl = 'mongodb+srv://shubham:Shubh123nitu@cluster0.94nyn.mongodb.net/secret'

mongoose.connect(mongoUrl,{useUnifiedTopology:true,useNewUrlParser:true},(err)=>
{
	if(err)
	{
		console.error(err);
	}
	console.log('connected');
})


//react handler


// routes
const user = require('./routes/user');
const message  = require('./routes/message');

app.use(user);
app.use(message);

app.listen(PORT,()=>
{
	console.log('Listening on port 5000');
})