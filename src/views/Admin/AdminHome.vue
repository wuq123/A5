<template>
    <div>
        <div class="container">
          
            <div class="show">
                <div>
                    <userManage/>
                </div>
                
            </div>
            <!-- <div class="left">
                <div class="p1">用户信息管理</div>
                <div class="p2">课程信息管理</div>
                <div class="p3">用户权限管理</div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import userManage from '@/components/userManage.vue'

</script>


<style lang="less" scoped>

.container {  
    
    display: grid;
    width: 100%;
    height: 100vh;;
    overflow: hidden;
        grid-template-columns: 0.5fr 1.5fr 1fr;
        grid-template-rows: 0.3fr 1.7fr 1fr;
        gap: 0px 0px;
        grid-auto-flow: row;
        grid-template-areas:
            "show show show"
            "show show show"
            "show show show";
    }

.top { 
    grid-area: top; 
    background-color: #fff;
}

.show {
    border:1px solid #fff;
    grid-area: show; 
    position: relative;
}

.left {
     grid-area: left; 
     border: 2px solid #bb5463;
}

ul {
       
       display: flex; 
       height: 30px;
       line-height: 30px;
       justify-content: flex-end;
       li {
           a{
               font-size: 18px;
               padding: 0 10px;
               color:#000000;
               border-left: 1px solid #ccc;
               &:hover {
                   color: #af1515;
               }
           }
       }
       li:nth-child(1) {
           a {
               border-left: 0;
           }
       }
   }

.p1 {
    margin: auto;
    position: absolute;
    top:20%;
    left: 5%;
}

.p2 {
    margin: auto;
    position: absolute;
    top:40%;
    left: 5%;
}

.p3 {
    margin: auto;
    position: absolute;
    top:60%;
    left: 5%;
}
</style>