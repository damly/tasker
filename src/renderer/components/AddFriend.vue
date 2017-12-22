<style scoped>
    .add-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
    }

    .add-layout-left {
        height: 100%;
    }

    .add-layout-right {
        height: 100%;
        padding: 10px;
    }
</style>
<template>
    <div class="add-layout">
        <Row type="flex">
            <Col span="6" class="add-layout-left">
            <Card>
                <Table height="300" border :columns="helloColumns" :data="helloData"></Table>
                <div>
                    <Input style="margin-top: 10px" type="textarea" v-model="formHello.hello" placeholder="请输入验证内容">
                    <Icon type="person" slot="prepend"></Icon>
                    </Input>
                    <Button style="margin-top: 10px" type="primary" size="small" @click="handleAddSubmit()">
                        添加验证内容
                    </Button>
                </div>
            </Card>
            </Col>
            <Col span="18" class="add-layout-right">
            <Card>
                <Button type="primary" size="small" @click="handleAddSubmit()">
                    从 execl 导入账号
                </Button>
                <Row type="flex">
                    <Col span="6">
                        <Table style="margin-top: 5px" height="300" border :columns="friendColumns" :data="friendData"></Table>
                    </Col>
                    <Col span="18">
                        <Table style="margin-top: 5px" height="300" border :columns="logColumns" :data="logData"></Table>
                    </Col>
                </Row>
                <div style="padding: 10px">
                    <Button type="primary" size="small" @click="handleAddSubmit()">
                        操作1
                    </Button>
                    <Button type="primary" size="small" @click="handleAddSubmit()">
                        操作2
                    </Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        formHello: {
          hello: ''
        },
        ruleInline: {
          account: [
            {required: true, message: '请输入账号.', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码.', trigger: 'blur'}
          ]
        },
        friendColumns: [
          {
            title: '账号',
            key: 'account'
          }
        ],
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
                      this.handleRemoveAccount(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        logColumns: [
          {
            title: '日志',
            key: 'log'
          }
        ],
        logData: [],
        friendData: [],
        helloData: []
      }
    },
    created () {
    },
    methods: {
      handleRemoveAccount (index) {
        this.helloData.splice(index, 1)
      },
      handleAddSubmit (name) {
        let that = this
        if (that.formHello.hello) {
          let item = {
            hello: that.formHello.hello
          }
          that.helloData.push(item)
          that.formHello.hello = ''
        }
      }
    }
  }
</script>