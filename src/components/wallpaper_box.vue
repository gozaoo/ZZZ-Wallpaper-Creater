<script>
    import canvasCalculator from '../scripts/canvasCalculator';
    export default {
        data() {
            return {
                tempConfig: {
                    imageCanvasRatio: [16, 9],
                    imageCanvasSize: [1920, 1080]
                },
                rending: {
                    rendingSize: null,
                    scale:null
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
                handler(newvValue) {
                    this.rending.rendingSize = canvasCalculator.ratioToSize(
                        this.config.imageCanvasRatio,
                        [0, this.maxheight],
                        false
                    );
                    this.rending.scale = this.rending.rendingSize[0]/this.config.imageCanvasSize[0]
                },
                immediate: true
            }
        },
        methods: {

        }
    }
</script>
<template>
    <div :style="{
        'aspect-ratio':config.imageCanvasRatio[0]+'/'+config.imageCanvasRatio[1],
        '--height':rending.rendingSize[0]+'px',
        'height':rending.rendingSize[0]+'px',
    }" class="box wallpaperBox">
        <div class="canvas" :style="
        {
        'font-size':rending.scale+'px'
        }" v-if="config.select=='calender'">
            <div class="leftBar">

            </div>
        </div>

    </div>
</template>
<style scoped>
    .box.wallpaperBox {
        position: absolute;
        /* min-height: ; */
        border-radius: 1.58em;
        border: var(--border-value-normal);
        /* background-color: #fff; */
        /* font-size: 1920 */
        overflow: hidden;
    }
    .leftBar{
        width: 255em;
        background-color: #161616;
        height: var(--height);
    }
</style>