<template>
    <div>
        <div  class="d-flex neo btn add m-2" :class="className" >
            <input  @copy.stop @paste.stop @keypress.enter="clickAndClean"  v-model="addText" type="text" :placeholder="placeholder" class="container-fluid ml-3 input">
            <div @click.stop="clickAndClean">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-plus " fill="green">
                <path fill-rule="evenodd"
                      d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
            </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AddButton',
        props: ['className', 'placeholder', 'clickFunction'],
        data: () => ({
            isShow: false,
            addText: ''
        }),
        methods: {
            keyPressHandler(e) {
                if (e.key=== 'Enter' || e.keyCode === 13) { // for any browsers
                    this.clickAndClean()
                    return false
                }
            },
            clickAndClean() {
                this.clickFunction(this.addText)
                this.addText=''
            }
        }
    }
</script>

<style scoped>

</style>
