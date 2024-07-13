<script>
    export default {
        data() {
            return {
                tempConfig: {
                    imageCanvasRatio: [16, 9],
                    imageCanvasSize: [1920, 1080]
                },
                rending:{
                    rendingSize: [0,0]
                }
            }
        },
        props: {
            config: Object
        },
        methods: {
            sizeToRatio(sizeArray) {
                const [width, height] = sizeArray;
                const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                const greatestCommonDivisor = gcd(width, height);
                return [width / greatestCommonDivisor, height / greatestCommonDivisor];
            },
            ratioToSize(ratioArray, sizeArray, isWidthReference = true) {
                let [ratioWidth, ratioHeight] = ratioArray;
                let scale = isWidthReference ? sizeArray[0] / ratioWidth : sizeArray[1] / ratioHeight;
                return [ratioWidth * scale, ratioHeight * scale];
            }
        }
    }
</script>
<template>
    <div :style="{
        
    }" class="box wallpaperBox">

    </div>
</template>
<style scoped>

</style>