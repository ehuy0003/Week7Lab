// get a reference to mongoose
let mongoose = require('mongoose');

// from ref, get the client
let bodyParser=require('body-parser'); // middleware for the post request

// from the client get the db
let express = require ('express');
let app = express();

// referencing to modules
let Task = require('./models/task');
let Developer = require('./models/developer');

// body-parser
app.use(bodyParser.urlencoded({extended:false}));

// finding static documents
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/css"));


let url = "mongodb://localhost:27017/week7lab";

//mongoose
mongoose.connect(url,function(err){
    if(err) 
        console.log(err)
    else {console.log('Connected!')}
}) 

//GET INDEX PAGE
app.get('/',function(req,res){
    res.render(__dirname + "/views/addtask.html");
}); 

// GET DEVELOPER PAGE
app.get('/developer', function(req,res){
    res.render( __dirname + "/views/developer.html")
});

// POST DEVELOPER PAGE
app.post('/addNewDev', function(req,res){
    let devDetails = req.body;
    let developer = new Developer({
            name: {fname: devDetails.devFirstName ,lname: devDetails.devLastName},
            level: devDetails.devLevel,
            address: {
                state: "" + devDetails.devState,
                suburb: "" + devDetails.devSuburb,
                street: "" + devDetails.devStreet,
                unit: "" + parseInt(devDetails.devUnit)
            }
        });

        developer.save(function(err){
            if (err)
                console.log(err);
            else
                console.log('Dev Saved');
                res.redirect('/getdevelopers');   
        })
})

//GET TASK PAGE
app.get('/task', function(req, res){
    res.render( __dirname + "/views/addTask.html")
});

//POST INSERT TASK
app.post('/addnewtask', function(req,res){
    let taskDetails = req.body;
    let task = new Task({
            name: taskDetails.tName,
            assign: taskDetails.tDevid,
            due: taskDetails.tDate,
            status: taskDetails.tStatus,
            desc: taskDetails.tDesc
        });

        task.save(function(err){
            if (err)
                console.log(err);
            else
                console.log('Task Saved');
                res.redirect('/');
                   
        })
});

// GET ALL DEVELOPER PAGE
app.get('/alldev', function(req,res){
    res.render(__dirname + "/views/allDev.html", {devDB: data})
});

// GET ALL TASKS PAGE
app.get('/gettasks',function(req,res){
    col.find({}).sort({name:1, status:-1}).toArray(function (err, data) {
        res.render(__dirname + "/views/gettasks.html", { tasksDb: data });
    });
}); 

// GET DELETE TASK
app.get('/deletetask', function (req, res) {
    res.sendFile(__dirname + '/views/deletetask.html');
});

// POST DELETE TASK
app.post('/deletetaskdata', function (req, res) {
    let taskDetails = req.body;
    let filter = { id: taskDetails.tid };
    col.deleteOne(filter);
    res.redirect('/gettasks');// redirect the client to list users page
});

// GET DELETE COMPLETED TASK
app.get('/deletecomplete', function (req, res) {
    res.sendFile(__dirname + '/views/deletecomplete.html');
});

// POST DELETE TASK
app.post('/deletecompletedata', function (req, res) {
    let taskDetails = req.body;
    let filter = { status: "C" };
    col.deleteOne(filter);
    res.redirect('/gettasks');// redirect the client to list users page
});

// GET UPDATE TASK
app.get('/updatetask', function (req, res) {
    res.sendFile(__dirname + '/views/updatetask.html');
});

// POST UPDATE DATA
app.post('/updatetaskdata', function (req, res) {
    let taskDetails = req.body;
    let filter = { id: taskDetails.tid };
    let theUpdate = { $set: { status:taskDetails.tstatus} };
    col.updateOne(filter, theUpdate);
    res.redirect('/gettasks');// redirect the client to list users page
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(8080);