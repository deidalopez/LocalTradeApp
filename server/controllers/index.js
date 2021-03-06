const { Users, Posts } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const grabAll = async (req, res) => {
  try {
    const allUsers = await Users.findAll()
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "error while fetching all users" });
  }
}

// register
const createUser = async (req, res) => {
  const { email, password } = req.body;
  let alreadyExistingUser = await Users.findOne({ where: { email: email } });
  if (alreadyExistingUser) return res.status(500).send({ error: "already exists" });
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = Users.build({
      ...req.body,
      password: hashPassword
    });
    await newUser.save();
    // const payload = {
    //   user: {
    //     id: newUser.id,
    //   }
    // }
    const { id } = newUser;
    // const accessToken = jwt.sign(payload, SECRET_KEY);
    const accessToken = jwt.sign({ id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log('error');
    res.status(500).send('error')
  }
}

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInDB = await Users.findOne({ where: { email: email } });
    if (!userInDB) return res.status(404).json({ error: "No user with this email" })
    const validatePassword = await bcrypt.compare(password, userInDB.password);
    const payload = {
      user: {
        id: userInDB.id
      }
    }

    if (!validatePassword) throw new Error();
    const accessToken = jwt.sign(payload, SECRET_KEY);
    // const accessToken = jwt.sign({ id: userInDB.id }, SECRET_KEY);
    res.status(200).json({ accessToken })
    // res.status(200).json(userInDB)
  } catch (error) {
    res.status(400).json({ error: '500', message: 'error' });
  }
}

// get user 
const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    let user = await Users.findOne({ where: { id: id } })
    console.log('got user')
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: '400', message: 'Email or password is incorrect' });
  }
}

// get user by email
const getUserByEmail = async (req, res) => {
  const email = req.params.userEmail;
  console.log(email)
  try {
    let user = await Users.findOne({ where: { email: email } })
    console.log('got user')
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: '500', message: 'Couldnt find user with that email' });
  }
}

// get user by id
const getUserById = async (req, res) => {
  const id = req.params.userId;
  console.log(id)
  try {
    let user = await Users.findOne({ where: { id: id } })
    console.log('got user')
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: '500', message: 'Couldnt find user with that id' });
  }
}

//make post
const newPost = async (req, res) => {
  const { description, id, image_url, user_id } = req.body;
  if (description.length < 5) return res.json("please enter a longer description")
  try {
    const user = await Users.findOne({ where: { id: user_id } })
    console.log(req.user.id)
    const newPost = Posts.build({
      description: description,
      id: id,
      image_url: 'imageurl',
      user_id: req.user.id //maybe delete
    });
    await newPost.save();
    console.log(newPost)
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "could not create post" });
  }
}

//get post
const getPosts = async (req, res) => {
  // const {description, id, image_url, user_id} = req.body;
  try {
    const posts = await Posts.findAll();
    console.log(posts)
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: "could not get posts" });
  }
}

//get post by userId
const getPostsByUserId = async (req, res) => {
  const { id } = req.body;
  try {
    const posts = await Posts.findAll({ where: { user_id: id } });
    console.log(posts)
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: "could not get posts" });
  }
}

//get posts by email? 
module.exports = { grabAll, createUser, newPost, login, getUser, getUserByEmail, getUserById, getPosts, getPostsByUserId }