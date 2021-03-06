const url = require('url');
const http = require('http');
const path = require('path');

const postRequest = require('./postRequest');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  if (checkIfNestedFolder(pathname)) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      postRequest(filepath, req, res);
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

const checkIfNestedFolder = (pathname) => pathname.indexOf('/') !== -1;

module.exports = server;
