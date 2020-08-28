<template>
    <li>
        <router-link :to="{name: 'board', params: {id: id}}">
            <div class="m-1 item-container">
                {{ title }}
            </div>
        </router-link>
    </li>
</template>

<script>
    export default {
        props: ['id', 'title']
    }
</script>

<style>
    .item-container {
        font-size: 20px;
        color: #2c3e50;
        padding: 10px;
    }
</style>