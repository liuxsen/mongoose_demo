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
