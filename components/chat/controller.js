const store = require("./store")

function getChat(userId){
    console.log(userId)
    return new Promise((resolve, reject) => {
        resolve(store.list(userId))
    })
}

function addChat (users) {
    return new Promise((resolve, reject) => {
        if (!users || !Array.isArray(users)) {
        return reject(new Error('Invalid user list'));
        
    }

    const chat = {
        users: users
    };

    store.add(chat)
    resolve(chat)
    })
}



module.exports = {
    addChat,
    getChat
}