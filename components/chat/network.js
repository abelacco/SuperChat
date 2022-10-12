const express = require("express")
const response = require("../../network/response")
const router = express.Router();
const {addChat , getChat} = require("./controller")

router.get("/:userId", async function(req,res) {
    let {userId} = req.params
    console.log(userId)
    try {
        const chats = await getChat(userId)
        response.success(req, res, chats,200)
    }
    catch(error) {
        response.error(req, res, "Unexpected error" ,500 , error)
    }
   
})

router.post("/" , async function(req,res) {
    const {users} = req.body
    try{
    const data = await addChat(users)
    response.success(req, res, data , 201)
    }
    catch (error){
        response.error(req, res, "Internal Error" ,500 , error)
    }
})

module.exports = router;