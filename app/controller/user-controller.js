const makeUser = require("../data/user-fabric");

function insertUser(){
    try {
        const user = makeUser({ id: 1 });
    } catch (err){
        console.log("We Found an error! : ", err.message);
    }
}

insertUser();
