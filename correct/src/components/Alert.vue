<template>
    <div class="transition pos m-auto" :class="{'hidden': isHidden}">
        <div class="neo p-2 pl-4 pr-4 text-nowrap">
            {{data}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Alert',
        data: () => ({
            isHidden: true,
            data: '',
            timeout: null
        }),
        methods: {
            change(data) {
                this.data = data
                this.isHidden = false
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.isHidden = true
                }, 2600)
            }
        },
        created() {
            this.$eventHub.$on('alert', this.change)
        }
    }
</script>

<style scoped>
    .pos {
        z-index: 100;
        position: fixed;
        top: 13px;
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>
