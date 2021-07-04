<template>
  <div>
    <TopBar title="BaseTable示例" v-if="showTitle" />
    <BaseTable
      apiUrlPrefix="/api/v1/docs/article/list"
      :pageUrlPrefix="$router.currentRoute.path"
      :reFreshTimes="reFreshTimes"
      :showTools="true"
      :columns="columns"
      :props="tableProps"
      :onSelectionChange="onSelectionChange"
      :showPagination="showPaginationValue"
    >
      <template v-slot:cover="data">
        <div v-if="data.row.cover">
          <img
            :src="data.row.cover"
            :style="{ height: '30px', width: 'auto' }"
          />
        </div>
        <div v-else></div>
      </template>

      <!-- 右上角按钮 -->
      <template v-slot:rightButtons>
        <Col span="12" class-name="right">
          <Button @click="reFreshTimes++" size="default">
            <Icon type="ivu-icon ivu-icon-ios-refresh">刷新</Icon>
          </Button>

          <Button
            @click="showPaginationValue = !showPaginationValue"
            type="primary"
            :icon="`${showPaginationValue ? 'md-eye' : 'md-eye-off'}`"
          >
            {{ showPaginationValue ? '隐藏分页' : '显示分页' }}
          </Button>
        </Col>
      </template>
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '@/components/page/baseTable'

export default {
  name: 'TableDemo',
  components: {
    BaseTable,
  },
  props: {
    showTitle: {
      type: Boolean,
      default: () => true,
    },
    showPagination: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    const tableProps = {
      border: false,
    }
    return {
      reFreshTimes: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: 'ID',
          key: 'id',
          width: 80,
          align: 'center',
          sortable: 'custom',
        },
        {
          title: '标题',
          key: 'title',
          width: 200,
          align: 'left',
          sortable: 'custom',
        },
        { title: '用户', key: 'user', width: 150, align: 'center' },
        {
          title: '添加时间',
          key: 'time_added',
          width: 180,
          align: 'center',
          sortable: 'custom',
        },
        {
          title: '更新时间',
          key: 'time_updated',
          width: 180,
          align: 'center',
          sortable: 'custom',
        },
        {
          title: '状态',
          key: 'is_active',
          width: 100,
          align: 'center',
          sortable: 'custom',
          render: (h, params) => {
            return h('div', { class: 'status' }, [
              h('i', {
                class: `ivu-icon ivu-icon-${
                  params.row.is_active ? 'md-checkmark check' : 'md-close close'
                }`,
              }),
            ])
          },
        },
        {
          title: '海报图',
          key: 'cover',
          slot: 'cover',
          align: 'center',
          //   width: '160'
          // render: (h, params) => {
          //   return h('span', params.row.is_superuser)
          // },
        },
        {
          title: '描述',
          key: 'description',
          align: 'left',
          render: (h, params) => {
            return h('div', { class: 'max-lines-3' }, params.row.description)
          },
        },
      ],
      showPaginationValue: false, // 显示分页
      tableProps,
    }
  },
  methods: {
    onSelectionChange(rows) {
      console.log('我选择了:', rows)
    },
  },
  watch: {
    showPagination: {
      handler: function (newV) {
        this.showPaginationValue = newV
      },
      immediate: true,
    },
  },
}
</script>