const express = require('express');
const EHBS = require('express-handlebars');
const path = require('path');

const app = express();
const Users = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.engine('.hbs', EHBS({
        extname: '.hbs'
    })
);
app.engine('.hbs', EHBS({
    extname: '.hbs',
    defaultLayout: null
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));


app.get('/', (req, res) => {
    res.render('register');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login')
});
app.get('/home', (req, res) => {
    res.render('home')
});


app.post('/register', (req,res) => {
    const obj = req.body;
    res.render('register');
    Users.push(obj);
    obj.user_id = Users.length;
    console.log(Users);
    console.log("<=--------------------------------=>")
});

app.get('/Users/:user_id', (req, res) => {
    const userID = Users.find( user => +req.params.user_id === user.user_id);
    res.json(userID);
});

app.post('/login', (req,res) => {
    const login = req.body;
    Users.forEach(checkLogin => {
        if (checkLogin.UserLogin === login.name && checkLogin.UserPassword === login.password) {
            res.redirect(`/Users/${checkLogin.user_id}`);
            console.log("Enter successfull.")
        } else {
            console.log('Enter failed.');
            res.redirect('/login');
        }
    });
});


app.listen(3000, (err) => {
    if (err) {
        return err
    }
    console.log('success');
});