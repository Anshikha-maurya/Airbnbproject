const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderarbnb";
 
main()
    .then(() =>{
        console.log("connect db");

    }).catch((err) =>{
        console.log(err);
    });


async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
     await Listing.deleteMany({});
   initData.data =  initData.data.map((obj) =>({...obj,
    owner:"678dc96351500e983b6d46ff",
}));
     await Listing.insertMany(initData.data);
     console.log("data was initialized")
};
initDB();