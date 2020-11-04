<template>
    <div class="container login">
        <!-- 登录盒子 -->
        <div class="login-box">
            
            <!-- 图片Logo -->
            <div class="header">
                <div class="logo">
                    <img src="@/assets/logo.png" alt="codelieche">
                </div>
            </div>
           
            <!-- 表单：用户名和密码 -->
           <div class="forms">
               <el-form ref="loginForm" :rules="rules" :model="loginForm">
                   <!-- 用户名 -->
                   <el-form-item label-width="0" prop="username">
                       <el-input v-model="loginForm.username" name="username"
                       prefix-icon="el-icon-user" placeholder="用户名">
                           
                       </el-input>
                   </el-form-item>
                   
                   <!-- 密码 -->
                   <el-form-item label-width="0" prop="password">
                       <el-input v-model="loginForm.password" name="password"
                       type="password"
                       prefix-icon="el-icon-lock" placeholder="用户密码"></el-input>
                   </el-form-item>
               </el-form>
               
               <!-- 按钮 -->
               <div class="buttons">
                   <el-button type="primary" @click="handleLogin">登录</el-button>
                   <el-button @click="handleReset">重置</el-button>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserLogin001",
    data(){
        return {
            loginForm: {
                "username": "codelieche",
                "password": "123456"
            },
            // 验证规则:
            // 记得给el-form设置 :model="loginForm" :rules="rules"
            rules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: "blur"},
                    {min: 3, max: 20, message: "长度是3-20位", trigger: "change"}
                ],
                password: [
                    {required: true, message: "请输入用户密码", trigger: "blur"},
                    {min: 6, max: 20, message: "长度是6-20位", trigger: "change"}
                ]
            }
        }
    },
    methods: {

        // 登录事件
        handleLogin(){
            // 1. 表单验证
            this.$refs["loginForm"].validate(async validated => {
                // console.log(`验证结果：${validated}`);
                if(validated){
                    // 2. 发起登录操作
                    // console.log(this.$http);
                    var loginUrl = "https://kanban.codelieche.com/api/v1/account/login"
                    var response =  await this.$http.post(loginUrl, this.loginForm)

                    // 3. 对结果进行校验
                    if(response.status == 200){
                        var data = response.data
                        if(data.status){
                            // 登录成功
                            // console.log("登录成功")
                            this.$message({ 
                                message:"登录成功",
                                type: "success",
                            })

                            // 设置个标识符啊等

                            // 4. 跳转首页
                            this.$router.push("/about")
                        }else{
                            // console.log("登录失败", data.message)
                            this.$message({
                                message: "登录失败：" + data.message, 
                                type: "error",
                            })
                        }
                    }else{
                        console.log(response)
                        this.$message({
                                message: "发起请求失败：" + data.data, 
                                type: "warning",
                        })
                    }
                }else{
                    // 未验证成功
                    this.$message({
                        message: "校验失败", 
                        type: "warning",
                    })
                }
            });
        },

        // 重置按钮函数
        handleReset(){
            console.log(this.$refs);
            this.$refs["loginForm"].resetFields();
        }
    }
}
</script>



<style lang="less" scoped>
.container.login{
    height: 100vh;
    background-color: #eee; 
    position: relative;
    
    // 登录盒子
    .login-box {
        width: 450px;
        height: 350px;
        border-radius: 5px;
        position: absolute;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        .header {
            border-radius: 5px 5px 0 0;
            background-color: #4A90E2;
            width: 100%;
            height: 150px;
            position: relative;
        }
        // logo样式
        .logo {
            height: 100px;
            width: 100px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-sizing: border-box;
            box-shadow: 0 0 10px #ddd;
            background-color: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            // logo图片
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        
        // 表单
        .forms {
            width: 100%;
            padding: 10px 20px;
            position: absolute;
            bottom: 20px;
            box-sizing: border-box;
            .buttons{
                text-align: right;
            }
        }
    }
}
</style>
