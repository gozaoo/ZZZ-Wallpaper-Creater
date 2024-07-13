<script>
  import Wallpaper_box from './components/wallpaper_box.vue';
import buttomVue from './zzzElement/buttom.vue';
  Wallpaper_box
  export default {
    data() {
      return {
        select: 'calender',
        config:{

        }
      }
    },
    components:{
      buttomVue,
      Wallpaper_box
    }
  }
</script>

<template>
  <wallpaper_box />
  <div class="setting">
    <h1>设置</h1>
    <div class="buttomBox">
      <buttomVue @click="select='calender'" :actived="select=='calender'">日历壁纸</buttomVue>
      <buttomVue @click="select='video'" :actived="select=='video'">好感动态壁纸</buttomVue>
    </div>
  </div>
  
</template>

<style scoped>
  h1{
    color: #fff;
  }
  .buttomBox{
    display: flex;
    align-items: center;
    /* border: .33em solid var(--theme-border-color-normal); */
    gap: 8px;
    justify-content: center;
  }
  .setting{
    position: absolute;
    border-radius: 1.58em;
    padding:10px 20px;
    background-color: var(--theme-background-item);
    left: 50%;
    bottom: 20px;
    transform: translate(-50%);
  }
</style>
