const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const logger = require('../helpers/logger').logger


const createToken = () => {
  return jwt.sign({}, process.env.SECRET, { expiresIn: '4d' })
}


// create a new customer
const loginAdmin = async (req, res) => {
  const {username,password} = req.body

  let emptyFields = []

  if (!username) {
    emptyFields.push('username')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields:', emptyFields })
  }

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ error: 'Invalid username' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Authentication successful
    const token = createToken();
    return res.status(200).json({ message: 'Authentication successful', token});
  } catch (error) {
    logger.error("Error loging in admin:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  loginAdmin
}