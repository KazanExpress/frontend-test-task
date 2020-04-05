import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'todo-app',
            path: '/',
            component: require('@/components/Board').default
        },
    ]
});

export default router;