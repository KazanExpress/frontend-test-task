/**
 * This mixin need for short and full todo show actual color of iconV
 * @vue-computed {String} color - return color of close icon by item.closed
 */
export default {
    computed: {
        color () {
            if (this.item.closed) {
                return 'green'
            } else {
                return 'grey'
            }
        }
    }
}
