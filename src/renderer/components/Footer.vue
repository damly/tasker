<template>
    <div class="my-footer-main">
        <Row>
            <Col span="1">
            </Col>
            <Col span="21">
            <div class="my-title">
                测试软件
            </div>
            </Col>
            <Col span="2">
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
    name: 'footer'
  }
</script>

<style>
    .my-footer-main {
        width: 100%;
        height: 30px;
        background-color: rgb(60, 63, 65);
    }
    .my-title {
        color: #c3c3c3;
        font-size: 14px;
    }
</style>