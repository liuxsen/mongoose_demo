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

let childSchema = new Schema({
    name: String
});
let parentSchema = new Schema({
    children:[childSchema]
});

let Parent = mongoose.model('Parent',parentSchema);
let parent = new Parent;

parent.children.push({name:'hahah'});
let subdoc = parent.children[0];
console.log(subdoc);
console.log(subdoc.isNew);

// parent.save(function(err,doc){
//     if(err) console.log(err);
//     console.log('success',doc);
// });

/*let parent = new Parent({children:[{name:"child1"},{name:"child2"}]});
parent.children[0].name = "child1_1";
parent.children[0].name = 1;*/
/*parent.save(function(err,doc){
    if(err) console.log(err);
    console.log(doc);
});*/

/*
Parent.find({},function(err,docs){
    if(err) console.log(err);
    console.log(docs);
});*/


