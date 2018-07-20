const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//require('./db/project2');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));

//const usersConroller = require('./controllers/users.js');

//app.use('/users', usersController);


app.get('/', (req,res) => {
	res.render('index.ejs');
})


app.listen(3000, () => {
	console.log('proj2 is listening on 3000');
})