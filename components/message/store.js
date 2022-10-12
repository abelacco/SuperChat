const Model = require('./model');


 async function addMessage(message) {
    const myMessage = await new Model(message);
    myMessage.save()
}

async function getMessage(filterChat) {
    try {
        let filter = {}
        if (filterChat !== undefined ){
          filter = { "chat": filterChat }
        }
        const messages = await Model.find(filter).populate('user', {
          name: true,
         })
        return messages;
      } catch (error) {
        console.log(error)
      }    
}

async function updateText(id, message) {
    const foundMessage = await Model.findById(id)
    foundMessage.message = message
    const newMessage = await foundMessage.save()
    return newMessage
}

async function removeMessage(id) {
    const deleteM = await Model.deleteOne({_id:id})  
    return deleteM
}


module.exports = {
    add: addMessage,
    list: getMessage,
    updateT: updateText,
    remove: removeMessage
}

