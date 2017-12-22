<style scoped>
    .add-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
        padding-left: 5px;
    }
</style>
<template>
    <div class="add-layout">
        <Table style="margin-top: 5px" height="300" border :columns="logColumns" :data="logData"
               no-data-text=""></Table>
        <Row type="flex" style="margin-top: 10px">
            <Col span="20">
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
        disableStart: false,
        disableStop: false,
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
        if (data.state && data.page === 'AddFromGroup') {
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

      handleStart () {
        startWorking('AddFromGroup')
      },
      handleStop () {
        stopWorking('AddFromGroup')
      }
    }
  }
</script>