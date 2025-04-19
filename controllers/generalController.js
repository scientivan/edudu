const {contentModel} = require('../models/content')

exports.getContentsFromDatabase = async (req,res) => {
    try{
        const contents = await contentModel.find()
        res.status(200).json({contents})
    }
    catch(err){
        console.log(err)
    }
}
exports.getSpecificContentFromDatabase = async (req,res) => {
    try{
        const { id } = req.body;
        console.log(id)
        const content = await contentModel.find({_id : id})
        console.log(content)
        res.status(200).json({content})
    }
    catch(err){
        console.log(err)
    }
}
