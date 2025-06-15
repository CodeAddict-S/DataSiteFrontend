<template>
    <Toaster/>

	<component :is="layout">
        <RouterView/>
    </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import EmptyLayout from './components/layouts/EmptyLayout.vue';
import MainLayout from './components/layouts/MainLayout.vue';
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' 

const route = useRoute()

const layout = computed(() => {
    if(route.name in ['login', '404_not_found']) return EmptyLayout
    else return MainLayout
})

const theme = localStorage.getItem('dark')
if (theme === 'true' || theme === undefined || theme === null) {
    document.documentElement.classList.add('dark')
}
</script>
