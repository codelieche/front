<template>
  <div class="full padding-20">
    <TopBar title="基础表单"> </TopBar>
    <Row>
      <Col span="12">
        <Form
          class="base-form"
          ref="demo01"
          :model="userLoginForm"
          :label-width="80"
          label-position="right"
        >
          <FormItem prop="username" label="用户名">
            <Input v-model="userLoginForm.username"> </Input>
          </FormItem>
          <FormItem prop="password" label="密    码">
            <Input v-model="userLoginForm.password" type="password" password>
            </Input>
          </FormItem>
          <!-- 登录按钮 -->
          <FormItem>
            <Button
              type="primary"
              @click="handleFormSubmit('demo01')"
              style="width: 100%"
              >登录</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <BaseForm
          :labelWidth="0"
          :data="userLoginForm"
          :fields="formFields"
          title="登录"
        >
        </BaseForm>
      </Col>
    </Row>

    <TopBar title="表单插槽"> </TopBar>
    <Row>
      <Col span="12">
        <BaseForm
          :labelWidth="0"
          :data="userLoginForm"
          :fields="formFields"
          title="登录"
        >
          <template v-slot:password>
            <div>
              <Input
                placeholder="用户密码"
                v-model="userLoginForm['password']"
                type="password"
                password
              >
                <Icon type="ivu-icon ivu-icon-md-eye" slot="prefix" />
              </Input>
              <!-- <span class="tip-text">密码长度必须是8位以上</span> -->
            </div>
          </template>
        </BaseForm>
      </Col>
      <Col span="12">
        <BaseForm
          :labelWidth="0"
          :data="userLoginForm"
          :fields="formFields"
          title="登录"
          :handleSubmit="handleSubmit"
        >
          <template v-slot:username>
            <Input
              placeholder="用户名"
              v-model="userLoginForm['username']"
              clearable
            >
              <Icon type="ivu-icon ivu-icon-ios-mail" slot="prefix" />
            </Input>
          </template>

          <template v-slot:password>
            <div>
              <Input
                placeholder="用户密码"
                v-model="userLoginForm['password']"
                type="password"
                password
              >
                <Icon type="ivu-icon ivu-icon-md-eye" slot="prefix" />
              </Input>
              <span class="tip-text">密码长度必须是8位以上</span>
            </div>
          </template>
        </BaseForm>
      </Col>
    </Row>
    <Divider></Divider>
    {{ userLoginForm }}
  </div>
</template>

<script>
import BaseForm from '@/components/page/baseForm/'
export default {
  name: 'Input001',
  components: {
    BaseForm,
  },
  data() {
    const formFields = [
      {
        name: 'username',
        type: 'input',
        label: '用户',
        rules: [{ required: true, message: '请输入用户名' }],
        props: {
          clearable: true,
          placeholder: '用户名',
        },
        // tips: {
        //   type: 'p',
        //   props: {
        //     style: {
        //       color: '#999',
        //     },
        //   },
        //   children: '请输入用户名',
        // },
      },
      {
        name: 'password',
        type: 'input',
        label: '密码',
        rules: [{ required: true, message: '请输入密码' }],
        tips: '密码长度必须是8位以上',
        props: {
          // clearable: true,
          type: 'password',
          password: true,
          placeholder: '用户密码',
        },
      },
    ]

    const userLoginForm = {
      username: '',
      password: '',
    }
    return {
      userLoginForm,
      formFields,
    }
  },
  methods: {
    handleSubmit: function (data) {
      this.$Message.success(JSON.stringify(data))
    },
    handleFormSubmit: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('userLoginForm:', this.userLoginForm)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
  },
}
</script>