/**
 * Created by liuxsen on 2017/3/13.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("数据库连接成功了");
});

let animalSchema = new Schema({
    name: String,
    type: String
});

animalSchema.methods.findSimilarTypes = function(cb){
    return this.model("Animal").find({type: this.type},cb);
};

animalSchema.statics.findByName = function(name,cb){
    return this.find({name: name},cb);
};

let Animal = mongoose.model("Animal",animalSchema);
let dog = new Animal({type: 'dog'});
// console.log(dog.model);
dog.findSimilarTypes(function(err,dogs){
    console.log(dogs);
});

Animal.findByName('haha',function(err,docs){
    console.log(docs);
});
