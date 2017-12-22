<template>
    <div class="my-title-main">
        <Row>
            <Col span="1">
                <img class="my-title-icon" src="~@/assets/logo.png" alt="electron-vue">
            </Col>
            <Col span="21">
                <div class="my-title">
                    测试软件
                </div>
            </Col>
            <Col span="2">
                <ButtonGroup class="my-title-group">
                    <TitleButton type="min" />
                    <TitleButton type="close" />
                </ButtonGroup>
            </Col>
        </Row>
    </div>
</template>

<script>
  import TitleButton from './TitleButton.vue'
  export default {
    name: 'title',
    components: {
      TitleButton
    }
  }
</script>

<style>
    .my-title-main {
        width: 100%;
        height: 30px;
        background-color: rgb(60, 63, 65);
        -webkit-app-region: drag;
    }
    .my-title {
        color: #c3c3c3;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 14px;
    }
    .my-title-icon {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .my-title-group {
        position: absolute;
        right: 0px;
        margin: 5px;
        -webkit-app-region: no-drag;
    }
</style>