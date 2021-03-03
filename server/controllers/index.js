const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/index');



const create = async (req, res) => {
  const {email, password} = req.body; 
  const alreadyUser = await User.findOne({email:email});
  if (alreadyUser) return res.status(409).send({error:'409', message:'Email is already in use'})
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser  = new User ({ ...req.body, password:hashPassword});
    await newUser.save();

    const {_id} = newUser;
    const accessToken = jwt.sign({_id}, SECRET_KEY);
    res.status(201).json(accessToken);
  } catch (error) {
    res.status(400).json({error:'400', message:'Could not create a new user'});
    }
}

module.exports = {create}