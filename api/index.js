const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { db } = require('./db/db');

const server = express();
server.use(cors());
server.use(express.json());
server.use((req, res, next) => {
	// res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
server.use('/api', routes);

// const PORT = process.env.PORT || 3000;

server.listen(process.env.PORT, async () => {
	try {
		await db.sync({ force: false });
	} catch (error) {
		console.log(error);
	}

	console.log(`listening on port: ${process.env.PORT}...`);
});
