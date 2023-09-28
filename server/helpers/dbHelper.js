const mongoose = require("mongoose");

const dbConnection = (app) => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
        // Listen to port
        app.listen(process.env.PORT, () => {
        console.log('Listening for requests on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });   
}


module.exports = {
  dbConnection
}