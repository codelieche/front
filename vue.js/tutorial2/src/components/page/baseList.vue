<template>
  <div>
    <Row class="tools" v-if="showTools">
      <Col span="12">
        <Input
          class="search primary"
          v-model="searchInputValue"
          placeholder="search"
          size="default"
          :clearable="true"
          :search="true"
          @on-search="handleSearchChange"
        />
      </Col>
    </Row>
    <slot name="default" :dataSource="dataSource"></slot>
    <Page
      :total="count"
      :current="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      :show-total="true"
      :show-sizer="true"
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    >
    </Page>

    {{ apiUrl }}
    <hr />
    {{ pageInfo }}
    <hr>
  </div>
</template>

<script>
import { getParamsFromLocationSearch } from '@/utils/urlParam.js'
import fetchListDataMixins from '@/components/page/fetchListDataMixins'

export default {
  name: 'BaseList',
  mixins: [fetchListDataMixins],
  props: {
    apiUrlPrefix: String, // 获取数据的接口：/api/v1/account/group/list
    // apiUrlSuffix: String,  // 获取数据的接口追加的内容，比如： type=default
    pageUrlPrefix: String, // 页面的前缀：eg：/user/group/list
    page: {
      type: Number,
      default: () => 1,
    }, // 数据页
    pageSize: {
      type: Number,
      default: () => 10,
    }, // 数据页
    paramsFields: {
      type: Array,
      default: () => ['page', 'page_size', 'ordering', 'search'],
    },
    reFreshTimes: {
      type: Number,
      default: () => 0,
    },
    showHeader: {
      type: Boolean,
      default: () => true,
    },
    showTools: {
      type: Boolean,
      default: () => true,
    },
    showPagination: {
      type: Boolean,
      default: () => true,
    },
    // 当调用BaseList的上级组件，想要修改params的时候，就传递这个
    urlParams: Object,
    rowKey: String,
    props: Object,
  },
  data() {
    let pageInfo = {
      pageSize: this.pageSize,
      currentPage: this.page,
    }
    const params = {}
    return {
      pageInfo,
      // dataSource: ['111', '2222', '333'],
      searchInputValue: '', // 搜索框输入的内容
      searchValue: '', // 搜索值
      apiUrl: '', // 发起请求的Url
      params: params,
      redirectUrl: '',
    }
  },
  mounted() {
    // const apiUrl = this.getApiUrl()
    // console.log(apiUrl)
    this.apiUrl = this.getApiUrl()

    this.fetchListData()
  },
  methods: {
    getApiUrl: function () {
      // console.log(window.location.search)
      let locationSearch = window.location.search
      if (window.location.href.indexOf('/#/') > 0) {
        locationSearch = this.$router.currentRoute.value.fullPath
          .toString()
          .replace(this.router.currentRoute.value.path, '')
      }
      // console.log(this.router.currentRoute.value.fullPath.toString().replace(router.currentRoute.value.path, ''))
      this.params = getParamsFromLocationSearch(
        this.paramsFields,
        locationSearch
      )
      // 设置搜索框的值
      if (
        this.params['search'] &&
        this.params['search'] !== this.searchInputValue
      ) {
        this.searchInputValue = this.params['search']
      }
      // console.log('params:', this.params)
      // console.log(params['page'] && isNaN(Number(params['page'])) === false)
      if (this.params['page'] && isNaN(Number(this.params['page'])) === false) {
        const page = Number(this.params['page'])
        this.pageInfo.currentPage = page
        // if (this.pageInfo.currentPage !== page) {
        //   this.onPageChange(page)
        //   // return
        // }
      } else {
        this.pageInfo.currentPage = this.page
      }
      // console.log('pageInfo:', pageInfo)

      // 有个bug：pageSize、pageCount都不可以用变量设置，刷新页面变成默认的值了, 用reactive是可以的
      if (
        this.params['page_size'] &&
        isNaN(Number(this.params['page_size'])) === false
      ) {
        // console.log('从url中获取到了page_size', Number(params['page_size']), pageInfo.pageSize)
        // this.pageInfo.pageSize = Number(this.params['page_size'])
        const pageSize = Number(this.params['page_size'])
        this.pageInfo.pageSize = pageSize
        // if (this.pageInfo.pageSize !== pageSize) {
        //   return this.onPageSizeChange()
        // }
      } else {
        this.pageInfo.pageSize = this.pageSize
      }

      // 从url中获取相关字段的信息
      if (!this.apiUrlPrefix) {
        return ''
      }
      let apiUrl = `${this.apiUrlPrefix}`
      if (this.apiUrlPrefix.indexOf('?') > 0) {
        apiUrl = `${apiUrl}&page=${this.pageInfo.currentPage}&page_size=${this.pageInfo.pageSize}`
      } else {
        apiUrl = `${apiUrl}?page=${this.pageInfo.currentPage}&page_size=${this.pageInfo.pageSize}`
      }

      // 从url中处理字段
      this.paramsFields.forEach((item) => {
        const value = this.params[item]
        if (
          value !== null &&
          value !== undefined &&
          ['page', 'page_size'].indexOf(item) < 0
        ) {
          apiUrl = `${apiUrl}&${item}=${value}`
        }
      })

      // 尾部内容
      // if(this.apiUrlSuffix){
      //   apiUrl = `${apiUrl}&${this.apiUrlSuffix}`
      // }

      return apiUrl
    },

    handleSearchChange: function (value) {
      // console.log('search变更', value)
      // 修改searchValue的值
      if (this.searchValue !== value) {
        this.searchValue = value
        this.params['page'] = 1
        this.params['search'] = value
        for (const key in this.params) {
          if (this.params[key] === undefined) {
            delete this.params[key]
          }
        }
        // 跳转新的页面
        // this.$router.push({
        //   path: this.$router.currentRoute.path,
        //   query: this.params,
        // })
        this.changePageUrl()
      }
    },

    // 页码变更
    onPageChange: function (page) {
      // console.log('pageChange:', page)
      if (page === this.pageInfo.currentPage) {
        return
      }
      if ((page - 1) * this.pageInfo.pageSize > this.count) {
        return
      } else {
        this.pageInfo.currentPage = page
      }
      this.changePageUrl()
      // console.log(page)
    },
    // 每页大小变更
    onPageSizeChange: function (pageSize) {
      // console.log('onPageSizeChange', pageSize, this.pageInfo)
      if (pageSize > this.pageInfo.pageSize && pageSize * this.pageInfo.currentPage > this.count) {
        // this.pageInfo.currentPage = 1
        this.pageInfo.pageSize = pageSize
        this.onPageChange(1)
      } else {
        this.pageInfo.pageSize = pageSize
      }
      this.changePageUrl()
    },

    changePageUrl: function () {
      // console.log('changePageUrl')
      // 更新页面url
      let pageUrl = `${this.pageUrlPrefix}?page=${this.pageInfo.currentPage}`
      pageUrl = `${pageUrl}&page_size=${this.pageInfo.pageSize}`
      // console.log('pageUrl:', pageUrl)

      // 从url中处理字段
      this.paramsFields.forEach((item) => {
        const value = this.params[item]
        if (
          value !== null &&
          value !== undefined &&
          ['page', 'page_size'].indexOf(item) < 0
        ) {
          pageUrl = `${pageUrl}&${item}=${value}`
        }
      })

      // console.log('pageUrl:', pageUrl, this.pageInfo)
      if (pageUrl === this.redirectUrl) {
        return
      } else {
        this.redirectUrl = pageUrl
      }
      this.$router.push(pageUrl).then(() => {
        // console.log("我跳转完毕了")
        // 跳转完毕后重新获取url
        this.apiUrl = this.getApiUrl()
        this.fetchListData()
      })
    },
  },
  watch: {
    searchInputValue: function () {
      // console.log(this.searchInputValue, 'watch')
      if (this.searchValue !== '' && this.searchInputValue === '') {
        this.handleSearchChange('')
      }
    },
    reFreshTimes: function(){
      this.fetchListData()
    },
    '$router': function(){
      console.log('currentRoute:', this.currentRoute)
    }
  },
}
</script>