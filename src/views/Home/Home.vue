<template>
    <div>
        <!-- <TreeChart :json="treeData" /> -->
        <tree/>
    </div>
</template>
<script setup>
 import { ref } from 'vue'  
 import TreeChart from "vue-tree-chart-3";
import tree from '@/components/tree.vue';

const treeData = ref(
    {
    name: 'root',
    image_url: "https://th.bing.com/th/id/OIP.DrqrLrmAuQZq0trW6D1TygHaEm?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    class: ["rootNode"],
    children: [
      {
        name: 'children1',
        image_url: "../assets/images/welcome1.jpg"
      },
      {
        name: 'children2',
        image_url: "../assets/images/welcome1.jpg",
        mate: [{
          name: 'mate',
          image_url: "../assets/images/welcome1.jpg"
        }],
        children: [
          {
            name: 'grandchild',
            
            // image_url: "https://static.refined-x.com/avat.jpg"
          },
          {
            name: 'grandchild2',
            // image_url: "https://static.refined-x.com/avat1.jpg"
          },
          {
            name: 'grandchild3',
            
            // image_url: "https://static.refined-x.com/avat2.jpg"
          }
        ]
      },
      {
        name: 'children3',
        image_url: "https://static.refined-x.com/avat.jpg"
      }
    ]
  }
)

</script>

<style lang="less" scoped>

</style>