const { Users, Posts } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const validator = require('validator');

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
  if (!validator.isStrongPassword(password, {
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumber: 1,
  })) return res.status(400).json({ error: "Weak password, should contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number" })
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = Users.build({
      ...req.body,
      password: hashPassword
    });
    await newUser.save();

    const { id } = newUser;
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
    if (!userInDB) return res.status(404).json({ error: "400", message: "No user with this email" })
    const validatePassword = await bcrypt.compare(password, userInDB.password);

    if (!validatePassword) throw new Error();
    const accessToken = jwt.sign({ id: userInDB.id }, SECRET_KEY);
    res.status(200).json({ accessToken })
  } catch (error) {
    res.status(400).json({ error: '500', message: 'error' });
  }
}

// get user 
const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    let user = await Users.findOne({ where: { id: id } })
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: '400', message: 'Email or password is incorrect' });
  }
}

// get user by email
const getUserByEmail = async (req, res) => {
  const email = req.params.userEmail;
  try {
    let user = await Users.findOne({ where: { email: email } })
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

//get post
const getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
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
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: "could not get posts" });
  }
}

//make post
const newPost = async (req, res) => {
  const { description, image_url, user_id, longitude, latitude } = req.body;
  if (description.length < 5) return res.json("please enter a longer description")
  const user = await Users.findOne({ where: { id: user_id } })

  if (!user) res.status(400).json({ error: "user with this id not found" })
  try {
    const newPost = Posts.build({
      description: description,
      image_url: image_url,
      longitude: longitude,
      latitude: latitude,
      user_id: user.id
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "could not create post" });
  }
}
 
module.exports = { grabAll, createUser, newPost, login, getUser, getUserByEmail, getUserById, getPosts, getPostsByUserId }