const Table = require("./table.modules")

module.exports.getTable = async (req,res,next)=>{
    try{
        const result = await Table.find({})
        res.status(200).json({
            status: 'Success',
            message: 'Tables successfully fetched',
            data: result
        })
    }catch(error){
        res.status(400).json({
            status: 'Fail',
            message: 'Failed to fetch tables',
            error: error.message
        })
    }
}