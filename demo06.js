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

var personSchema = Schema({
    _id     : Number,
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
    _creator : { type: Number, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

/*aaron.save(function (err) {
    if (err) return handleError(err);

    var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id    // assign the _id from the person
    });

    story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
    });
});*/

Story
    .findOne({ title: 'Once upon a timex.' })
    .populate('_creator',"name")
    .exec(function (err, story) {
        if (err) return handleError(err);
        console.log('The creator is %s', story);
        // prints "The creator is Aaron"
    });