const Orders = require("./order.modules")

module.exports.makeOrder = async(req,res,next)=>{
    try{
        const {email} =req.user
        const data = req.body
        data.email = email

        const result = await Orders.create(data)

        res.status(200).json({
            status: 'Success',
            message: 'Order successfully created',
            data: result
        })
    }catch(error){
        res.status(400).json({
            status: 'Fail',
            message: 'Failed to create order',
            error: error.message
        })
    }
}

module.exports.getMyOrder = async (req, res,next) => {
    try {
        const {email} =req.user

        const result = await Orders.find({ email })
        // if(!result){
        //     return res.status(404).json({
        //         status: 'Fail',
        //         message: 'Order not found',
        //     })
        // }
        
        res.status(200).json({
            status: 'Success',
            message: 'Order successfully fetched',
            data: result,
        })
    } catch (error) {
        res.status(error).json({
            status: 'Fail',
            message: 'Failed to fetch order',
            error: error.message,
        })
    }
}