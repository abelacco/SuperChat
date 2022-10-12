const store = require("./store")

function addMessage (chat , user, message , filename) {
        return new Promise((resolve, reject) => {
            if (!user || !message || !chat ) {
            return reject(new Error('se requiere user y message'));
            
        }
        console.log(filename)
    
        let fileUrl = ""
        if(filename){
            fileUrl = "http://localhost:3000/files/" + filename;
        }
         console.log("fileUrl:", fileUrl)

        const fullMessage = {
            chat ,
            user,
            message,
            date: new Date(),
            file: fileUrl
        };

        store.add(fullMessage)
        resolve(fullMessage)
        })
}

function getMessage(filterChat){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChat))
    })
}

function updateMessage (id, message) {
    return new Promise(async(resolve, reject) => {
        if (!id || !message) {
        return reject(new Error('se requiere id y message'));     
    }
    const updateM = await store.updateT(id,message)
    resolve(updateM)
    })
}

function deleteMessage (id) {
    return new Promise(async(resolve, reject) => {
        if (!id) {
        return reject(new Error('se requiere id'));     
    }
    const deleteM = await store.remove(id)
    resolve()
    })
}





module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage
}