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

let kittySchema = mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function(){
    let greeting = this.name ? 'meow name is '+ this.name: "i don't hava a name";
    console.log(greeting);
};

// 模式将会具有模型的方法
let Kitten = mongoose.model('Kitten',kittySchema);

// 模式实例具有模型的方法；
// 模式实例同时具有save方法
let fluffy = new Kitten({name: 'fluffy'});

fluffy.save(function(err,fluffy){
    if(err) return console.error(err);
    fluffy.speak();
});
Kitten.find({},function(err,docs){
    if(err) console.log(err);
    console.log(docs);
});
