var http = require('http')

function startServer() {
  function handler(request, response) {
    console.log(request.method)
    console.log(request.headers)
    response.writeHead(200, { 'Content-Type': 'text-plain' })
    response.end('hello world\n')
  }

  http.createServer(handler).listen(8088)
}

function getBaidu() {
  http.get('http:www.baidu.com', (resp) => {
    var body = [];
    console.log(resp.statusCode)
    console.log(resp.headers)
    resp.on('data', (chunk) => {
      body.push(chunk)
    })
    resp.on('end', () => {
      body = Buffer.concat(body)
      console.log(body.toString())
    })
  })
}

function parseUrl() {
  var parser = require('url')
  var url = parser.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash')
  console.log(url)
}

function createUrl() {
  var url = new URL('http://user:pass@host.com:8080/p/a/t/h?query=string#hash')
  console.log(url)
}

console.warn(process.argv)
parseUrl()

console.info(__dirname)
console.info(__filename)
