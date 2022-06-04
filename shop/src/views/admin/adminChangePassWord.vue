<template>
<div class="changepsw" style="height: 100%">
  <change-password  :url="'/admin/changepassword'"></change-password>
</div>
  
</template>

<script>
import changePassword from '../../components/content/changePassword.vue';
export default {
  name:'adminChangePsw',
  components:{
      changePassword
  }
  
}
</script>

<style scoped>

</style>