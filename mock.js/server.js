// 引入express 
const express = require('express')
// 引入Mock
const Mock = require('mockjs')
// 从Mock身上拿到Random 
const Random = Mock.Random

// 返回中文标题
Random.ctitle()

// 得到一个APP对象
const app = express()

// 如果请求方式是get请求 app.get
// 第一个参数: 就是接口的路径
// 第二个参数: 回调函数. 当接收到对应的请求会触发
// 这个回调函数中接收两个参数: req,请求对象  res, 响应对象
// 通过req获取上传的参数, 通过res响应数据
// 解决跨行
// use是express中的一个中间件
app.use((req, res, next) => {
    //设置响应头
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', 'content-type,token')
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    //调用下一个中间件
    next()
  })
app.get('/admin/edu/subject/:page/:limit', (req, res) => {
    // 获取params 参数
    let {page, limit} = req.params

    // 模拟数据 利用mock 模拟数据
    const data = Mock.mock({
        total: Random.integer(+limit + 2, limit * 2),
        [ `items|${limit}`]:[
            {
                '_id|+1': 1,
                // @ctitle 会使用Random.ctitle生成随机标题,长度2-5
                title: '@ctitle(2,5)',
                parentId: 0
            }
        ]
    })

    res.json({
        code: 20000,
        success: true,
        data,           
        message: ""    // 响应信息
    })

})

app.listen(8888, (err) => {
    if(err) {
        return console.log('服务启动失败')
    }
    console.log('服务已启动, 8888端口监听中')
})