const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const User = require('./model/user');
const { log } = require('console');
const app = express();
const Port = process.env.PORT || 4000;

// Define static paths
const static_path = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}));

// Set view engine
app.set('view engine', 'hbs');
app.set('views',templatePath);
hbs.registerPartials(partialsPath);


// Define routes
app.get('/', (req, res) => {
    res.render('index');
});


app.post('/contact' ,async (req, res) =>{
try {
        const userData = new User(req.body);
        console.log(userData);
        await userData.save();
        
        res.status(201). render('index');
        // console.log(userData);

} catch (error) {
    res.status(500).send(error)
}
})

app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
});
