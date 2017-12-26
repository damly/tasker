<style scoped>
    .setting-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
    }

    .setting-layout-left {
        height: 100%;
        padding-left: 5px;
        padding-right: 5px;
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
                <Button style="margin-top: 5px;margin-bottom: 5px" size="small"  @click="handleShowAddAccountModal()">添加账号</Button>
                <Table height="320" border :columns="columns"
                       :data="settings.accounts"
                       no-data-text="您还未添加微信账号"
                />
                <div style="margin-top: 5px;margin-bottom: 5px"> 账号登录间隔时间:
                    <InputNumber :max="3600" :min="1"
                                 v-model="settings.loginTimer"
                                 @on-change="handleLoginTimerChange">
                    </InputNumber> 秒
                </div>
            </Col>
            <Col span="17" class="setting-layout-right">
            <div>
                <Button style="margin-bottom: 5px" size="small" @click="handleShowAddHelloModal()">
                    添加验证内容
                </Button>
                <Table height="200" border :columns="helloColumns"
                       :data="settings.hellos"
                       no-data-text="暂无验证内容"/>
                <Checkbox v-model="settings.randomHello"
                          @on-change="handleRandomHelloChange"
                          style="margin-top: 5px;margin-bottom: 5px"
                >随机发送验证内容
                </Checkbox>
                <div style="margin-top: 5px;margin-bottom: 5px"> 操作间隔时间:
                    <InputNumber :max="3600" :min="1"
                                 v-model="settings.optTimer"
                                 @on-change="handleOptTimerChange">
                    </InputNumber> 秒
                </div>

            </div>
            </Col>
        </Row>
        <Modal v-model="addAccountModal"
               title="添加微信账号"
               ok-text="确定"
               cancel-text="取消"
               @on-ok="handleAddAccountSubmit">
            <Form ref="formAccount" :model="formAccount" :label-width="120" :rules="ruleInline" inline>
                <FormItem prop="account" label="登录账号">
                    <Input type="text" v-model="formAccount.account"/>
                </FormItem>
                <FormItem prop="password" label="登录密码">
                    <Input type="password" v-model="formAccount.password"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="addHelloModal"
               title="微信添加好友时验证内容"
               ok-text="确定"
               cancel-text="取消"
               @on-ok="handleAddHelloSubmit">
            <Input style="margin-top: 10px" type="textarea" v-model="formHello.hello" placeholder="请输入验证内容"/>
        </Modal>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        addAccountModal: false,
        formAccount: {
          account: '',
          password: ''
        },
        ruleInline: {
          hello: [
            {required: true, message: '请输入验证内容.', trigger: 'blur'}
          ],
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
        addHelloModal: false,
        formHello: {
          hello: ''
        },
        helloColumns: [
          {
            title: '验证内容',
            key: 'hello'
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
                      this.handleRemoveHello(params.index)
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
          accounts: [],
          hellos: [],
          randomHello: false
        }
      }
    },
    mounted () {
      let that = this
      this.$store.dispatch('GetSettings').then(res => {
        console.log('GetSettings', res)
        that.settings = JSON.parse(res)
      })
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
      handleShowAddAccountModal () {
        this.addAccountModal = true
      },
      handleAddAccountSubmit () {
        if (!this.formAccount.password || !this.formAccount.account) {
          return
        }
        let item = {
          account: this.formAccount.account,
          password: this.formAccount.password
        }
        this.settings.accounts.push(item)
        this.save()
        this.formAccount.account = ''
        this.formAccount.password = ''
      },
      handleRandomHelloChange () {
        this.save()
      },
      handleShowAddHelloModal () {
        this.addHelloModal = true
      },
      handleAddHelloSubmit () {
        if (!this.formHello.hello) {
          return
        }
        let item = {
          hello: this.formHello.hello
        }
        this.settings.hellos.push(item)
        this.save()
      },
      handleRemoveHello (index) {
        this.settings.hellos.splice(index, 1)
        this.save()
      }
    }
  }
</script>