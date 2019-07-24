const jsonServer = require('json-server')
const path = require('path');

const server = jsonServer.create()

const { addRouter, router, rewritedRouter } = require('./router');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '..', 'dist'),
})

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router
addRouter(server);

server.use(rewritedRouter);
server.use(router);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // if (req.url.includes('tables')) {
  //   console.log(res);
  //   res.json(res.body);
  // res.send();
  // }
  // Continue to JSON Server router
  next()
});

const port = process.env.NODE_ENV === 'development' ? 8067 : 80;

server.listen(port, () => {
  console.log(`Mock Server is running on ${port}`);
});
