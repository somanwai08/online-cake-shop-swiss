// 引入http ,path和 fs 模塊
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

// 创建一个 web 服务器实例,並調用listen方法監聽是否創立成功

const server = http
  .createServer((req, res) => {
    // 請求資源的路徑如下
    const fullPath = path.join(__dirname, 'JSON', req.url)
    console.log(fullPath)

    // 根據路徑讀取文件
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        return console.log('讀取文件失敗')
      }
      // 設置content-type
      res.setHeader('Content-Type', mime.getType('json'))
      // 配置CORS进行跨域
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(data)
    })
  })
  .listen(8000, () => {
    console.log('Server is running')
  })
