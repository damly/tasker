<style scoped>
    .add-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
    }

    .add-layout-left {
        height: 440px;
    }

    .add-layout-right {
        height: 100%;
        padding: 10px;
    }
</style>
<template>
    <div class="add-layout">
        <Row type="flex">
            <Col span="6" class="add-layout-left" style="padding-left: 5px">
            <div>
                <Table height="310" border :columns="helloColumns" :data="helloData" no-data-text="暂无验证内容"></Table>
                <div>
                    <Input style="margin-top: 10px" type="textarea" v-model="formHello.hello" placeholder="请输入验证内容">
                    <Icon type="person" slot="prepend"></Icon>
                    </Input>
                </div>
                <div>
                    <Button style="margin-top: 10px" size="small" @click="handleAddSubmit()">
                        添加验证内容
                    </Button>
                </div>
                <div>
                    <Checkbox v-model="single" style="margin-top: 5px">随机发送验证内容</Checkbox>
                </div>
            </div>
            </Col>
            <Col span="18" class="add-layout-right">
            <Tabs>
                <TabPane label="导入添加好友" :disabled="disableAddFromInput">
                    <AddFromInput></AddFromInput>
                </TabPane>
                <TabPane label="从好友群添加" :disabled="disableAddFromGroup">
                    <AddFromGroup></AddFromGroup>
                </TabPane>
            </Tabs>
            </Col>
        </Row>
    </div>
</template>
<script>
  import { onEvent } from './Event'
  import AddFromInput from './AddFromInput.vue'
  import AddFromGroup from './AddFromGroup.vue'
  export default {
    components: { AddFromInput, AddFromGroup },
    data () {
      return {
        disableAddFromInput: false,
        disableAddFromGroup: false,
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
                      this.handleRemoveText(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        helloData: []
      }
    },
    created () {
    },
    mounted () {
      let that = this
      onEvent((data) => {
        console.log('event:', data)
        if (data.state && data.page === 'AddFromGroup') {
          that.disableAddFromGroup = false
          that.disableAddFromInput = true
        } else if (data.state && data.page === 'AddFromInput') {
          that.disableAddFromInput = false
          that.disableAddFromGroup = true
        } else if (data.state) {
          that.disableAddFromInput = true
          that.disableAddFromGroup = true
        } else {
          that.disableAddFromInput = false
          that.disableAddFromGroup = false
        }
      })
    },
    methods: {
      handleRemoveText (index) {
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