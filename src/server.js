const http = require('http')
const path = require('path')

const static = require('node-static')

const file = new static.Server(path.resolve(__dirname, '../dist'))

const server = http.createServer((req, res) => {
  file.serve(req, res);
})

server.listen(8081, () => {
  console.log('Listening on port 8081')
})