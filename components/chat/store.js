const Model = require('./model');


async function getChat(userId) {
    console.log(userId)
    try {
        let filter = {}
        if (userId !== undefined ){
          filter = { users: userId }
        }
        console.log(filter)
        const chat = await Model.find(filter).populate('users').exec();
         console.log(chat)
        return chat;
      } catch (error) {
        console.log(error)
      }    
}

async function addChat(chat) {
    const myChat = new Model(chat);
    myChat.save()
}


module.exports = {
    list: getChat,
    add: addChat,
}