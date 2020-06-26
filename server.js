if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const html = require('html')
const fs = require('fs')


const initializePassport = require('./passport-config')
const passport = require('passport')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.use(express.static(__dirname));

var users = []

app.set('view-engine', 'ejs')


app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', checkAuthenticated, (req,res) => {
    res.redirect("pagina1.html")
})

app.get('/login', checkNotAuthenticated, (req,res) => {
    res.render('login.ejs')
    try
    {
        fs.writeFile("login_users.json", JSON.stringify(users))
    }
    catch{

    }
} )

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req,res) => {
    res.render('register.ejs')
} )

app.post('/register', checkNotAuthenticated, async (req,res) => {
    try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    
    res.redirect('/login')
    }
    catch{
    res.redirect('/register')
    }
})

app.delete('/logout', (req,res ) =>{
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next()
    }
    res.redirect('/login')

}

function checkNotAuthenticated(req, res, next)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/')
    }
    next()
}

app.listen(3000)