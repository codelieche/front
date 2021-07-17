import fetchApi from '@/api/fetchApi'

/**
 * 设置获取详情数据的Mixin函数
 * @param {String} detailPath: 详情数据的路径，默认是.适配的Django Rest Framework
 * @param {Number} code: 列表接口成功的状态码
 * @returns 返回一个Vue2可用的mixin
 */
const setFetchDetailDataMixin = (detailPath = '.', code = 200) => {
  return {
    /**
     * 继承了这个mixin的组件，就会具有下面的属性和方法
     */
    data() {
      return {
        apiUrl: '',
        httpError: null,
        data: {},
        detailDataPath: detailPath, // 详情数据的路径，比如：./.data
        reFreshTimes: 0, // 刷新数据，重新获取详情数据，reFreshTimes += 1就会刷新数据
        successCode: code,
        loading: false
      }
    },
    mounted: function() {
      // 请在使用setFetchhDetailDataMixin的组件中设置apiUrl
    },
    methods: {
      /**
       * 获取详情数据的方法，可以传递url和callback
       * @param {string | null} url: 获取详情数据的url
       * @param {Function | null} callback 获取完详情数据后的回调函数
       * @param {String | null} detailPath 详情数据的路径，默认是.
       * @param {Number} code 获取成功的状态码
       * @returns
       */
      fetchDetailData: function(
        url = null,
        callback = null,
        detailPath = null,
        code = null
      ) {
        // 1. 数据处理：发起请求的url，和详情数据的路径，默认是空
        //1-1：Url：调用本方法，如果传递了url就使用url, 如果没传递就用apiUr
        let apiUrl = url ? url : this.apiUrl
        // 1-2: 如果传递了detailPath: 就使用detailPath
        const detailDataPath = detailPath ? detailPath : this.detailDataPath
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
                // 3-1：如果返回的结果直接是数组，那么data就是它了
                if (Array.isArray(data)) {
                  // 一般不会出现这个情况的，详情数据一般都是object类型
                  this.data = data
                } else {
                  // 3-2: 处理详情数据：data
                  if (detailDataPath && typeof detailDataPath === 'string') {
                    let detail = data
                    detailDataPath.split('.').forEach(item => {
                      if (item && typeof detail === 'object') {
                        detail = detail[item]
                      }
                    })
                    // 判断detail是否是列表/对象
                    if (Array.isArray(detail) || typeof detail === 'object') {
                      // 3-3: 转译，一般多加一个mixin
                      if (
                        this.transferData &&
                        typeof this.transferData === 'function'
                      ) {
                        // transferData函数需要是传入detail，然后返回处理后的数据
                        detail = this.transferData(detail)
                      }
                      this.data = detail
                    }
                    // 4. 调用一下回调函数
                    if (callback && typeof callback === 'function') {
                      callback(detail)
                    }
                  } else {
                    let detail = data
                    // detailDataPath传递有误也支持一下默认的.
                    // 那么就直接使用response.data
                    if (
                      this.transferData &&
                      typeof this.transferData === 'function'
                    ) {
                      // transferData函数需要是传入detail，然后返回处理后的数据
                      detail = this.transferData(detail)
                    }
                    this.data = detail
                    if (callback && typeof callback === 'function') {
                      callback(detail)
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
      }
    },
    watch: {
      apiUrl: function(newValue) {
        // console.log('apiUrl变更了，需要输血数据:', this.apiUrl)
        if (newValue) {
          this.fetchDetailData()
        }
      },
      reFreshTimes: function() {
        this.fetchDetailData()
      }
    }
  }
}

export default setFetchDetailDataMixin
