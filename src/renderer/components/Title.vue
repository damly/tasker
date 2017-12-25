<template>
    <Row class="my-title-main">
        <Col span="1">
            <img class="my-title-icon" src="~@/assets/logo.png">
        </Col>
        <Col span="21">
            <div class="my-title">
                测试软件
            </div>
        </Col>
        <Col span="2">
            <ButtonGroup class="my-title-group">
                <TitleButton type="min"/>
                <TitleButton type="close"/>
            </ButtonGroup>
        </Col>
    </Row>
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
        padding-top: 5px;
        padding-left: 5px;
    }

    .my-title {
        color: #c3c3c3;
        font-size: 14px;
    }
    .my-title-icon {
        width: 20px;
        height: 20px;
    }

    .my-title-group {
        position: absolute;
        right: 0;
        -webkit-app-region: no-drag;
    }
</style>