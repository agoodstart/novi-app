const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '../node_modules/json-server/public'),
  readOnly: true
});

server.use(middlewares);

server.use(jsonServer.rewriter({
  "/api/v1/countries": "/countries",
  "/api/v1/countries/country/:alpha2": "/countries?ISO3166-1-Alpha-2=:alpha2",
  "/api/v1/countries/language/:lang": "/countries?Languages_like=:lang"
}));

server.use(router);
server.listen(8000, () => {
  console.log('JSON server is running \n');
});