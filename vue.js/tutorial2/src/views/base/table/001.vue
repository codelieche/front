<template>
  <div class="full padding-20">
    <TopBar title="表单基本使用001" />
    <BaseList
      apiUrlPrefix="/api/v1/account/user/list"
      pageUrlPrefix="/base/table/001"
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
    </BaseList>
    <Switch size="large" />
  </div>
</template>

<script>
import BaseList from '@/components/page/baseList.vue'

export default {
  name: 'Table001',
  components: {
    BaseList,
  },
  data() {
    return {
      columns: [
        { title: 'ID', key: 'id' },
        { title: 'Username', key: 'username' },
        { title: '昵称', key: 'nick_name' },
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