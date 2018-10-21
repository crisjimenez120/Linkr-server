const express = require('express');
const PORT = process.env.PORT || 8000;


const app = express();

app.listen(3001, () => {
	console.log('Listening on port 3001')
});