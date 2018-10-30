const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/my-blog', { useNewUrlParser: true });
mongoose.Promise = Promise;

// app.use(morgan('dev', {
//     skip: function(req, res) { return res.statusCode < 400 }
//   }));


app.use(morgan('dev'));
    






app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});



app.use('/api/users', require('./routes/users'));
app.use("/api/blogs", require("./routes/blogs"));

module.exports = app;