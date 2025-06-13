<template>
	<component :is="layout">
        <RouterView/>
    </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import EmptyLayout from './components/layouts/EmptyLayout.vue';
import MainLayout from './components/layouts/MainLayout.vue';

const route = useRoute()

const layout = computed(() => {
    if(route.name in ['login', '404_not_found']) return EmptyLayout
    else return MainLayout
})
</script>