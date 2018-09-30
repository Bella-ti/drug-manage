<template>
    <div class="header">
        <div class="logo">康健药店管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click"
                         @command="handleCommand">
                <span class="el-dropdown-link">
                        <img class="user-logo" src="../../assest/static/img/img.jpg">
                        {{username}}
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'none'
        }
    },
    computed: {
        username() {
            let userinfo = localStorage.getItem('curLogin')
            userinfo = JSON.parse(userinfo)
            return userinfo ? userinfo.username : this.name;
        }
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('curLogin')
                this.$router.push('/login');
            }
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    color: #fff;
}

.header .logo {
    float: left;
    width: 250px;
    text-align: center;
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 40px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
