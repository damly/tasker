<template>
    <div id="app">
        <Title></Title>
        <router-view></router-view>
    </div>
</template>

<script>
  import Title from './components/Title.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'electron-vue-setup',
    components: {
      Title,
      Footer
    },
    mounted () {
    }
  }
</script>

<style>
    html, body {
        background: #2B2B2B;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }

    #app {
        background: #2B2B2B;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
</style>
