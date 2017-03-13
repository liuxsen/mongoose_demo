# Schema

## Schema 可以定义的数据结构类型

+ String
+ Number
+ Date
+ Buffer
+ Boolean
+ mongoose
+ Schemas 9
+ Mixed
+ ObjectId
+ Array

## Schema 可以定义方法

    + Schema.methods.funcName  model 实例使用
    + Schema.statics.funcName   model使用



# model

var Animal = mongoose.model('Animal', animalSchema);

## 实例方法

```js
    var Tank = mongoose.model('Tank', yourSchema);
    var small = new Tank({ size: 'small' });

    small.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
    // or
    Tank.create({ size: 'small' }, function (err, small) {
        if (err) return handleError(err);
        // saved!
    })

// 查询

Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);

// 删除
Tank.remove({ size: 'large' }, function (err) {
    if (err) return handleError(err);
    // removed!
});

// 更新
//findOneAndUpdate

Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, function (err, tank) {
    if (err) return handleError(err);
    res.send(tank);
});

// 先查找文档，再更新文档
Tank.findById(id, function (err, tank) {
    if (err) return handleError(err);
    tank.size = 'large';
    tank.save(function (err) {
        if (err) return handleError(err);
        res.send(tank);
    });
}
// 不查找文档，直接更新文档
Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);

```

# 子文档

```js
var childSchema = new Schema({ name: 'string' });
var parentSchema = new Schema({
    children: [childSchema]
})

var Parent = mongoose.model('Parent', parentSchema);
var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
parent.children[0].name = 'Matthew';
parent.save(callback);

```

```js
var Parent = mongoose.model('Parent');
var parent = new Parent;
// create a comment
parent.children.push({ name: 'Liesl' });
var subdoc = parent.children[0];
console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
subdoc.isNew; // true
parent.save(function (err) {
if (err) return handleError(err)
console.log('Success!');
});
```

# CRUD

```js
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

let userSchema = new Schema({
    name: String,
    age: Number,
    posts: [{type:Schema.Types.ObjectId,ref:"Post"}]
});
let User = mongoose.model("User",userSchema);

let postSchema = new Schema({
    title: String,
    content: String,
    poster: {type: Schema.Types.ObjectId,ref:"User"}
});
let Post = mongoose.model("Post",postSchema);

//1: 创建suser
/*let user1 = new User({
    name: '李四',
    age: 33
});

user1.save()*/

//2： user 新建文章
/*User.findOne({name:"张三"},function(err,user){
    if(err) console.log(err);
    console.log(user);
//    新建文章
    let post = new Post({
        title:"新建的第一篇博客4",
        content:"这是是第一篇博客的内容4",
        poster: user._id
    });
    user.posts.push(post);
    post.save(function(err,post){
        if(err) console.log(err);
        console.log('文章保存success',post);
    });
    user.save(function(err,doc){
        if(err) console.log(err);
        console.log('更新user的posts success',doc);
    });
});*/



// 3查找用户下面的文章
/*User.findOne({name:"张三"},function(err,user){
    let postIds = user.posts;
    // console.log(postIds);
    let posts = [];
    postIds.map(function(post){
        Post.findOne({_id:post})
            .exec()
            .then(function(post){
                console.log(post);
                posts.push(post);
                console.log("查询到了数据",posts);
            })
    })
});*/

// 3.1 查找用户下面的所有的文章
```js
User.findOne({name:"张三"})
    .populate("posts")
    .exec(function(err,user){
        if(err) console.log(err);
        console.log(user);
    });
```

//4 删除文章
 Post.findOne({_id: "58c65d2f42b6d10054a8b9b2"},function(err,post){
    if(err) console.log(err);
    console.log(post);
    let userId = post.poster;
    let postId = post._id;
    User.findOne({_id:userId},function(err,user){
        let index = user.posts.indexOf(postId);
        user.posts.splice(index,1);
        user.save(function(err,user){
            if(err) console.log(err);
            console.log("文章从user中删除",user);
            post.remove();
        })
    })
 });
```
