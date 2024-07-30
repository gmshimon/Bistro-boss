const jwt = require('jsonwebtoken')

module.exports.generateToken = userInfo => {
  const playLoad = {
    id: userInfo._id,
    name:userInfo.name,
    email: userInfo.email,
    role: userInfo.role
  }

  const token = jwt.sign(playLoad, process.env.TOKEN_SECRET, {
    expiresIn: '3h'
  })

  return token
}