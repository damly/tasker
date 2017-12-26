<style scoped>
    .add-layout {
        background: #f5f7f9;
        width: 100%;
        height: 100%;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
<template>
    <div class="add-layout">
        <Tabs>
            <TabPane label="导入添加好友" :disabled="disableAddFromInput">
                <AddFromInput></AddFromInput>
            </TabPane>
            <TabPane label="从好友群添加" :disabled="disableAddFromGroup">
                <AddFromGroup></AddFromGroup>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
  import { onEvent } from './Event'
  import AddFromInput from './AddFromInput.vue'
  import AddFromGroup from './AddFromGroup.vue'

  export default {
    components: {AddFromInput, AddFromGroup},
    data () {
      return {
        disableAddFromInput: false,
        disableAddFromGroup: false
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
    }
  }
</script>