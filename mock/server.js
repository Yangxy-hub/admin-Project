// node框架 express 快速开启一个服务器
const express = require('express')
const Mock = require('mockjs')
const {
    readAsArrayBuffer
} = require('qiniu-js/esm/utils')
// 得到一个APP对象
const app = express()

// mockjs 中随机类
const Random = Mock.Random

// 随机中文
Random.ctitle()

//解决跨行
// use是express中的一个中间件
app.use((req, res, next) => {
    // 设置响应头
    res.set('Access-Contror-Allow-Origin', '*')
    res.set('Access-Control_Allow-Headers', 'content-type, token')
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')

    // 调用下一个中间件
    next()
})

// 模拟请求
app.get('/admin/edu/subject/:page/:limit', (req, res) => {
    // 获取params 参数
    const {
        page,
        limit
    } = req.params

    // 模拟数据  利用mock模拟数据
    const data = Mock.mock({
        // Random.integer(min, max) 返回Min到max 的随机数
        tatal: Random.initeger(limit, limit * 2),
        // 数组长度是limit 
        // item|num 表示item字段指向的数组长度
        [`items|${limit}`]: [{
            // _id初始值为1， +1 表示会递增
            '_id|+1': 1,
            // @ctitle 会使用Random.ctitle 生成的随机标题， 长度 2 - 5
            title: '@ctitle(2,5)',
            parentId: 0
        }]
    })
    // 将data转成json字符串， 并返回
    res.json({
        code: 20000,
        success: true,
        data,
        message: '' // 响应信息
    })
})

app.listen(5000, err => {
    if(err) {
        console.log('服务器启动失败', err)
        return 
    }
    console.log('服务器启动成功~ localhost: 5000')
})