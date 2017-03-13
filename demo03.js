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

// define a schema
var personSchema = new Schema({
    name: {
        first: String,
        last: String
    }
});

personSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

personSchema.virtual('name.full').set(function (name) {
    var split = name.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
});


// compile our model
var Person = mongoose.model('Person', personSchema);
// create a document
var bad = new Person({
    name: { first: 'Walter', last: 'White' }
});

console.log(bad.name.first + ' ' + bad.name.last); // Walter White
// 获取full的时候，会进行组合
console.log(bad.name.full); //Walter White

//设置full的时候同时设置了first last
bad.name.full = 'hah lskj';
console.log(bad.name.first); //hah
console.log(bad.name.last); // lskj