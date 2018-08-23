
const mongoose = require('mongoose');

// create our db and connect
//mongoose.connect('mongodb://localhost/project2');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/project2';

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'mongoose error');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected');

});

