<script>
  import Wallpaper_box from './components/wallpaper_box.vue';
  import buttomVue from './zzzElement/buttom.vue';
  import inputVue from './zzzElement/input.vue'
  import { ref, onMounted, onUnmounted } from 'vue';

  export default {
    data() {
      return {
        
        config: {
          imageCanvasRatio: [16, 9],
          imageCanvasSize: [1920, 1080],
          scale: [],
          select: 'calender',
          details:{
            character: '冯·莱卡恩',
            group: '维多利亚家政',
            themeColor:['#a836e5','#6c3bd3']
          }
        }
      }
    },
    components: {
      buttomVue,
      Wallpaper_box,
      inputVue
    }
  }
</script>

<template>
  <wallpaper_box class="wallpaper box" :config="config" :maxheight="200"/>
  <div ref="settingBox" class="setting">
    <h1>设置</h1>
    <div class="flexBox">
      <buttomVue @click="config.select='calender'" :actived="config.select=='calender'">日历壁纸</buttomVue>
      <buttomVue @click="config.select='video'" :actived="config.select=='video'">好感动态壁纸</buttomVue>
    </div>
    <div class="flexBox">
      <div>
        <h2>角色名</h2>
        <inputVue :value="this.config.details.character" @oninput="(value)=>{this.config.details.character=value}"></inputVue>
      </div>
      <div>
        <h2>阵营</h2>
        <inputVue :value="this.config.details.group" @oninput="(value)=>{this.config.details.group=value}"></inputVue>
      </div>
    </div>

  </div>

</template>

<style scoped>
  h1 {
    color: #fff;
  }
  .wallpaper.box{
    position: absolute;
    left: 50%;
    top: calc(50% - 100px);
    transform: translate(-50%,-50%);
  }
  .flexBox {
    display: flex;
    align-items: center;
    /* border: .33em solid var(--theme-border-color-normal); */
    gap: 8px;
    /* justify-content: center; */
  }

  .setting {
    position: absolute;
    border-radius: 1.58em;
    padding: 20px;
    background-color: var(--theme-background-item);
    left: 50%;
    bottom: 20px;
    transform: translate(-50%);
  }
</style>