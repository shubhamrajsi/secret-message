const router = require('express').Router();
const messageSchema = require('../models/Messages');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const verifyToken = require('../controllers/verifyToken')

router.post('/:id',async (req,res)=>
{
	const {message} = req.body;
	let Id = req.params.id;
	try{
		let messages = await messageSchema.create({userId:ObjectId(`${Id}`),message:message})
		res.send(messages);
	}
	catch(err)
	{
		console.error(err)
		res.send(err);
	}

})
router.get('/messages',verifyToken, async (req,res)=>
{
	console.log('aaya isme')
	
	let user = jwt.verify(req.token, 'thefunisallaboutjwt');
	try{
		let results = await messageSchema.find({userId:user.new_user.id});
		console.log(results)
		res.send({data:results,user_id:user.new_user.id});
	}
	catch(err)
	{
		console.error(err)
		res.send(err);
	}

})
router.get('/:id',async (req,res)=>
{
	let Id = req.params.id;
	try{
		let results = await messageSchema.find({userId:Id});
		res.send(results);
	}
	catch(err)
	{
		console.error(err)
		res.send(err);
	}
})

module.exports = router;