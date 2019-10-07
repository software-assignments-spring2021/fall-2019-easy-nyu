const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    // to be filled
})

app.listen(4000) => {
	console.log('server is listening on port 4000.')
};