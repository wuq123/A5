<template>
    <div class="my-header w">
        
        <div class="header-top">
            <!-- logo -->
             <h1 class="logo">
                <RouterLink to="/login">智教系统</RouterLink>
             </h1>
             <!-- 搜索 -->
              <div class="center">
                <div class="center-search">
                    <input type="text" placeholder="python">
                    <button class="search-btn">搜索</button>
                </div>
              </div>
              <!-- 用户主页 -->
               <div class="home"></div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
@import url('../assets/styles/variables.less');
.my-header {
    height: 120px;
    padding: 25px 0 0 0;
    // background-color: #fff;
    .header-top {
        display: flex;
        .logo {
            width: 230px;
            height: 60px;
            a{
                display: inline-block;
                height: 60px;
                width: 100%;
                background: url();
            }
        }
        .center {
            flex: 1;
            .center-search {
                width: 520px;
                height: 35px;
                input {
                    width: 440px;
                    height: 35px;   
                    border: 1px solid @xtxColor;
                    border-radius: 20px 0 0 20px;
                    padding-left: 10px;
                    box-sizing: border-box;
                }
                .search-btn{
                    float:right;
                    width: 80px;
                    height: 35px;
                    color: #fff;
                    background-color: @xtxColor;
                    border-radius: 0 20px 20px 0;
                    border: 1px solid @xtxColor;
                }
            }
        }
        .home {

        }
    }
}

</style>