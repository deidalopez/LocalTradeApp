const jwt = require('jsonwebtoken');
const Users = require('../models/');
const SECRET_KEY = process.env.SECRET_KEY;

const authorizeUser = async (req, res, next) => {

  // try {

  // } catch (error) {

  // }

  const token = req.header('accessToken');
  const decoded = jwt.verify(token, SECRET_KEY)
  // console.log(decoded.user);
  req.user = decoded.user;
  // console.log(req.user)
  next()

  // if(!authHeaders) return res.status(403).json({error:'Forbidden'});

  // const token = authHeaders.split(' ')[1];

  // try {
  //   const { id } = jwt.verify(token, SECRET_KEY);
  //   const user = await Users.findOne({ id });
  //   if (!user) return res.status(401).json({ error:'Unauthorized'});
  //   req.user  = user;
  //   next();
  // } catch (error) {
  //   res.status(401).json({error:'Unauthorized'})
  // }
}

module.exports = authorizeUser;