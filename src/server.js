const http = require('http')
const path = require('path')

const nodeStatic = require('node-static')

const file = new nodeStatic.Server(path.resolve(__dirname, '../dist'))

const server = http.createServer((req, res) => {
  file.serve(req, res)
})

server.listen(8081, () => {
  console.log('Listening on port 8081')
})