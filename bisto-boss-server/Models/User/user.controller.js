const { generateToken } = require('../../Utilis/token')
const Users = require('./user.modules')

module.exports.createUser = async (req, res) => {
  try {
    const userData = req.body
    const { name, email, role } = userData
    const user = await Users.findOne({ email })

    if (user) {
      const token = generateToken(user)
      
      res.status(200).send({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
      const result = await Users.create(userData)
      const token = generateToken(result)
      res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: result,
        token: token
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to create user',
      error: error.message
    })
  }
}

module.exports.getAllUsers = async(req,res,next)=>{
    try{
        const users = await Users.find()
        res.status(200).json({
            status: 'Success',
            message: 'Users fetched successfully',
            data: users
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Fail',
            message: 'Failed to fetch users',
            error: error.message
        })
    }
}
