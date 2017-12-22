<style scoped>
    .setting-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
    }

    .setting-layout-left {
        height: 100%;
    }

    .setting-layout-right {
        height: 100%;
        padding: 10px;
    }
</style>
<template>
    <div class="setting-layout">
        <Row type="flex">
            <Col span="7" class="setting-layout-left">
            <Table height="440" border :columns="columns"
                   :data="settings.accounts"
                   no-data-text="您还未添加微信账号"
            >
            </Table>
            </Col>
            <Col span="17" class="setting-layout-right">
            <Card>
                <Form ref="formInline" :model="formAccount" :rules="ruleInline" inline>
                    <FormItem prop="user">
                        <Input type="text" v-model="formAccount.account" placeholder="账号">
                        <Icon type="person" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formAccount.password" placeholder="密码">
                        <Icon type="locked" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleAddSubmit('formInline')">添加账号</Button>
                    </FormItem>
                </Form>
            </Card>
            <Card style="margin-top: 10px">
                <Form :model="settings" :label-width="120">
                    <FormItem label="账号登录间隔">
                        <InputNumber :max="3600" :min="1"
                                     v-model="settings.loginTimer"
                                     @on-change="handleLoginTimerChange">
                        </InputNumber>
                        秒
                    </FormItem>
                    <FormItem label="操作执行间隔">
                        <InputNumber :max="3600" :min="1"
                                     v-model="settings.optTimer"
                                     @on-change="handleOptTimerChange">
                        </InputNumber>
                        秒
                    </FormItem>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        formAccount: {
          account: '',
          password: ''
        },
        ruleInline: {
          account: [
            {required: true, message: '请输入账号.', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码.', trigger: 'blur'}
          ]
        },
        formItem: {
          loginTimer: 10,
          optTimer: 10
        },
        columns: [
          {
            title: '账号',
            key: 'account'
          },
          {
            title: '密码',
            key: 'password'
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleRemoveAccount(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        settings: {
          loginTimer: 10,
          optTimer: 10,
          accounts: []
        }
      }
    },
    created () {
    },
    methods: {
      save () {
        this.$store.dispatch('SaveSettings', this.settings)
      },
      handleLoginTimerChange (value) {
        this.settings.loginTimer = value
        this.save()
      },
      handleOptTimerChange (value) {
        this.settings.optTimer = value
        this.save()
      },
      handleRemoveAccount (index) {
        this.settings.accounts.splice(index, 1)
        this.save()
      },
      handleAddSubmit (name) {
        let that = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            let item = {
              account: that.formAccount.account,
              password: that.formAccount.password
            }
            that.settings.accounts.push(item)
            that.save()
          } else {
            this.$Message.error('输入不正确!')
          }
        })
      }
    }
  }
</script>