const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db.js');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));

const usersController = require('./controllers/auth.js');

app.use('/auth', usersController);


app.get('/', (req,res) => {
	res.render('index.ejs');
})


app.listen(3000, () => {
	console.log('proj2 is listening on 3000');
})