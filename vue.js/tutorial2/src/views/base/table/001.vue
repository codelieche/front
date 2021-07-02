<template>
  <div class="full padding-20">
    <TopBar title="表单基本使用001" />
    <BaseList
      apiUrlPrefix="/api/v1/account/user/list"
      pageUrlPrefix="/base/table/001"
      :reFreshTimes="reFreshTimes"
      :showTools="true"
    >
      <template v-slot:default="data">
        <Table :columns="columns" :data="data.dataSource">
          <template slot-scope="{ row }" slot="is_superuser">
            <ISwitch :value="row.is_superuser"></ISwitch>
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
        { title: 'ID', key: 'id' },
        { title: 'Username', key: 'username' },
        { title: '昵称', key: 'nick_name' },
        { title: '电话', key: 'phone' },
        { title: '邮箱', key: 'email' },
        {
          title: '管理员',
          key: 'is_superuser',
          slot: 'is_superuser',
          //   render: (h, params) => {
          //     return h('span', params.row.is_superuser)
          //   },
        },
      ],
    }
  },
}
</script>