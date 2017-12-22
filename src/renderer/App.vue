<template>
  <div id="app">
    <div class="app-title">
      <Title></Title>
    </div>
    <div class="app-main">
      <router-view></router-view>
    </div>
    <div class="app-footer">
      <Footer></Footer>
    </div>
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
    }
  }
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    background: #2B2B2B;
    overflow:hidden;
  }
  #app{
    width: 100%;
    height: 100%;
    background: #2B2B2B;
    overflow:hidden;
    padding: 0;
  }
  .app-main {
    width: 100%;
    position: absolute;
    left: 0;
    top: 30px;
  }
  .app-title {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .app-footer {
    z-index: 100;
    height: 29px;
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
</style>
