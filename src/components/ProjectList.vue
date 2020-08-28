<template>
    <div>
        <ul>
            <transition-group name="fade">
                <ProjectItem
                        v-for="projectItem in filteredProjects"
                        v-bind:id="projectItem.id"
                        v-bind:title="projectItem.title"
                        v-bind:key="projectItem.id"
                />
            </transition-group>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ProjectItem from '@/components/ProjectItem'

    export default {
        computed: mapGetters(["filteredProjects"]),
        components: {
            ProjectItem
        },
    }
</script>

<style>
    li {
        list-style: none;
        text-align: left;
    }
</style>