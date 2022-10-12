const express = require("express")
const response = require("../../network/response")
const multer = require("multer")
const router = express.Router();
const {addMessage , getMessage , updateMessage, deleteMessage} = require("./controller")
const upload = multer({
    dest:"public/files/"
});


router.get("/", async function(req,res) {
    let {filterChat} = req.query
    try {
        const allMessage = await getMessage(filterChat)
        response.success(req, res, allMessage,200)
    }
    catch(error) {
        response.error(req, res, "Unexpected error" ,500 , error)
    }
   
})

router.post("/" , upload.single("file") ,async function(req,res) {
    const {chat ,user , message} = req.body
    const {filename} = req.file
    try{
    const newMessage = await addMessage(chat ,user , message , filename)
    response.success(req, res, newMessage , 201)
    }
    catch (error){
        response.error(req, res, error.message ,400 , "Verificar controller")
    }
})

router.patch("/:id", async (req,res) => {
    const {id} = req.params
    const {message} = req.body
    try{
    const updateM = await updateMessage(id , message)
    response.success(req, res, updateM , 200)
    }
    catch (error){
        response.error(req, res, "Error-interno" , 500 , error)
    }
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params
    try{
    const deleteM = await deleteMessage(id)
    response.success(req, res, `Usario: ${id} eliminado ` , 200)
    }
    catch (error){
        response.error(req, res, "Error-interno" , 500 , error)
    }
})

module.exports = router;