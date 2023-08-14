const mongoose = require('mongoose');


const Schema = mongoose.Schema;

//1- Create a new schema 
const gameSchema = new Schema({
     
    title:{
        type : String,
        required : true
    },
    thumbnail:{
        type : String,
        required : true
    },
    short_description:{
        type : String,
        required : true
    },
    game_url:{
        type : String,
        required : true
    },
    freetogame_profile_url:{
        type : String,
        required : true
    },
    rate:{
        type : Array,
        required : false,
    },
    rating: {
        type : String,
        required : false,
        default : '0'
    },
    UsersIdRate:{
        type : Array,
        required : false,
    },
    UsersIdFavorite:{
        type : Array,
        required : false,
    }

    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('Game',gameSchema);
    




    