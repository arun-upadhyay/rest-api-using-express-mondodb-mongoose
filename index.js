const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

app.get('/', (req, res) => res.send(`Supported endpoint = /posts, /posts/:id', methods = GET, PUT, DELETE, POST`))

app.use('/user', require('./routes/user'));
app.use('/posts', require('./routes/posts'));

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
