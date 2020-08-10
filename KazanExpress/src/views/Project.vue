<template>
    <div @copy.prevent.capture="copy" @paste.prevent.capture="paste" class="container-sm p-4 " style="max-width: 50em">
        <div v-if="inStart">
            <Name/>
        </div>
        <button @dragover.prevent="dragBack=true" @dragleave="dragBack=false" @drop="onDropBack"
                class="btn m-2 transition neo"
                :class="[$store.state.onDrag?'pl-5 pr-5':'',{'add': dragBack}]"
                v-else @click="back">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="green"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
        </button>
        <ToDo/>
        <div>
            <Import v-if="inStart"/>
            <div class="mt-5 d-flex justify-content-around">
                <div v-if="inStart" role="button" @click="$store.commit('export')"
                     class="text-center">
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-cloud-download m-2"
                         fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                        <path fill-rule="evenodd"
                              d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                    </svg>
                    <div>Download this .todo file</div>
                </div>
                <div v-if="!inStart" role="button" @click="cut" class="text-center">
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="m-2" fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path fill-rule="evenodd"
                              d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zm-1 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <div>
                        <p class="m-0 p-0">
                            Cut this todo item
                        </p>
                        <small>to paste use hot key</small>
                    </div>
                </div>
                <div role="button" @click="copy" class="text-center">
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="m-2" fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path fill-rule="evenodd"
                              d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                    </svg>
                    <div>
                        <p class="m-0 p-0">
                            Copy this todo item
                        </p>
                        <small>to paste use hot key</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ToDo from '../components/ToDo'
    import Name from '../components/Name'
    import Import from '../components/Import'

    export default {
        name: 'Project',
        components: {ToDo, Name, Import},
        data: () => ({
            dragBack: false,
        }),
        computed: {
            name() {
                return this.$store.state.name
            },
            inStart() {
                return this.$store.state.root.length === 0
            }
        },
        watch: {
            name() {
                document.title = this.name
            }
        },
        methods: {
            cut() {
                this.copy()
                this.$store.dispatch('deleteSelf')
            },
            copy() {
                const item = this.$store.getters.getItemByRoot
                if (item.text === '') {
                    item.text = this.$store.state.name
                }
                const content = JSON.stringify(item)
                this.$clipboard(content)
            },
            paste(e) {
                console.log('paste')
                const data = e.clipboardData.getData('Text')
                try {
                    const item = JSON.parse(data)
                    this.$store.dispatch('addItem', item)
                } catch (e) {
                    console.log('paste item error')
                }
            },
            onDropBack(e) {
                this.dragBack=false
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.dispatch('dropBack', {drop: index})
            },
            back() {
                this.$store.dispatch('back')
            },
        },
        mounted() {
            document.title = this.name
        }
    }
</script>
