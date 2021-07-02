// 使用Mock
const Mock = require('mockjs')
import config from '@/config'

// 初始化设置
Mock.setup({
    timeout: '200-600'  // 指定被拦截的 Ajax 请求的响应时间，单位是毫秒。
})

// Mock.mock( rurl, rtype, function( options ) )
const mockFiles = require.context('./data/', true, /\.js$/)

let mockDatabaseArray = []

mockFiles.keys().forEach(item => {
    // console.log(item)
    let datasource = mockFiles(item).default
    // 连接各种配置
    if(Array.isArray(datasource)){
        mockDatabaseArray = mockDatabaseArray.concat(datasource)
    }
})

// 开始注册Mock
mockDatabaseArray.forEach(item => {
    // console.log(typeof item)
    if(typeof item === 'object'){
        if(item['toogle'] === false) {
            return
        }
        const method = item['method']? item['method'] : '*'
        // 开始注册
        Mock.mock(new RegExp(`^${config.apiBaseUrl}${item['path']}`), method, item['data'])
    }
})
