<script>
  import Wallpaper_box from './components/wallpaper_box.vue';
  import buttomVue from './zzzElement/buttom.vue';
  import inputVue from './zzzElement/input.vue';
  import anime from 'animejs/lib/anime.es.js';
  import canvasCalculator from './scripts/canvasCalculator';

  export default {
    data() {
      return {
        config: {
          imageCanvasRatio: [9,16, ],
          imageCanvasSize: [1080,1920],
          scale: [],
          select: 'calender',
          details: {
            character: '冯·莱卡恩',
            group: '维多利亚家政',
            themeColor: ['#9639e9','#7b46dc']
          },
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          date: new Date()
        },
        settingBox: null,
        wheelY: -180,
        _rendingwheelY: -180,
        maxheight: null,
      };
    },
    methods: {
      handleScroll(event) {
        this.wheelY += event.wheelDeltaY

        anime({
          targets: this,
          _rendingwheelY: this.wheelY,
          timing: 'spring(1,100,100,0)'
        })
        this.handlesScalle()
      },
      handleResize() {
        this.config.windowWidth = window.innerWidth;
        this.config.windowHeight = window.innerHeight;

        this.handlesScalle()
      },
      handlesScalle() {
        let screenRatio = canvasCalculator.sizeToRatio([this.config.windowWidth, this.config.windowHeight]);
        screenRatio = screenRatio[0] / screenRatio[1]
        let imageRatio = this.config.imageCanvasRatio[0] / this.config.imageCanvasRatio[1]
        if (screenRatio > imageRatio) {
          // 宽度更大，高更小，以高作为参考

          this.maxheight = canvasCalculator.ratioToSize(
            this.config.imageCanvasRatio,
            [0, this.config.windowHeight*0.8],
            false
          )[1]; 
        } else {
          
          this.maxheight = canvasCalculator.ratioToSize(
            this.config.imageCanvasRatio,
            [this.config.windowWidth*0.8, 0],
            true
          )[1];
        }
        console.log( this.maxheight);
      }
    },
    mounted() {
      this.settingBox = this.$refs.settingBox;
      document.addEventListener('wheel', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      this.handlesScalle()

    },
    beforeDestroy() {
      if (this.settingBox) {
        this.settingBox.removeEventListener('wheel', this.handleScroll);
      }
      window.removeEventListener('resize', this.handleResize);
    },
    components: {
      buttomVue,
      Wallpaper_box,
      inputVue
    }
  }
</script>

<template>
  <wallpaper_box class="wallpaper box" :config="config" :maxheight="maxheight" />
  <div :style="{
    '--wheelY':this._rendingwheelY+'px'
  }" ref="settingBox" class="setting">
    <h1>设置</h1>
    <div class="flexBox">
      <buttomVue @click="config.select='calender'" :actived="config.select=='calender'">日历壁纸</buttomVue>
      <buttomVue @click="config.select='video'" :actived="config.select=='video'">好感动态壁纸</buttomVue>
    </div>
    <div class="flexBox">
      <div>
        <h2>角色名</h2>
        <inputVue :value="this.config.details.character" @oninput="(value)=>{this.config.details.character=value}">
        </inputVue>
      </div>
      <div>
        <h2>阵营</h2>
        <inputVue :value="this.config.details.group" @oninput="(value)=>{this.config.details.group=value}"></inputVue>
      </div>
    </div>
    <div class="flexBox">
      <div>
        <h2>比例</h2>
        <inputVue :value="this.config.imageCanvasRatio[0]" @oninput="(value)=>{this.config.imageCanvasRatio[0]=value}"/> <br>

        <inputVue :value="this.config.imageCanvasRatio[1]" @oninput="(value)=>{this.config.imageCanvasRatio[1]=value}"/>
      </div>
      <div>
        <h2>分辨率</h2>
        <inputVue :value="this.config.imageCanvasSize[0]" @oninput="(value)=>{this.config.imageCanvasSize[0]=value}"/> <br>

        <inputVue :value="this.config.imageCanvasSize[1]" @oninput="(value)=>{this.config.imageCanvasSize[1]=value}"/>
      </div>
      <div>
        <h2>主题色</h2>
        <inputVue :value="this.config.details.themeColor[0]" @oninput="(value)=>{this.config.details.themeColor[0]=value}"/> <br>

        <inputVue :value="this.config.details.themeColor[1]" @oninput="(value)=>{this.config.details.themeColor[1]=value}"/>
      </div>
    </div>
    
    <div class="flexBox">
        <div>
          <h2>右侧画布调整</h2>
        </div>

        <div>
          <h2>自定义小图标</h2>
        </div>
    </div>

    <h2>功能</h2>
    <div class="flexBox">

      <buttomVue @click="config.select='calender'">全屏</buttomVue>
      <buttomVue @click="config.select='video'">下载图片</buttomVue>
    </div>
  </div>

</template>

<style scoped>
  h1 {
    color: #fff;
  }

  .wallpaper.box {
    position: absolute;
    left: 50%;
    top: calc(50%);
    transform: translate(-50%, -50%);
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
    padding: 1.4em;
    background-color: #0009;
    backdrop-filter: blur(1em);
    left: 50%;
    top: calc(100vh + var(--wheelY));
    transform: translate(-50%);
  }
</style>