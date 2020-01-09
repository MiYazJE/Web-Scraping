const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'src/public')))

require('./app/routes/routes.js')(app)

mongoose.connect('mongodb://localhost:27017/juegos', { useNewUrlParser: true })
    .then(() => console.log('mongodb stated...'))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening in PORT ${port}...`));