<template>
<div class="mainBox">
       <router-view></router-view>
</div>
  
</template>

<script>
export default {
    name:"mainBox",
}
</script>

<style scoped>
.mainBox{
    box-sizing: border-box;
    height: calc(100vh - 80px);
    background-color: #f0f0f0;
}

</style>