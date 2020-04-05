<template>
    <div class="container"
         @dragover.prevent
         @drop.prevent="drop"
    >
        <div class="container__title">
            <div v-if="!titleIsEditing"
                 class="project-title"
            >
                <h1 @click="editMainTitle(mainProjectTitle)">
                    Название проекта: {{ mainProjectTitle }}
                </h1>
            </div>
            <div v-else class="project-title project-title--input">
                <input
                        v-model="mainProjectTitle"
                        type="text"
                        placeholder="Ваш проект"
                        ref="mainTitle"
                        @blur="editMainTitle()"
                >
                <button
                        class="btn btn--title-add"
                        @click="editMainTitle()"
                        title="Сохранить"
                >
                </button>
            </div>
            <div class="import-export-wrapper">
                <export/>
                <import @load="fileText = $event" />
            </div>
        </div>
        <div class="container__block">
            <cards-list
                    v-for="(value, index) in columnList"
                    :key="index"
                    :value="value"
                    :index="index"
            />
        </div>
    </div>
</template>

<script>
    import CardsList from '@/components/CardsList'
    import Import from '@/components/Import'
    import Export from '@/components/Export'
    import {mapGetters} from "vuex";

    export default {
        name: "Board",

        components: {
            CardsList,
            Import,
            Export
        },

        data() {
            return {
                columnList: ['Новые', 'В работе', 'Готово', 'Архив'],
                mainProjectTitle: '',
                titleIsEditing: true,
                fileText: ''
            }
        },

        computed: {
            ...mapGetters('data', ['getMainTitle']),
        },

        created() {
            this.restoreMainProjectTitle()
        },

        watch: {
            fileText() {
                this.$store.commit('data/loadFileToStore', {file:this.fileText})
                this.restoreMainProjectTitle()
            }
        },

        methods: {
            editMainTitle() {
                this.titleIsEditing = !this.titleIsEditing
                if (this.mainProjectTitle.length === 0) this.titleIsEditing = true
                if (this.mainProjectTitle) {
                    this.$nextTick(() => this.$refs.mainTitle.focus())
                    this.$store.commit('data/setMainTitle', {mainTitle: this.mainProjectTitle})
                }
            },
            restoreMainProjectTitle() {
                let mainTitle = this.getMainTitle
                if (mainTitle) {
                    this.mainProjectTitle = mainTitle
                    this.titleIsEditing = false
                }
            },
            drop(e) {
                let card_id = e.dataTransfer.getData("card_id")
                let card = document.getElementById(card_id)
                card.style.opacity = "1"

                let cardList = e.target.closest('.cards-list')
                if(cardList) {
                    let wrapper = cardList.querySelector('.card-wrapper')
                    let progress = wrapper.id
                    this.$store.commit('data/setProjectProgress', {index:card_id, progress: progress})
                }
            }
        }
    }
</script>

<style lang="sass">
    .container
        display: flex
        align-items: center
        width: 100%
        height: 100%
        flex-direction: column

        &__title,
        &__block
            display: flex
            justify-content: space-between
            align-items: center
            width: 95%

    .project-title
        padding: 20px

        &--input
            display: flex
            flex-direction: row
            position: relative
            justify-content: flex-start
            align-items: center

            input
                height: 50px
                margin-right: 20px

            input[type="text"]
                font-size: 24px


            .btn--title-add
                width: 25px
                height: 25px

    .import-export-wrapper
        display: flex
        align-items: center
        justify-content: space-between
        max-width: 40%
</style>
