<template>
  <div class="maintop" v-if="isshow">{{classify}}</div>
</template>

<script>
export default {
    name:'mainTopBar',
    props:{
        classify:{
            type:String,
            default(){
                return '我的订单'
            }
        },
      isshow:{
        type:Boolean,
        default(){
          return true
        }
      }
    }

}
</script>

<style>
.maintop{
    position: sticky;
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    background-color: yellowgreen;
    color: #fff;

}

</style>