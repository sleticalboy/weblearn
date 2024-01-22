const fs = require('fs')
const path = require('path')
const { callbackify } = require('util')

var src = '../hello.js'
var dst = '../.tests/hello.js.txt'

var buf = fs.readFileSync(src)
console.log(String(buf))

var i = 0
while (i < 10) {
  fs.writeFileSync(dst, buf, { flag: 'a' })
  i++
}

console.log(fs.statSync(dst).size)
console.log(process.argv)

console.log('start copy big')
// 大文件拷贝
fs.createReadStream(dst, {
  flags: 'r',
  encoding: null,
  autoClose: true
})
  .pipe(fs.createWriteStream(dst + '.txt'))
console.log('finish copy big')

console.log('exit....')

var rs = fs.createReadStream(dst);
var i = 0
// 逐帧读取数据
rs.on('data', (chunk) => {
  // console.log(chunk.toString().length)
  i++
})
// 读取数据
rs.on('end', () => {
  console.log('read end, chunk length: ' + i)
})

var buf = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(buf[0])
console.log(buf.toString())

console.log(path.join('/tmp', 'hello.js'))
console.log(path.extname('hello.js'))

function travelDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pname = path.join(dir, file)
    if (fs.statSync(pname).isDirectory()) {
      travelDir(pname, callback)
    } else {
      callback(pname)
    }
  })
}

travelDir('/home/binlee/code/web/', (p) => {
  console.log('->', p)
})