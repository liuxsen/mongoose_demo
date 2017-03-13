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

let tankSchema = mongoose.Schema({
    size: String
});

let Tank = mongoose.model('Tank',tankSchema);
/*let tank = new Tank({
    size:"small"
});

tank.save(function(err,doc){
    if(err) console.log(err);
    console.log(doc);
});*/

/*
Tank.create({
    size:'large4'
},function(err,doc){
    if(err) console.log(err);
    console.log(doc);
});
*/

Tank.find({},function(err,docs){
    if(err) console.log(err);
    console.log(docs);
});

/*
// 根据id查询 更新相关数据
Tank.findByIdAndUpdate("58c64b3e478e6728ec358c9e",{$set:{size: "large33"}},function(err,doc){
    if(err) console.log(err);
    console.log(doc);
});*/

/*Tank.findById("58c64ac61b794220347c3199",function(err,doc){
    if(err) console.log(err);
    doc.size = "large_updata";
    doc.save(function(err,doc){
        if(err) console.log(err);
        console.log('数据更新成功了',doc);
    })
})*/

/*
Tank.update({_id:"58c64b2b77c6fe1840739106"},{$set:{size:"large2_update"}},function(err,doc){
    if(err) console.log(err);
    console.log(doc);
})*/

/*
Tank.remove({_id:"58c64b2b77c6fe1840739106"},function(err,doc){
    if(err) console.log(err);
    console.log(doc.result);
})*/
