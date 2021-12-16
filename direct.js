// let http = require('http')
// let result = require('./baseControl')
let express = require('express')
const path = require('path');
const mysql = require ('mysql');
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({extended:false})


//Database Properties
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'portfolio',
    password:''
})

//Connect to MySql
db.connect(err => {
    if(err) {
        throw err
    }
    console.log("Connected")
})

let app = express()

app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, '/main.html'));
});

app.get("/", (req, res) => {
    res.send("Hi beach");
})
app.get("/contacts", function(req, res) {
    res.sendFile(path.join(__dirname, '/contacts.html'));
});
app.get("/comments", function(req, res) {
    res.sendFile(path.join(__dirname, '/comments.html'));
});
app.get("/images/mash.jpg", function(req, res) {
    res.sendFile(path.join(__dirname, '/images/mash.jpg'));
});
app.get("/addComment", function(req, res) {
    res.sendFile(path.join(__dirname, '/addComment.html'));
});
app.get('/result', (req, res) => {
    let sql = 'SELECT text FROM portfolio.comments'
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results[0].text, '')
        res.send(results)
        
    })

});

app.post('/addComment', urlencodedParser, (req, res) => {
    response = {  
        first_name:req.body.fname,  
        mail:req.body.mail,  
        comment: req.body.comment
    };

    let sql = "INSERT INTO portfolio.comments (name, mail, text) VALUES ('" + response.first_name +"','" + response.mail + "','"+ response.comment + "');"
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log("DB update completed")
        res.send("DataBase Updated")

        
    })

});





// let server = http.createServer(function(req, res) {
//     if(req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/plan'});
//         res.end('Hi beach');
//     }
//     else if(req.url === '/main') {
//         res.writeHead(200,{'Content-Type':'text/html'});
//         fs.createReadStream(__dirname + '/main.html').pipe(res);
//     }
//     else if(req.url === '/contacts') {
//         res.writeHead(200,{'Content-Type':'text/html'});
//         fs.createReadStream(__dirname + '/contacts.html').pipe(res);
//     }
//     else if(req.url === '/comments') {
//         res.writeHead(200,{'Content-Type':'text/html'});
//         fs.createReadStream(__dirname + '/comments.html').pipe(res);
//     }
//     else if(req.url === '/images/mash.jpg') {
//         res.writeHead(200,{'Content-Type':'text/html'});
//         fs.createReadStream(__dirname + '/images/mash.jpg').pipe(res);
//     }
//     else if(req.url === '/newComment') {
//         res.writeHead(200,{'Content-Type':'text/html'});
//         fs.createReadStream(__dirname + '/addComment.html').pipe(res);
//     }


// })

// server.listen(3000, '127.0.0.1');
// console.log("OKEEEEEE")

app.listen(3000, () => {
    console.log('Server ok direct')
} )