<script >
    export default{
        data() {
            return {
                
            }
        },
        props:{
            value: String
        },
        mounted(){

        }
    }
</script>
<template>
    <input ref="input" :value="value">
</template>
<style scoped>
    input{
        align-items: center; position: relative;
        min-width: 10.25em;
        width: 14em;
        box-sizing: border-box;
        height: 3em;
        padding: 0 .83em;
        font-size: 1em;
        color: var(--theme-color-normal);
        text-align: center;
        border: .33em solid var(--theme-border-color-normal);
        border-radius: 1.58em;
        background-color: var(--theme-background-item);
        outline: none;
    }
    input::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 20px;
        background-color: red;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none; /* 防止覆盖输入框 */
    }
</style>