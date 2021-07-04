<template>
  <div class="full">
    <TopBar title="表单基本使用002" />
    <BaseTable
      apiUrlPrefix="/api/v1/account/user/"
      pageUrlPrefix="/base/table/002"
      :reFreshTimes="reFreshTimes"
      :showTools="true"
      :columns="columns"
      :props="tableProps"
      :onSelectionChange="onSelectionChange"
    >
      <template v-slot:is_superuser="data">
        <!-- <ISwitch :value="data.row.is_superuser"></ISwitch> -->
        <!-- <Checkbox :value="data.row.is_superuser">管理员</Checkbox> -->
        <Button
          :type="data.row.is_superuser ? 'primary' : 'default'"
          size="small"
        >
          {{ data.row.is_superuser ? '管理人员' : '普通用户' }}
        </Button>
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
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '@/components/page/baseTable/'

export default {
  name: 'Table001',
  components: {
    BaseTable,
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
        { title: 'ID', key: 'id', width: 180, align: 'center', sortable: true },
        {
          title: 'Username',
          key: 'username',
          width: 150,
          align: 'center',
          sortable: 'custom',
        },
        { title: '昵称', key: 'nick_name', width: 150, align: 'center' },
        {
          title: '电话',
          key: 'phone',
          width: 160,
          align: 'center',
          sortable: 'custom',
        },
        { title: '邮箱', key: 'email', width: 160, align: 'center' },
        { title: '城市', key: 'city', width: 160, align: 'center' },
        {
          title: '状态',
          key: 'is_active',
          width: 80,
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
          title: '管理员',
          key: 'is_superuser',
          slot: 'is_superuser',
          align: 'center',
          // width: '160'
          // render: (h, params) => {
          //   return h('span', params.row.is_superuser)
          // },
        },
      ],
      tableProps,
    }
  },
  methods: {
    onSelectionChange(rows) {
      console.log('我选择了:', rows)
    },
  },
}
</script>