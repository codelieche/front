<template>
  <!-- Tools下面的表格 -->
  <BaseList v-bind="propsFields">
    <template v-slot:default="data">
      <Table
        :columns="columns"
        :data="data.dataSource"
        :show-header="showHeader"
        @on-sort-change="handleSortChange"
        @on-selection-change="handleSelectionChange"
        v-bind="props"
      >
        <!-- <template  slot-scope="{ row }" slot="is_superuser"> -->
        <template
          v-for="item in columnSlots"
          slot-scope="{ row, column, index }"
          :slot="item"
          @key="item"
        >
          <!-- <ISwitch :value="row.is_superuser" v-bind:key="item"></ISwitch> -->
          <slot :name="item" :row="row" :column="column" :index="index"></slot>
        </template>
      </Table>
    </template>

    <!-- 右侧的按钮，传递给BaseList -->
    <template v-slot:rightButtons="data">
      <slot name="rightButtons" :dataSource="data.dataSource"></slot>
    </template>
  </BaseList>
  <!-- 表格结束 -->
</template>

<script>
import BaseList from '@/components/page/baseList/index.vue'

export default {
  name: 'BaseTable',
  components: {
    BaseList,
  },
  props: {
    apiUrlPrefix: String, // 获取数据的接口：/api/v1/account/group/list
    // apiUrlSuffix: String,  // 获取数据的接口追加的内容，比如： type=default
    pageUrlPrefix: String, // 页面的前缀：eg：/user/group/list
    columnSlots: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
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
    rowKey: {
      type: String,
      default: () => '',
    },
    props: Object,
    onSelectionChange: Function, // 当表格行被选择的时候触发
  },
  data: function () {
    return {}
  },
  //   mounted(){
  //       console.log(this)
  //   },
  methods: {
    handleSortChange(data) {
      //   console.log('base table handle sort change: ', data)
      let ordering = data.order === 'desc' ? `-${data.key}` : `${data.key}`
      if (data.order === 'normal') {
        ordering = ''
      }

      const query = this.$router.currentRoute.query
      //   console.log(this.$router.currentRoute)
      if (query['ordering'] !== ordering) {
        this.$router.push({
          path: this.$router.currentRoute.path,
          query: {
            ...query,
            ordering,
          },
        })
      }
    },
    // 选择行时触发
    handleSelectionChange(rows) {
      if (
        this.onSelectionChange &&
        typeof this.onSelectionChange === 'function'
      ) {
        this.onSelectionChange(rows)
      } else {
        console.log('handleSelectionChange:', rows)
      }
    },
  },
  watch: {
    // urlParams: function () {
    //   for (const key in this.urlParams) {
    //     if (this.params[key] !== this.urlParams[key]) {
    //       this.params[key] = this.urlParams[key]
    //     }
    //   }
    // },
  },
  computed: {
    propsFields: function () {
      const props = {}
      for (const key in this.$props) {
        if (['columnSlots', 'columns', 'onSelectionChange'].indexOf(key) < 0) {
          props[key] = this.$props[key]
        }
      }
      return props
    },
  },
}
</script>