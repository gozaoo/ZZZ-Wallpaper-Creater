<script>
    import canvasCalculator from '../scripts/canvasCalculator';
    import calendarCalculator from '../scripts/calendarCalculator';
    import '../assets/noise_texture.png'
    import '../assets/7a47f17c045204d71a1a65b4e86c11c35ce7141b.jpg'
    export default {
        data() {
            return {
                tempConfig: {
                    imageCanvasRatio: [16, 9],
                    imageCanvasSize: [1920, 1080]
                },
                rending: {
                    rendingSize: null,
                    scale: null,
                    monthName: null,
                    daysList: []
                },
                rightSideStyles:{ //normal
                    backgroundColor:'#dedcd0'
                }
            }
        },
        props: {
            config: Object,
            maxheight: Number
        },
        created() {

        },
        watch: {
            maxheight: {
                handler(newValue) {

                    this.rending.rendingSize = canvasCalculator.ratioToSize(
                        this.config.imageCanvasRatio,
                        [0, newValue],
                        false
                    );
                    this.rending.scale = this.rending.rendingSize[0] / this.config.imageCanvasSize[0]

                },
                immediate: true
            },
            config: {
                handler(newValue) {
                    let result_calander = calendarCalculator.getMonthNameAndDays(newValue.date)
                    this.rending = {
                        ...this.rending,
                        ...result_calander
                    }

                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            toDoubleDigit(originNum){
                if(originNum<10){
                    return '0'+originNum
                }
                return originNum
            }
        }
    }
</script>
<template>
    <div :style="{
            'aspect-ratio':config.imageCanvasRatio[0]+'/'+config.imageCanvasRatio[1],
            '--height':rending.rendingSize[1]+'px',
            '--theme-color0':config.details.themeColor[0],
            '--theme-color1':config.details.themeColor[1],
            'height':rending.rendingSize[1]+'px',

        }" class="box wallpaperBox">
        <div class="canvas" :style=" {
            'font-size':rending.scale+'px'
            }" v-if="config.select=='calender'">
            <div class="leftBar">
                <div class="monthBackgroundTexture"></div>
                <div class="themeColorShadow"></div>
                <div class="month">
                    <div class="round">
                        <div class="round2">
                        </div>

                            <div class="text vertical-rl">
                                {{rending.monthName}}
                            </div>
                    </div>

                </div>
                <div class="day">
                    <div class="line"></div>
                    <div class="aDay" v-for="(item, index) in rending.daysList" :key="index">
                        <div>
                            <div  :class="['text','days',item.type]">
                                {{toDoubleDigit(item.day)}}
                            </div>
                                
                            </div>
                        
                    </div>
                </div>
            </div>
            <div :style="rightSideStyles" class="rightside">

            </div>
        </div>

    </div>
</template>
<style scoped>
    .box.wallpaperBox {
        position: relative;
        border-radius: 1.58em;
        min-width: 3.16em;
        min-height: 3.16em;
        border: var(--border-value-normal);
        overflow: hidden;

    }

    .leftBar {
        width: 255em;
        background-color: #161616;
        height: var(--height);
        position: relative;
    }
    .rightside{
        position: absolute;
        width: calc(100% - 255em);
        left: 255em;
        top: 0;
        height: 100%;
        right: 0;
        background-color: #fff;
        background-position: 47% 30%;
        background-size: 500%;
        background-image: url('../assets/7a47f17c045204d71a1a65b4e86c11c35ce7141b.jpg');
    }
    .month {
        padding: 48em 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .round {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 78em;
        width: 78em;
        color: #2d2427;
        background: linear-gradient(0deg, var(--theme-color0), var(--theme-color1));
        border-radius: 50%;
        font-weight: 900;
        

    }
    .round2{
        height: 72em;
        width: 72em;
        border: solid 2em #1c1c1c;
        position: absolute;
        border-radius: 50%;
    }
    .text.vertical-rl {
        writing-mode: vertical-rl;
        letter-spacing: -0.2em;
        width: fit-content;
        height: fit-content;
        display: inline;
        transform: scaleY(0.85) translateY(-0.1em);
        transform-origin: 50%;
        font-size: 28em;
    }

    .monthBackgroundTexture {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(../assets/noise_texture.png);
        background-position: 0%;
        background-size: 255px 255px;
        opacity: 0.05;
        /* background-color: #fff5; */
        /* mask: url() 0 0/50px 50px; */
    }

    .themeColorShadow {
        position: absolute;
        width: 100%;
        opacity: 0.09;
        height: 31.4%;
        background: linear-gradient(180deg, var(--theme-color0), #0000);


    }
    .day{
        height: 870em;
        margin-top: 12em;
        width: 90em;
        position: relative;
        margin: 12em auto 0 auto;
        /* background-color: #fff3; */
    }
    .text.days{
        font-size: 21em;
        line-height: 1.34em;
    }
    .text.days.workingDay{
        color:#838383;
    }
    .text.days.weekend{
        color:#bdbdbd;
        /* align-content: end; */
        text-align: end;
    }
    .line{
        position: absolute;
        left: 50%;
        height: 100%;
        width: 3em;
        background-color: #2f2f2f;
    }
</style>