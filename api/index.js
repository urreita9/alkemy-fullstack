const express = require('express');
const routes = require('./routes');
const { db } = require('./db/db');

const server = express();
server.use(express.json());
server.use('/api', routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
	try {
		await db.sync({ force: false });
	} catch (error) {
		console.log(error);
	}

	console.log(`listening on port: ${PORT}...`);
});
