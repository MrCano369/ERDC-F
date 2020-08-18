const express = require('express');
const mongoose = require('mongoose');
const app = express();
var user = null;

// bdd
mongoose.connect("mongodb+srv://MrCano369:acr3945@mrcano369-sbz3s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var esquemaUsuario = new Schema({
    nombre: String,
    correo: String,
    clave: String,
    img: String,
    coins: Number,
    exp: Number,
    active: Boolean
});
var esquemaFicha = new Schema({
    esp: String,
    ext: String,
    tipo: String,
    level: Number
});
var Usuario = mongoose.model('usuario', esquemaUsuario);


// settings
app.set('view engine', 'ejs');


// middlewares
app.use('', express.static(__dirname + '/'));
app.use(express.json());
// app.use((req, res, next) => {
//     if(user){
//         if(req.url == '/' || req.url == '/login' || req.url == '/registro') res.redirect('/inicio');
//         else next();
//     }else{
//         if(req.url == '/' || req.url == '/login' || req.url == '/registro') next();
//         else res.redirect('/');
//     }
// });
app.use((req, res, next) => {
    switch(req.url) {
        case '/':
        case '/login':
        case '/registro':
            if(user) res.redirect('/inicio');
            else next();
        break;
        default:
            if(user) next();
            else res.redirect('/login');
    }
});


// routes
app.get('/', (req, res) => res.render('login', { user }));
app.get('/registro', (req, res) => res.render('registro', { user }));
app.get('/inicio', (req, res) => res.render('inicio', { user }));
app.get('/agregarFicha', (req, res) => res.render('agregarFicha', { user }));
app.get('/buscarFicha', (req, res) => res.render('buscarFicha', { user }));
app.get('/salir', (req, res) => {
    user = null;
    res.redirect('/');
});


// res
app.post('/login', async (req, res) => {
    var loginUser = await Usuario.findOne({ nombre: req.body.nombre });
    if(loginUser){
        if(loginUser.clave == req.body.clave){
            user = loginUser;
            res.send('ok');
        }else res.send('2');
    }else res.send('1');
});

app.post('/registro', async (req, res) => {
    if(await Usuario.findOne({ nombre: req.body.nombre })) res.send('1');
    else if(await Usuario.findOne({ correo: req.body.correo })) res.send('2');
    else{
        req.body.img = '../public/img/persona.png';
        req.body.coins = 50;
        req.body.exp = 0;
        req.body.active = false;
        user = await new Usuario(req.body).save();
        res.send('ok');
    }
});


app.listen(process.env.PORT || 3000, () => console.log('Server funcionando'));
