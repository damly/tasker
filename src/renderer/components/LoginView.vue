<style lang="less">
    .login{
        width: 100%;
        background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
        background-size: cover;
        background-position: center;
        position: absolute;
        top:30px;
        bottom: 0px;
        &-con{
            position: absolute;
            right: 160px;
            top: 50%;
            transform: translateY(-60%);
            width: 300px;
            &-header{
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }
            .form-con{
                padding: 10px 0 0;
            }
            .login-tip{
                font-size: 10px;
                text-align: center;
                color: #c3c3c3;
            }
        }
    }
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="true">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          userName: 'admin',
          password: '123456'
        },
        rules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('Login', this.form).then(() => {
              this.$router.push({ path: '/' })
            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
    }
  }
</script>