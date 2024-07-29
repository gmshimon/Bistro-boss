const Users = require('./user.modules')

module.exports.createUser = async (req, res) => {
  try {
    const userData = req.body
    const { name, email, role } = userData
    const user = await Users.findOne({ email })

    if (user) {
      res.status(200).send({
        status: 'Success',
        message: 'User already exists',
        data: user
      })
    } else {
      const result = await Users.create(userData)
      res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: result
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
