<template>
  <!-- Tools下面的表格 -->
  <BaseList v-bind="propsFields" :urlParams="params">
    <template v-slot:default="data">
      <Table
        :columns="columns"
        :data="data.dataSource"
        :show-header="showHeader"
        @sort-change="handleSortChange"
        v-bind="props"
      >
        <!-- <template  slot-scope="{ row }" slot="is_superuser"> -->
        <template v-for="item in columnSlots"  slot-scope="{ row, column, index }" :slot="item" @key="item">
          <!-- <ISwitch :value="row.is_superuser" v-bind:key="item"></ISwitch> -->
          <slot :name="item" :row="row" :column="column" :index="index"></slot>
        </template>

        <!-- <template
          v-for="item in columnSlots"
          :name="item"
          slot-scope="{ row }"
          @key="item"
        >
          {{ row }}
        </template> -->
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
  },
  data: function () {
    return {
      params: {},
    }
  },
  //   mounted(){
  //       console.log(this)
  //   },
  methods: {
    handleSortChange: function (v) {
      console.log('base table handle sort change: ', v)
    },
  },
  watch: {
    urlParams: function () {
      for (const key in this.urlParams) {
        if (this.params[key] !== this.urlParams[key]) {
          this.params[key] = this.urlParams[key]
        }
      }
    },
  },
  computed: {
    propsFields: function () {
      return this.$props
    },
  },
}
</script>