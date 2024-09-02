<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <!-- 一级路由出口 -->
    <router-view />
</template>


<script>

     window.onload = function() {
    // 禁用双指放大
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    });
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault()
    })
    // 禁用双击放大
    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, {
        passive: false
    });
  };
</script>

<style lang="less">
@import url('./assets\styles\mixins.less');
</style>
