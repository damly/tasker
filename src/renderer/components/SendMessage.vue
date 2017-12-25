<style scoped>
    .send-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
        padding: 10px;
    }
</style>
<template>
    <div class="send-layout">

        <div>
            <Input style="margin-top: 10px" type="textarea" :rows="4" v-model="formHello.hello" placeholder="请输入需要发送的内容">
            <Icon type="person" slot="prepend"></Icon>
            </Input>
        </div>

        <Table style="margin-top: 5px" height="250" border :columns="logColumns" :data="logData"
               no-data-text=""></Table>
        <Row type="flex" style="margin-top: 10px">
            <Col span="20">
            <RadioGroup v-model="checkGroup">
                <Radio label="friend">发送给好友</Radio>
                <Radio label="group">发送给群组</Radio>
                <Radio label="all">发送给所有</Radio>
            </RadioGroup>
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
</template>
<script>
  import { startWorking, stopWorking, onEvent } from './Event'

  export default {
    data () {
      return {
        checkGroup: 'friend',
        disableStart: false,
        disableStop: false,
        formHello: {
          hello: ''
        },
        logColumns: [
          {
            title: '日志',
            key: 'log'
          }
        ],
        logData: []
      }
    },
    created () {
    },
    mounted () {
      let that = this
      onEvent((data) => {
        console.log('event:', data)
        if (data.state && data.page === 'SendMessage') {
          that.disableStart = true
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
      handleChaged () {
        alert('ok')
      },
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
      handleStart () {
        startWorking('SendMessage')
      },
      handleStop () {
        stopWorking('SendMessage')
      }
    }
  }
</script>