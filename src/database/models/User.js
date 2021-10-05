const fs = require("fs");
const path = require("path")

const User = {

    fileName: path.resolve(__dirname,'../users.json'),

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },

    findAll: function () {
        return this.getData();
    },
    
    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}

// console.log(User.getData())

module.exports = User;
