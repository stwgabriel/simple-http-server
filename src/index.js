const http = require('http');
const { request } = require('https');
const { URL } = require('url');

const routes = require('./routes');
const bodyParser = require('./helpers/bodyParser');

const server = http.createServer((req, res) => {

	const parsedUrl = new URL(`http://localhost:3000${req.url}`)

	let { pathname } = parsedUrl;
	let id = null;

	const splitEndpoint = pathname.split('/').filter(Boolean);

	if (splitEndpoint.length > 1) {

		pathname = `/${splitEndpoint[0]}/:id`;
		id = splitEndpoint[1];
	};

	const route = routes.find((routeObj) => (

		routeObj.endpoint === pathname && routeObj.method === req.method
	))

	if (route) {

		req.query = Object.fromEntries(parsedUrl.searchParams);
		req.params = { id };
		res.send = (statusCode, body) => {

			res.writeHead(statusCode, { 'content-type': 'application/json' });
			res.end(JSON.stringify(body));
		};

		if (['POST', 'PUT', 'PATCH'].includes(req.method)) {

			bodyParser(req, () => route.handler(req, res));
		} else {

			route.handler(req, res);
		}
	} else {

		res.writeHead(404, { 'content-type': 'text/html' });
		res.end(`Cannot ${req.method} ${req.url}`);
	}
});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000/'));