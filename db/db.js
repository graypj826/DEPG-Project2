<<<<<<< HEAD
const mongoose
=======
const mongoose = require('mongoose');

// create our db and connect
mongoose.connect('mongodb://localhost/project2');

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'mongoose error');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected');
});
>>>>>>> f88d48276e5be27ed52a4319ebb8a62bb462d939