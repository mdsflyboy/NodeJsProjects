const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbName = "photoLabels";
const url = "mongodb://localhost:27017";
const collectionName = "labels";
const mongoOptions = {useNewUrlParser: true};

const state = {
    db: null
};

const connect = (cb) => {
    if(state.db){
        cb();
    }else{
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if(err){
                cb(err);
            }else{
                state.db = client.db(dbName);
                cb();
            }
        });
    }
}

const id = (id) => {
    return ObjectID(id);
}

const getDb = ()=>{
    return state.db.collection(collectionName);
}

module.exports={connect, id, getDb};