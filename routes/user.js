const router = require('express').Router();
const userSchema = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (new_user)=>
{
	const token = jwt.sign({new_user},'thefunisallaboutjwt',{
		expiresIn : maxAge
	});
	return token;
}
router.post('/signup',async (req,res)=>
{
	
	const {name,username,password} = req.body;
	try{
		let user = await userSchema.create({name,username,password})
		console.log(user);
		let new_user = {
			id : user._id,
			name:user.name,
			username:user.username,
		}
		const new_token = await createToken(new_user);
		console.log(new_token)
		
		res.send({token:new_token});
	}
	catch(err)
	{
		console.error(err);
		res.send('some error occured');
	}

	
})
router.post('/login',async (req,res)=>
{
	const {username ,password} = req.body;
	try
	{
		let user_details = await userSchema.find({username:username})
		console.log(user_details);
		bcrypt.compare(`${password}`,`${user_details[0].password}`).then(function(result) {
		    if(result)
		    {
		    	let new_user = {
				id : user_details[0]._id,
				name:user_details[0].name,
				username:user_details[0].username
				}
				const login_token =  createToken(new_user);
				res.json({token:login_token})

			}
			
	    
		    res.send({error : 'password not matched'})
		})
		
	}
	catch(err)
	{
		console.error(err)
		res.send(err);
	}
})
router.get('/',(req,res)=>
{
	res.send('han han han')
})


module.exports = router;