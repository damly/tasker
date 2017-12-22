<style scoped>
    .add-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="add-layout">
        <div>
            <Button size="small" @click="handleShowImportModal()">
                从 execl 导入账号
            </Button>
            <Row type="flex">
                <Col span="7">
                <Table style="margin-top: 5px" height="280" border :columns="friendColumns"
                       :data="friendData" no-data-text=""></Table>
                </Col>
                <Col span="17">
                <Table style="margin-top: 5px" height="280" border :columns="logColumns" :data="logData"
                       no-data-text=""></Table>
                </Col>
            </Row>
            <Row type="flex" style="margin-top: 10px">
                <Col span="7">
                    <Button size="small" @click="handleShowAddFriendModal()">
                        添加账号
                    </Button>
                </Col>
                <Col span="13">
                </Col>
                <Col span="2">
                    <Button size="small" :disabled="disableStart" @click="handleStart()">
                        运行
                    </Button>
                </Col>
                <Col span="2">
                    <Button size="small" :disabled="disableStop" @click="handleStop()">
                        停止
                    </Button>
                </Col>
            </Row>
        </div>
        <Modal v-model="addFriendModal"
               width="360"
               title="添加"
               ok-text="确定"
               cancel-text="取消"
               @on-ok="handleAddFriendSubmit"
        >
            <Input style="margin-top: 10px" type="text" v-model="friend" placeholder="请输入账号">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
        </Modal>
        <Modal v-model="importModal"
               width="360"
               title="从excel导入"
               @on-ok="handleAddFriendSubmit"
        >
            <Upload
                    type="drag"
                    :format="['xlsx', 'xls']"
                    :before-upload="handleBeforeUpload"
                    action="/xxxx/posts/">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或者将待导入文件拖到该处.</p>
                </div>
            </Upload>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
  import { startWorking, stopWorking, onEvent } from './Event'
  var xlsx = require('node-xlsx')
  export default {
    data () {
      return {
        disableStart: false,
        disableStop: false,
        friend: '',
        addFriendModal: false,
        importModal: false,
        friendColumns: [
          {
            title: '账号',
            key: 'account'
          },
          {
            title: '操作',
            key: 'action',
            width: 70,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleRemoveFriend(params.index)
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
        friendData: []
      }
    },
    created () {
    },
    mounted () {
      let that = this
      onEvent((data) => {
        console.log('event:', data)
        if (data.state && data.page === 'AddFromInput') {
          that.disableStart = true
          that.disableStop = false
        } else if (data.state) {
          that.disableStop = true
          that.disableStart = true
        } else {
          that.disableStop = false
          that.disableStart = false
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
      },
      handleShowAddFriendModal () {
        this.addFriendModal = true
      },
      handleAddFriendSubmit () {
        this.addFriendModal = false
        this.friendData.push({account: this.friend})
        this.friend = ''
      },
      handleRemoveFriend (index) {
        this.friendData.splice(index, 1)
      },
      handleShowImportModal () {
        this.importModal = true
      },
      handleBeforeUpload (file) {
        console.log(file)
        this.importModal = false
        this.readExcel(file.path)
        return false
      },
      readExcel (path) {
        let that = this
        let list = xlsx.parse(path)
        if (list.length > 0) {
          let data = list[0].data
          data.forEach((item) => {
            if (item.length > 0) {
              that.friendData.push({account: item[0]})
            }
          })
        }
        console.log(list)
      },
      handleStart () {
        startWorking('AddFromInput')
      },
      handleStop () {
        stopWorking('AddFromInput')
      }
    }
  }
</script>