<template>
  <div class="full grey">
    <BaseContent
      title="内容布局示例002"
      :showBack="true"
      :tabs="tabs"
      :defaultTab="defaultTab"
    >
      <!-- <template #title>
        <h2>自定义的标题咯</h2>
      </template> -->

      <!-- 右侧的按钮 -->
      <template v-slot:tools="{ activeTab }">
        <div>
          <Button>详情</Button>
          <Button type="primary">添加</Button>
          <Button
            type="primary"
            v-if="activeTab === '操作步骤'"
            @click.stop="stepDirectionVertical = !stepDirectionVertical"
          >
            {{ stepDirectionVertical ? '横向' : '纵向' }}
          </Button>
        </div>
      </template>

      <!-- Tab区域 -->
      <template v-slot:tabContent="{ activeTab: activeTab }">
        <div>
          当前选中的Tab为：{{ activeTab }}
          <div v-if="activeTab === 'base'">你好我是基本信息</div>
          <Divider></Divider>
        </div>
      </template>

      <!-- 默认 -->
      <template #default="{ activeTab }">
        <!-- 列表页 -->
        <TableDemo
          v-if="activeTab === 'list'"
          :showTitle="false"
          :showPagination="false"
        />
        <BaseInfo
          title="基本信息"
          :data="data"
          :columns="infoColumns"
          :showBorder="activeTab === 'base'"
          :leftWidth="100"
          v-else-if="activeTab === 'info' || activeTab === 'base'"
        >
          <!-- 状态 -->
          <template v-slot:status="{ data }">
            <div class="status">
              <!-- {{ data }} -->
              <Icon
                :type="`ivu-icon ivu-icon-${
                  data.status ? 'md-checkmark check' : 'md-close close'
                }`"
              >
              </Icon>
              <Icon
                :type="`ivu-icon ivu-icon-${
                  !data.status ? 'md-checkmark check' : 'md-close close'
                }`"
              >
              </Icon>
              <Icon type="ivu-icon ivu-icon-md-close close grey"> </Icon>
            </div>
          </template>

          <!-- Logoo -->
          <template v-slot:logo="{ data }">
            <img
              :src="data.logo"
              alt="Logo"
              style="
                background: #4a90e2;
                padding: 30px 10px;
                width: 170px;
                border-radius: 8px;
              "
            />
          </template>
        </BaseInfo>

        <div v-else>
          <TopBar title="操作步骤" />
          <Steps
            :current="1"
            :direction="stepDirectionVertical ? 'vertical' : 'horizontal'"
          >
            <Step title="第一步" content="第一步信息"></Step>
            <Step title="第二步" content="第二步信息"></Step>
            <Step title="第三步" content="第三步信息"></Step>
            <Step title="第四步">
              <template #content>
                <div>自定义Step Content组件</div>
              </template>
            </Step>
          </Steps>
          <h1>Good</h1>
          <p style="height: 100px; background: #eee">wode test</p>
          <p style="height: 100px; background: #999">
            wode test {{ activeTab }}
          </p>

          <div>good this is default slot content.</div>
        </div>
      </template>
    </BaseContent>
  </div>
</template>

<script>
import BaseContent from '@/components/layout/content/base.vue'
import TableDemo from '../table/demo.vue'
import BaseInfo from '@/components/page/baseInfo'

export default {
  name: 'BaseContentDemo001',
  components: {
    BaseContent,
    TableDemo,
    BaseInfo,
  },
  data() {
    return {
      tabs: [
        { label: '基本信息', name: 'base' },
        { label: '详细信息', name: 'info' },
        { label: '列表数据', name: 'list' },
        '操作步骤',
      ],
      defaultTab: 'info',
      data: {
        username: 'codelieche',
        nick_name: '编程列车',
        url: 'www.codelieche.com',
        status: true,
        logo: 'https://www.codelieche.com/static/images/logo.svg',
      },
      infoColumns: [
        { title: '用户名', key: 'username' },
        { title: '昵称', key: 'nick_name' },
        { title: '网站', key: 'url' },
        { title: '状态', key: 'status', slot: 'status' },
        { title: 'Logo', key: 'logo', slot: 'logo' },
      ],
      stepDirectionVertical: false,
    }
  },
}
</script>