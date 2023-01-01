const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express();
const blogRoutes = require('./routes/blogRoutes')
//register view engine
app.set("view engine", "ejs");

//connect to mongol DB
const dbURI = "mongodb+srv://hieubeo22336:gh3NaxMfioBNvSJZ@cluster0.gynoyuf.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.set('strictQuery',false)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => {
    console.log("connected to database");
    app.listen(3000);
 })
 .catch((err) => {
    console.log(err)
 })

// listen for request
app.use(morgan('dev'))


//middleware static file..
//add Public file for uses like css, image, icon,...
app.use(express.static('public'))
//Take url encoded data, parse into an object, accepting form data
app.use(express.urlencoded( { extended:true } ))


//basic routes
app.get('/', (req, res) => { 
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.render('about', {title: "About"})
})
app.get('/about-us', (req, res) => {
    res.redirect("/about");
})

//blog routes
app.use('/blogs',blogRoutes);


app.use((req, res) => {
    res.status(404).render("404", {title: "404"})
})