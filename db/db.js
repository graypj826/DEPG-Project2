
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
<<<<<<< HEAD
});

=======
});
>>>>>>> 6c946e7981ab5b52943e60d2d07b8b5a4a1860f5
