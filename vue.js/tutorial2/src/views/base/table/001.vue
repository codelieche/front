<template>
  <div class="full">
    <TopBar title="表单基本使用001" />
    <BaseList
      apiUrlPrefix="/api/v1/account/user/"
      pageUrlPrefix="/base/table/001"
      :reFreshTimes="reFreshTimes"
      :urlParams="params"
      :showTools="true"
    >
      <template v-slot:default="data">
        <Table
          :columns="columns"
          :data="data.dataSource"
          @on-sort-change="onSortChange"
        >
          <template slot-scope="{ row }" slot="is_superuser">
            <!-- <ISwitch :value="row.is_superuser"></ISwitch> -->
            <div class="status">
              <i
                :class="`ivu-icon ivu-icon-${
                  row.is_active ? 'md-checkmark check' : 'md-close close grey'
                }`"
              ></i>
            </div>
          </template>
        </Table>
        <!-- <Divider></Divider> -->
      </template>

      <!-- 右上角按钮 -->
      <template v-slot:rightButtons>
        <Col span="12" class-name="right">
          <Button @click="reFreshTimes++" size="default">
            <Icon type="ivu-icon ivu-icon-ios-refresh">刷新</Icon>
          </Button>

          <Button @click="reFreshTimes++" type="primary">
            <Icon type="ivu-icon ivu-icon-md-add">添加</Icon>
          </Button>
        </Col>
      </template>
    </BaseList>
    <Switch size="large" />
  </div>
</template>

<script>
import BaseList from '@/components/page/baseList/index.vue'

export default {
  name: 'Table001',
  components: {
    BaseList,
  },
  data() {
    return {
      reFreshTimes: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        { title: 'ID', key: 'id', sortable: true },
        {
          title: 'Username',
          key: 'username',
          sortable: 'custom',
          desc: 'desc',
        },
        { title: '昵称', key: 'nick_name' },
        { title: '电话', key: 'phone' },
        { title: '邮箱', key: 'email' },
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
                  params.row.is_active
                    ? 'md-checkmark check'
                    : 'md-close close'
                }`,
              }),
            ])
          },
        },
        {
          title: '管理员',
          key: 'is_superuser',
          slot: 'is_superuser',
          //   render: (h, params) => {
          //     return h('span', params.row.is_superuser)
          //   },
          align: 'center',
          filterMultiple: false,
          filters: [
            { label: '管理人员', value: true },
            { label: '普通用户', value: false },
          ],
          filterMethod: function (value, row) {
            // console.log('value:', value, "row[this.key] == value:", row[this.key] == value)
            // console.log('row:', row)
            // console.log(this)
            return row[this.key] == value
          },
        },
      ],
      params: {},
    }
  },
  methods: {
    onSortChange: function ({ column, key, order }) {
      console.log(column, key, order)
      let ordering = order === 'desc' ? `-${key}` : `${key}`
      if (order === 'normal') {
        ordering = ''
      }
      //   console.log('new ordering:', ordering)

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
      this.params['ordering'] = ordering != null ? ordering : ''
    },
  },
}
</script>