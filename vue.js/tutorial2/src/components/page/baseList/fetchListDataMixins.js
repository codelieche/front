import fetchApi from '@/api/fetchApi'

const fetchListDataMixins = {
  data() {
    return {
      httpError: null,
      count: 0,
      next: false,
      dataSource: [],
      successCode: 200,
      loading: false,
    }
  },
  mounted: function() {},
  methods: {
    fetchListData: function(url) {
      let apiUrl = this.apiUrl
      if (url) {
        apiUrl = url
      }
      if(!apiUrl){
          return
      }
      // 开始发起请求
      fetchApi
        .get(apiUrl)
        .then(response => {
            // console.log(response)
          if (response.status === this.successCode) {
            const data = response.data
            if (Array.isArray(data)) {
              this.dataSource = data
              this.next = null
            } else {
              if (Number.isInteger(data.count)) {
                this.count = data.count
              }
              if (Array.isArray(data.results)) {
                this.dataSource = data.results
              }
            }
          }
        })
        .catch(err => {
          this.httpError = err
        })
    //   console.log(apiUrl)
    }
  }
}

export default fetchListDataMixins
