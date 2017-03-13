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

let blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String,date: Date}],
    date: {type: Date,default: Date.now},
    hidden: Boolean,
    meta:{
        votes: Number,
        favs: Number
    }
});

let Blog = mongoose.model('Blog',blogSchema);
//实例方法