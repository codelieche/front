import fetchApi from '@/api/fetchApi'

/**
 * 设置获取列表数据的Mixin函数
 * @param {String} listPath: 列表数据的路径，默认是.result，适配的Django Rest Framework
 * @param {String} countPath：当前列表接口总共的数据条数
 * @param {Number} code: 列表接口成功的状态码
 * @returns 返回一个Vue2可用的mixin
 */
const setFetchListDataMixin = (
  listPath = '.results',
  countPath = '.count',
  code = 200
) => {
  return {
    /**
     * 继承了这个mixin的组件，就会具有下面的属性和方法
     */
    data() {
      return {
        httpError: null,
        count: 0,
        next: false,
        dataSource: [],
        dataListPath: listPath, // 列表数据的路径，比如：.results
        countValuePath: countPath, // 当前api接口总共数据条数，比如: .count
        successCode: code,
        loading: false
      }
    },
    mounted: function() {},
    methods: {
      /**
       * 获取列表数据的方法，可以传递url和callback
       * @param {string | null} url: 获取列表数据的url
       * @param {Function | null} callback 获取完列表数据后的回调函数
       * @param {String | null} listPath 列表数据的路径，默认是.results
       * @param {String | null} countPath 结果集条数的路径，默认是：.count
       * @param {Number} code 获取成功的状态码
       * @returns
       */
      fetchListData: function(
        url = null,
        callback = null,
        listPath = null,
        countPath = null,
        code = null
      ) {
        // 1. 数据处理：发起请求的url，和列表数据的路径，默认是空
        //1-1：Url：调用本方法，如果传递了url就使用url, 如果没传递就用apiUr
        let apiUrl = url ? url : this.apiUrl
        // 1-2: 如果传递了dataListPath: 就使用dataListPath
        const dataListPath = listPath ? listPath : this.dataListPath
        const countValuePath = countPath ? countPath : this.countValuePath
        const successCode = code ? code : this.successCode
        // this中的配置比函数传参的长一点是为了命名避免冲突

        if (!apiUrl) {
          // 如果apiUrl为空，直接返回
          return
        }

        // 2. 开始发起请求
        // 2-1： 先把loading设置为true
        this.loading = true
        fetchApi
          .get(apiUrl)
          .then(response => {
            // console.log(response)
            // 状态码是必须设置的
            if (typeof successCode === 'number' && successCode >= 100) {
              // 判断状态码是否匹配
              if (response.status === successCode) {
                // 3. 开始处理响应数据
                const data = response.data
                // 3-1：如果返回的结果直接是数组，那么dataSource就是它了
                if (Array.isArray(data)) {
                  this.dataSource = data
                  this.next = null
                } else {
                  // 3-2：获取Count和dataSource的值
                  if (typeof data === 'object') {
                    // 处理count
                    if (countValuePath && typeof countValuePath === 'string') {
                      let count = data
                      countValuePath.split('.').forEach(item => {
                        if (item && typeof count === 'object') {
                          count = count[item]
                        }
                      })
                      // 判断Count是否为数值
                      if (Number.isInteger(count)) {
                        this.count = count
                      }
                    } else {
                      // 兼容一下.count的情况
                      if (Number.isInteger(data.count)) {
                        this.count = data.count
                      }
                    }
                  }

                  // 3-3: 处理列表数据：dataSource
                  if (dataListPath && typeof dataListPath === 'string') {
                    let dataSource = data
                    dataListPath.split('.').forEach(item => {
                      if (item && typeof dataSource === 'object') {
                        dataSource = dataSource[item]
                      }
                    })
                    // 判断dataSource是否是列表
                    if (Array.isArray(dataSource)) {
                      this.dataSource = dataSource
                    }
                    // 4. 调用一下回调函数
                    if (callback && typeof callback === 'function') {
                      callback(dataSource)
                    }
                  } else {
                    // dataListPath传递有误也支持一下默认的.results
                    if (Array.isArray(data.results)) {
                      this.dataSource = data.results
                      // 调用一下回调函数
                      if (callback && typeof callback === 'function') {
                        callback(data.results)
                      }
                    }
                  }
                  // 处理data完毕
                }
              } else {
                console.log(
                  '获取到的数据状态码不匹配',
                  response.status,
                  successCode
                )
              }
            } else {
              console.log(
                '当前获取到的successCode不符合要求，请修改代码: ',
                successCode
              )
            }
          })
          .catch(err => {
            // 获取请求出错了，设置httpError
            this.httpError = err
          })
          .finally(() => {
            // 最后把loading设置为false
            this.loading = false
          })
        //   console.log(apiUrl)
      }
    }
  }
}

export default setFetchListDataMixin
