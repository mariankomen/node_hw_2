const express = require('express');
const EHBS = require('express-handlebars');
const path = require('path');

const app = express();
const Users = [];
const Houses = [];


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
app.get('/house', (req, res) => {
    res.render('house')
});


app.post('/register', (req,res) => {
    const obj = req.body;
    res.render('register');
    Users.push(obj);
    obj.user_id = Users.length;
    console.log(Users);
    console.log("<=--------------------------------=>")
    // res.redirect('login');
});

app.get('/Users/:user_id', (req, res) => {
    const userID = Users.find( user => +req.params.user_id === user.user_id);
    res.json(userID);
});

app.post('/login', (req,res) => {
    const login = req.body;
    // for(let i =0; i<Users.length;i++){
    //     if (Users.UserLogin === login.name && Users.UserPassword === login.password) {
    //         res.redirect(`/Users/${Users.user_id}`);
    //         console.log("Enter successfull.")
    //     } else {
    //         console.log('Enter failed.');
    //         res.redirect('/login');
    //     }
    // };
    const Entering = Users.find(smth => smth.name === login.UserLogin && smth.password === login.UserPassword);
    res.redirect(`/Users/${Entering.user_id}`);
});


// app.post('/house', (req, res) => {
//     const house = req.body;
//     house.house_id = Houses.length;
//     Houses.push(house);
//     // res.redirect(`/house/${house.house_id }`);
//     console.log(Houses);
//     res.redirect('house');
// });

// app.get('/house/:house_id', (req, res) => {
//     const HouseID = Houses.find( user => +req.params.house_id === user.house_id);
//     res.json(HouseID);
// });
//
// app.post('/house', (req,res) => {
//     const logen = req.body;
//     Users.forEach(checkLogen => {
//         if (checkLogen.city === login.city && checkLogen.street === login.street) {
//             res.redirect(`/Houses/${checkLogen.HouseID}`);
//             console.log("Enter successfull.")
//         } else {
//             console.log('Enter failed.');
//             res.redirect('/house');
//         }
//     });
// });








app.listen(3000, (err) => {
    if (err) {
        return err
    }
    console.log('success');
});
