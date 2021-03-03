const mongoose = require('../database');

const postSchema = new mongoose.schema ({
  description: {
    type: String, 
    required: true
  }, 
  image: {
    data: Buffer, 
    type: String
  },
  
})

const userSchema = new mongoose.Schema ({
  name: {
    type: String, 
    required: true
  }, 
  email: {
    type: String, 
    required: true,
  }, 
  password: {
    type: String, 
    required: true
  }, 
  posts: {
    type
  }
})

module.exports = mongoose.model('User', userSchema);
