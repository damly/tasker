<style scoped>
    .main-layout {
        background: #2B2B2B;
        background-size: cover;
        overflow:hidden;
    }
    .main-layout-menu {
        background-color: rgb(60, 63, 65);
        height: 60px;
    }
    .main-layout-menu-item {
        font-size: 20px;
    }
    .main-layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .main-layout-nav {
        width: 700px;
        margin: 0 auto;
    }

    .main-layout-content {
        background: #2B2B2B;
        min-height: 200px;
        overflow:hidden;
    }
</style>
<template>
    <div class="main-layout">
        <Menu class="main-layout-menu"
              mode="horizontal"
              theme="dark"
              active-name="1"
              @on-select="onSelect"
        >
            <div class="main-layout-logo"></div>
            <div class="main-layout-nav">
                <MenuItem name="setting" class="main-layout-menu-item">
                    <Icon type="settings"></Icon>
                    <span>Item 1</span>
                </MenuItem>
                <MenuItem name="add" class="main-layout-menu-item">
                    <Icon type="person-add"></Icon>
                    <span>Item 1</span>
                </MenuItem>
                <MenuItem name="send" class="main-layout-menu-item">
                    <Icon type="chatbox-working"></Icon>
                    <span>Item 1</span>
                </MenuItem>
                <MenuItem name="help" class="main-layout-menu-item">
                    <Icon type="help-circled"></Icon>
                    <span>Item 1</span>
                </MenuItem>
            </div>
        </Menu>
        <div class="main-layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import { init, forward, start } from '../adb'

  export default {
    name: 'main-page',
    methods: {
      onSelect (name) {
        this.$router.push({
          name: name
        })
      },
      forwardHandle () {
        forward(function (err) {
          alert(err)
        }, function () {
          alert('forward ok')
        })
      },
      initHandle () {
        init(function (err) {
          alert(err)
        }, function () {
          alert('init ok')
        })
      },
      startHandle () {
        start(function (err) {
          alert(err)
        }, function () {
          alert('start ok')
        })
      }
    }
  }
</script>

<style>

</style>
