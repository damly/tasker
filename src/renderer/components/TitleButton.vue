<template>
    <Button type="text"
            size="small"
            v-bind:icon="icon"
            @click="click">
    </Button>
</template>

<script>
  const {ipcRenderer: ipc} = require('electron')
  const icon = {
    min: 'android-remove',
    close: 'android-close'
  }
  export default {
    name: 'TitleButton',
    props: ['type'],
    computed: {
      icon: function () {
        return icon[this.type]
      }
    },
    methods: {
      click: function () {
        ipc.send(this.type)
      }
    }
  }
</script>

<style>
</style>
