<script>
    import anime from 'animejs/lib/anime.es.js';
    export default {
        data() {
            return {
                animeCallback: null,
            }
        },
        props: {
            actived: Boolean,
        },
        watch: {
            actived: {
                handler() {
                    this.checkState()
                },
                deep:true
            }
        },
        mounted() {
            this.checkState()
        },
        methods: {
            checkState() {
                console.log(this.actived);
                if (this.actived == true) {
                        this.animeCallback = anime({
                        targets: this.$refs.background,
                        duration: 1000,
                        easing: 'spring(1, 100, 15, 0)',
                        background: [
                            '#d8fa00',
                            '#94ad00',
                            '#d8fa00',
                        ],
                        scale: [
                            1,
                            1.07,
                            1,
                        ],
                        loop: true
                    })
                } else if (this.actived == false) {
                    if (this.animeCallback) this.animeCallback.pause();

                    if (this.$refs.background) this.$refs.background.style = ""
                    this.animeCallback= null

                }
            }
        },
        beforeDestroy() {
            if (this.animeCallback.pause) this.animeCallback.pause();

            this.animeCallback = null
        }
    }
</script>

<template>
    <div class="box">
        <div ref="background" v-if="actived==true" class="background">
        </div>
        <div :class="[
        (actived==true)?'actived':undefined,
        'buttom'
        ]">
        <slot/>
        </div>
    </div>
</template>
<style scoped>

.box{

    visibility: visible;
    user-select: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    z-index: 3;
    position: relative;
    display: block;
    width: fit-content;
}
/* 0.24 */
.buttom{
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    line-height: 1;
    visibility: visible;
    user-select: none;
    box-sizing: border-box;
    margin: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-width: 10.25em;
    height: 3em;
    padding: 0 .83em;
    font-size: 1em;
    color: var(--theme-color-normal);
    text-align: center;
    border: .33em solid var(--theme-border-color-normal);
    border-radius: 1.58em;
    background-color: var(--theme-background-item);
    cursor: pointer;
    transition: all 200ms;
}
.buttom:hover{
    background-color: var( --theme-color-active);
    color: black;
    border: .33em solid var( --theme-color-active);
}
.buttom:active{
    background-color: var(--theme-background-item);

    color: var(--theme-color-normal);
    border: .33em solid var(--theme-border-color-normal);
    transition: all 0ms;

}
.actived.buttom{
    background-color: #0000;
    color: black;
    border: none;
}
.background{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    border-radius: 1.58em;
    right: 0;    font-size: 1em;
    bottom: 0;
    transform-origin: 50%;
    background-color: #d8fa00;
    /* animation: bottomActiveBackground 1s ease-in-out infinite; */
}
</style>